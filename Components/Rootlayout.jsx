import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "../Components/rootlayout.css";
import profilepic from "../src/assets/propic.webp";
import {
   RiHome8Line,
   RiMessage2Line,
   RiNotification2Line,
   RiSettingsLine,
   RiLogoutBoxRLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Rootlayout = () => {
   return (
      <>
         <Grid container spacing={2}>
            <Grid item xs={1}>
               <div className="side-navbar">
                  <div className="side-nav-container">
                     <picture>
                        <img
                           className="pro_pic"
                           src={profilepic}
                           alt="profile_pic"
                        />
                     </picture>
                     <ul>
                        <li>
                           <Link to={"/bachal/home"}>
                              <RiHome8Line className="icon" />
                           </Link>
                        </li>
                        <li>
                           <Link to={"/bachal/massage"}>
                              <RiMessage2Line className="icon" />
                           </Link>
                        </li>
                        <li>
                           <Link>
                              {" "}
                              <RiNotification2Line className="icon" />
                           </Link>
                        </li>
                        <li>
                           <Link>
                              <RiSettingsLine className="icon" />
                           </Link>
                        </li>
                        <li>
                           <Link>
                              {" "}
                              <RiLogoutBoxRLine className="icon" />
                           </Link>
                        </li>
                     </ul>
                  </div>
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
