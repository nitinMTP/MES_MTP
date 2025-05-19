#include <WiFi.h>
#include <PubSubClient.h>
#include <Preferences.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "infiNITINity";
const char* password = "City08041972";

// MQTT settings
const char* mqtt_server = "192.168.0.186";
const int mqtt_port = 1883;

// Pins
const int MACHINE_STATUS_PIN = 18;
const int PART_IMPULSE_PIN = 2;

// MQTT Topics
String mqtt_base_topic;
String mqtt_command_topic;
char deviceId[20];

// Internal State
volatile unsigned long partCounter = 0;
volatile unsigned long saveCounter = 0;
volatile unsigned long lastImpulseTime = 0;
volatile unsigned long cycleTime = 0;
volatile int lastPartState = LOW;
String machineStatus = "Idle";

const int SAVE_INTERVAL = 10;

WiFiClient espClient;
PubSubClient client(espClient);
Preferences preferences;

portMUX_TYPE mux = portMUX_INITIALIZER_UNLOCKED;

// ISR for impulse edge detection
void IRAM_ATTR handlePartChange() {
  int currentState = digitalRead(PART_IMPULSE_PIN);
  if (currentState != lastPartState) {
    lastPartState = currentState;

    if (currentState == HIGH && digitalRead(MACHINE_STATUS_PIN) == HIGH) {
      unsigned long now = millis();

      portENTER_CRITICAL_ISR(&mux);
      cycleTime = (lastImpulseTime > 0) ? now - lastImpulseTime : 0;
      lastImpulseTime = now;
      partCounter++;
      saveCounter++;
      portEXIT_CRITICAL_ISR(&mux);

      // Publish part impulse
      String impulseMsg = "{\"ts\":" + String(now) + "}";
      client.publish((mqtt_base_topic + "/part_impulse").c_str(), impulseMsg.c_str());

      // Publish counter change
      String countMsg = "{\"counter\":" + String(partCounter) + ",\"ts\":" + String(now) + "}";
      client.publish((mqtt_base_topic + "/counter_change").c_str(), countMsg.c_str());

      // Publish cycle time
      if (cycleTime > 0) {
        String ctMsg = "{\"cycle_time\":" + String(cycleTime) + ",\"ts\":" + String(now) + "}";
        client.publish((mqtt_base_topic + "/cycle_time").c_str(), ctMsg.c_str());
      }

      // Save to flash every SAVE_INTERVAL
      if (saveCounter >= SAVE_INTERVAL) {
        preferences.putULong("counter", partCounter);
        saveCounter = 0;
      }
    }
  }
}

void setup_wifi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) msg += (char)payload[i];

  StaticJsonDocument<128> doc;
  DeserializationError err = deserializeJson(doc, msg);
  if (err) {
    Serial.println("JSON parse error");
    return;
  }

  String command = doc["command"] | "";
  int value = doc["value"] | 0;
  unsigned long now = millis();

  if (command == "reset") {
    portENTER_CRITICAL(&mux);
    partCounter = 0;
    saveCounter = 0;
    cycleTime = 0;
    portEXIT_CRITICAL(&mux);
    preferences.putULong("counter", 0);

    String resetMsg = "{\"counter\":0,\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/counter_reset").c_str(), resetMsg.c_str());

    String ack = "{\"ack\":\"reset\",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/change_ack").c_str(), ack.c_str());

  } else if (command == "increment" && value > 0) {
    portENTER_CRITICAL(&mux);
    partCounter += value;
    portEXIT_CRITICAL(&mux);
    preferences.putULong("counter", partCounter);

    String changeMsg = "{\"counter\":" + String(partCounter) + ",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/counter_change").c_str(), changeMsg.c_str());

    String ack = "{\"ack\":\"increment\",\"value\":" + String(value) + ",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/change_ack").c_str(), ack.c_str());

  } else if (command == "decrement" && value > 0) {
    portENTER_CRITICAL(&mux);
    partCounter = (partCounter >= value) ? partCounter - value : 0;
    portEXIT_CRITICAL(&mux);
    preferences.putULong("counter", partCounter);

    String changeMsg = "{\"counter\":" + String(partCounter) + ",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/counter_change").c_str(), changeMsg.c_str());

    String ack = "{\"ack\":\"decrement\",\"value\":" + String(value) + ",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/change_ack").c_str(), ack.c_str());
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect(deviceId)) {
      Serial.println("connected");
      client.subscribe(mqtt_command_topic.c_str());
    } else {
      Serial.print(" failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 2s");
      delay(2000);
    }
  }
}

void checkMachineStatus() {
  unsigned long now = millis();
  unsigned long elapsed = now - lastImpulseTime;
  String newStatus = machineStatus;

  if (digitalRead(MACHINE_STATUS_PIN) == LOW) {
    newStatus = "Idle";
  } else if (cycleTime > 0 && elapsed > (2 * cycleTime)) {
    newStatus = "Idle";
  } else {
    newStatus = "Automatic";
  }

  if (newStatus != machineStatus) {
    machineStatus = newStatus;
    String statusMsg = "{\"status\":\"" + machineStatus + "\",\"ts\":" + String(now) + "}";
    client.publish((mqtt_base_topic + "/status").c_str(), statusMsg.c_str());
  }
}

void setup() {
  Serial.begin(115200);

  uint64_t chipid = ESP.getEfuseMac();
  snprintf(deviceId, sizeof(deviceId), "%04X%08X", (uint16_t)(chipid >> 32), (uint32_t)chipid);

  mqtt_base_topic = "edge/" + String(deviceId);
  mqtt_command_topic = "edge/" + String(deviceId) + "/command";

  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  preferences.begin("partdata", false);
  partCounter = preferences.getULong("counter", 0);
  saveCounter = 0;

  pinMode(PART_IMPULSE_PIN, INPUT);
  pinMode(MACHINE_STATUS_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(PART_IMPULSE_PIN), handlePartChange, CHANGE);

  Serial.println("Device ID: " + String(deviceId));
  Serial.println("MQTT Base Topic: " + mqtt_base_topic);
  Serial.println("Loaded Counter: " + String(partCounter));
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  checkMachineStatus();
  delay(100);
}
