import { ThemeProvider, createTheme } from "@mui/material";
import "./styles.css";
import AgeCalculatorPage from "./Components/AgeCalculatorPage";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 20,
    },
    fontFamily: "Poppins",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <AgeCalculatorPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
