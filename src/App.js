import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import VolunteerForm from "./Pages/VolunteerForm/VolunteerForm";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [selectedSupport, setSelectedSupport] = useState([]);
  const userdata = JSON.parse(sessionStorage.getItem("user")) || {
    isAuthenticated: false,
  };

  const [loggedInUser, setLoggedInUser] = useState(userdata);

  console.log(loggedInUser);
  return (
    <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home setSelectedSupport={setSelectedSupport}></Home>
            </Route>
            <PrivateRoute path="/volunteer-form">
              <VolunteerForm selectedSupport={selectedSupport}></VolunteerForm>
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/admin-dashboard">
              <AdminDashboard></AdminDashboard>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
