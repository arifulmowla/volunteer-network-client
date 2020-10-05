import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../images/logos/logo.png";
import "./login.css";

// firebase user login info
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { UserContext } from "../../App";
firebase.initializeApp(firebaseConfig);

const Login = () => {
  // login location redirect
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/dashboard" } };
  let redirectTo = () => {
    console.log(loggedInUser);
    console.log(from);
    history.replace(from);
  };

  var provider = new firebase.auth.GoogleAuthProvider();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          isAuthenticated: true,
        };

        sessionStorage.setItem("user", JSON.stringify(userData));
        setLoggedInUser(userData);
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            sessionStorage.setItem("Token", idToken);
            console.log(idToken);
            redirectTo();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...

        console.log(errorMessage);
      });
  };

  setTimeout(() => {
    if (loggedInUser.isAuthenticated) {
      redirectTo();
    }
  }, 500);
  return (
    <div className="login">
      <Container>
        <Link to="/">
          <img src={logo} alt="logo" className="form-logo my-3" />
        </Link>

        <div className="login-box">
          <h3>Login With</h3>

          <div className="google-btn" onClick={handleSignIn}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
          <p className="text-center mt-2">
            Don't have any account? <a href="#">Create an account</a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
