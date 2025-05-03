// project import
import dashboardItems from "./dashboardItems";
import loginItems from "./loginItems";
import profileItems from "./profileItems";
import settingsItems from "./settingsItems";

// ==============================|| MENU ITEMS ||============================== //

function menuItems(loggedIn, accessLevel) {
  var items = [];

  if (loggedIn) {
    items = [dashboardItems, profileItems(accessLevel), settingsItems];

    if (accessLevel <= 2) {
      items.push(settingsItems);
    }
  } else {
    items = [dashboardItems, loginItems];
  }
  return { items: items };
}

export default menuItems;
