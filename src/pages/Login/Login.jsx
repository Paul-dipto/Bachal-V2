import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import "../Login/login.css";
import login_img from "../../assets/loginjpg.jpg";
import google_log from "../../assets/google.png";

const Login = () => {
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
                     />
                  </picture>
                  <div className="log_input">
                     <TextField
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                     />
                  </div>
                  <div className="log_input">
                     <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                     />
                  </div>
                  <Button className="log_btn" variant="contained">
                     Login to continue
                  </Button>
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
