// project import
import dashboardItems from "./dashboardItems";
import loginItems from "./loginItems";
import productionItems from "./productionItems";
import profileItems from "./profileItems";
import settingsItems from "./settingsItems";

// ==============================|| MENU ITEMS ||============================== //

function menuItems(loggedIn, accessLevel) {
  var items = [];

  if (loggedIn) {
    items = [
      dashboardItems,
      productionItems,
      settingsItems,
      profileItems(accessLevel),
    ];
  } else {
    items = [dashboardItems, productionItems, loginItems];
  }
  return { items: items };
}

export default menuItems;
