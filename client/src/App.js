import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

import CustomizedMenus from "./components/CustomizedMenus";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Paper style={{ minHeight: "100vh" }}>
          <Router>
            {/* <CustomizedMenus /> */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
          </Router>
        </Paper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
