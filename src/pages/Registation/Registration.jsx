import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import regimg from "../../assets/regi_img.png";
import "../Registation/Registration.css";

const Registration = () => {
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
                        label="Email Address"
                        variant="outlined"
                     />
                  </div>
                  <div className="reg_input">
                     <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                     />
                  </div>
                  <div className="reg_input">
                     <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                     />
                  </div>
                  <Button className="reg_btn" variant="contained">
                     Sign up
                  </Button>
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