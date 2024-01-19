import React, { useState } from "react";
import {
   Grid,
   TextField,
   Button,
   CircularProgress,
   Alert,
} from "@mui/material";
import "../Login/login.css";
import login_img from "../../assets/loginjpg.jpg";
import {
   getAuth,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
} from "firebase/auth";
import google_log from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

let initialValues = {
   email: "",
   password: "",
   loading: false,
   eye: false,
   error: "",
};

const Login = () => {
   let [values, setValues] = useState(initialValues);
   let [error, setError] = useState("");

   const auth = getAuth();
   const provider = new GoogleAuthProvider();
   let navigate = useNavigate();

   let handleValue = (e) => {
      setValues({
         ...values,
         [e.target.name]: e.target.value,
      });
   };

   let Handlesubmit = () => {
      let { email, password } = values;
      if (!email) {
         setValues({
            ...values,
            email: "",
            error: "enter a email",
         });
         return;
      }
      if (!password) {
         setValues({
            ...values,
            password: "",
            error: "enter a password",
         });
         return;
      }
      setValues({
         ...values,
         loading: true,
         error: "",
      });
      signInWithEmailAndPassword(auth, email, password)
         .then((user) => {
            // alert("successfull login");
            setValues({
               email: "",
               password: "",
               loading: false,
            });

            navigate("/home");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Firebase Error:", error);

            setError(errorCode);
            setValues({
               ...values,
               password: "",
               loading: false,
            });
         });
   };

   let handleGoogleLogin = () => {
      signInWithPopup(auth, provider).then((result) => {
         console.log(result);
      });
   };
   return (
      <>
         <Grid container spacing={2} rowGap={0} columnGap={0}>
            <Grid item xs={6}>
               <div className="log_form">
                  <h2 className="title_log">Log into your account</h2>
                  <picture>
                     <img
                        className="google_log"
                        src={google_log}
                        alt="google_log"
                        onClick={handleGoogleLogin}
                     />
                  </picture>
                  <div className="log_input">
                     <TextField
                        id="outlined-basic"
                        onChange={handleValue}
                        type="email"
                        name="email"
                        value={values.email}
                        label="Email Address"
                        variant="outlined"
                     />

                     {values.error.includes("email") && (
                        <Alert severity="error">{values.error}</Alert>
                     )}
                  </div>
                  {error && (
                     <Alert variant="filled" severity="error">
                        {error.code === "auth/user-not-found" &&
                           "User not found"}
                        {!error.code && error.message}
                     </Alert>
                  )}
                  <div className="log_input">
                     <TextField
                        id="outlined-basic"
                        name="password"
                        type={values.eye ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        onChange={handleValue}
                        value={values.password}
                     />
                     {values.error.includes("password") && (
                        <Alert severity="error">{values.error}</Alert>
                     )}

                     <div
                        onClick={() =>
                           setValues({ ...values, eye: !values.eye })
                        }
                        className="log_eye"
                     >
                        {values.eye ? <FaRegEye /> : <FaRegEyeSlash />}
                     </div>
                  </div>
                  {error && (
                     <Alert variant="filled" severity="error">
                        {error.code === "auth/wrong-password" &&
                           "Wrong password"}
                        {!error.code && error.message}
                     </Alert>
                  )}
                  <Alert style={{ marginBottom: "12px" }} severity="info">
                     Not registerd ? Click here !{" "}
                     <strong>
                        <Link to="/">Registration</Link>
                     </strong>
                  </Alert>

                  <Alert style={{ margintop: "12px" }} severity="error">
                     Can't remember your password? Click here !{" "}
                     <strong>
                        <Link to="/forgot-password">Forgot-password</Link>
                     </strong>
                  </Alert>
                  {values.loading ? (
                     <CircularProgress />
                  ) : (
                     <Button
                        onClick={Handlesubmit}
                        className="log_btn"
                        variant="contained"
                     >
                        Login to continue
                     </Button>
                  )}
               </div>
            </Grid>
            <Grid item xs={6}>
               <picture>
                  <img
                     className="log_img log_cont"
                     src={login_img}
                     alt="log_img"
                  />
               </picture>
            </Grid>
         </Grid>
      </>
   );
};

export default Login;
