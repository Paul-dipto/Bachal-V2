import React, { useState } from "react";
import "../Forgotpassword/forgotpassword.css";
import { TextField, Button } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   let [text, setText] = useState("");
   const auth = getAuth();
   let navigate = useNavigate();

   let passChange = (e) => {
      setText(e.target.value);
   };

   let handleForgotPass = () => {
      sendPasswordResetEmail(auth, text).then(() => {
         navigate("/login");
      });
   };

   return (
      <div className="forgot_password">
         <div className="box">
            <h1 className="forgotpass_title">Forgot Password</h1>
            <TextField
               onChange={passChange}
               className="forgot_input"
               id="filled-basic"
               label="Email"
               variant="filled"
            />
            <Button onClick={handleForgotPass} variant="contained">
               Confirm
            </Button>
         </div>
      </div>
   );
};

export default ForgotPassword;
