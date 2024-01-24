import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "../Components/rootlayout.css";

const Rootlayout = () => {
   return (
      <>
         <Grid container spacing={2}>
            <Grid item xs={1}>
               <div className="side-navbar">
                  <div className="side-nav-container"></div>
               </div>
            </Grid>
            <Grid item xs={11}>
               <Outlet />
            </Grid>
         </Grid>
      </>
   );
};

export default Rootlayout;
