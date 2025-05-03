import Routes from "./routes/Routes";
import ThemeCustomization from "./themes/ThemeCustomization";
import SnackBar from "./components/SnackBar";
import ConnectionErrorAlert from "./components/ConnectionErrorAlert";

function App() {
  return (
    <>
      <ThemeCustomization>
        <Routes />
        <SnackBar />
        {/* <ConnectionErrorAlert /> */}
      </ThemeCustomization>
    </>
  );
}

export default App;
