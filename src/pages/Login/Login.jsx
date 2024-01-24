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
import { toast, Zoom } from "react-toastify";

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
   const notify = (msg) =>
      toast.error(msg, {
         position: "bottom-center",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         transition: Zoom,
      });

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
            if (!user.user.emailVerified) {
               notify("please verify you email to log in ");
            } else {
               navigate("/bachal/home");
            }
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode);
            if (errorCode === "auth/user-not-found") {
               setValues({
                  ...values,
                  email: "",
                  loading: false,
               });
            } else if (errorCode === "auth/wrong-password") {
               setValues({
                  ...values,
                  loading: false,
                  password: "",
               });
            }
            setValues({
               ...values,
               email: "",
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
                     {error && (
                        <Alert severity="error" variant="filled">
                           {(error, "email does not exist")}
                        </Alert>
                     )}
                  </div>

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

                     {error && (
                        <Alert severity="error" variant="filled">
                           {(error, "password does not match")}
                        </Alert>
                     )}
                  </div>

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
