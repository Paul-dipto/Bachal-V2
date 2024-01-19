import React, { useState } from "react";
import {
   Grid,
   TextField,
   Button,
   CircularProgress,
   Alert,
} from "@mui/material";
// import Alert from "@mui/material/Alert";
import regimg from "../../assets/regi_img.png";
import "../Registation/Registration.css";
import {
   getAuth,
   createUserWithEmailAndPassword,
   sendEmailVerification,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

let initialValues = {
   email: "",
   fullName: "",
   password: "",
   loading: false,
   error: "",
   eye: false,
};

const Registration = () => {
   let [values, setValues] = useState(initialValues);
   const auth = getAuth();
   let navigate = useNavigate();

   let handleValue = (e) => {
      setValues({
         ...values,
         [e.target.name]: e.target.value,
      });
   };

   let Handlesubmit = () => {
      let { email, fullname, password } = values;

      if (!email) {
         setValues({
            ...values,
            error: "Enter a email",
         });
         return;
      }
      if (!fullname) {
         setValues({
            ...values,
            error: "Enter your full-name",
         });
         return;
      }

      if (!/^[A-Za-z\s]+$/.test(fullname)) {
         setValues({
            ...values,
            error: "Invalid characters in full name. Please use only letters and spaces.",
         });
         return;
      }

      if (!password) {
         setValues({
            ...values,
            error: "Enter a password",
         });
         return;
      }

      setValues({
         ...values,
         loading: true,
      });
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
         sendEmailVerification(auth.currentUser).then(() => {
            alert("verification send");
         });
         setValues({
            email: "",
            fullName: "",
            password: "",
            loading: false,
         });
         navigate("/login");
      });
   };

   return (
      <>
         <Grid container spacing={2} rowGap={0} columnGap={0}>
            <Grid item xs={6}>
               <div className="reg_form">
                  <h2 className="title">Get started with easily register</h2>
                  <p className="reg_para">Free register and you can enjoy it</p>
                  <div className="reg_input">
                     <TextField
                        id="outlined-basic"
                        onChange={handleValue}
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        value={values.email}
                     />
                     {values.error.includes("email") && (
                        <Alert severity="error">{values.error}</Alert>
                     )}
                  </div>
                  <div className="reg_input">
                     <TextField
                        id="outlined-basic"
                        onChange={handleValue}
                        name="fullname"
                        label="Fullname"
                        variant="outlined"
                        value={values.fullName}
                     />
                     {values.error.includes("full-name") && (
                        <Alert severity="error">{values.error}</Alert>
                     )}
                     {values.error &&
                        values.error.includes("Invalid characters") && (
                           <Alert severity="error">{values.error}</Alert>
                        )}
                  </div>
                  <div className="reg_input">
                     <TextField
                        id="outlined-basic"
                        type={values.eye ? "text" : "password"}
                        onChange={handleValue}
                        name="password"
                        label="Password"
                        variant="outlined"
                        value={values.password}
                     />
                     {values.error.includes("password") && (
                        <Alert severity="error">{values.error}</Alert>
                     )}
                     <div
                        onClick={() =>
                           setValues({ ...values, eye: !values.eye })
                        }
                        className="reg_eye"
                     >
                        {values.eye ? <FaRegEye /> : <FaRegEyeSlash />}
                     </div>
                  </div>
                  <Alert style={{ marginBottom: "12px" }} severity="info">
                     Already registerd then go to login !{" "}
                     <strong>
                        <Link to="/login">Login</Link>
                     </strong>
                  </Alert>
                  {values.loading ? (
                     <CircularProgress />
                  ) : (
                     <Button
                        onClick={Handlesubmit}
                        className="reg_btn"
                        variant="contained"
                     >
                        Sign up
                     </Button>
                  )}
               </div>
            </Grid>
            <Grid item xs={6}>
               <picture>
                  <img
                     className="reg_img reg_cont"
                     src={regimg}
                     alt="registration_img"
                  />
               </picture>
            </Grid>
         </Grid>
      </>
   );
};

export default Registration;
