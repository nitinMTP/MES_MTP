// assets
import { BsBuildingFill } from "react-icons/bs";
import { SlEnergy } from "react-icons/sl";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ArticleIcon from "@mui/icons-material/Article";

// icons
const icons = {
  ArticleIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const productionItems = {
  id: "group-dashboard",
  title: "Production",
  type: "group",
  children: [
    {
      id: "prodduction",
      title: "Production Entry",
      type: "item",
      url: "/production",
      icon: icons.ArticleIcon,
      breadcrumbs: true,
    },
  ],
};

export default productionItems;
