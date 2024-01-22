import {
   createBrowserRouter,
   RouterProvider,
   Route,
   createRoutesFromElements,
} from "react-router-dom";
import Registration from "./pages/Registation/Registration";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import Home from "./pages/Home/Home";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route>
         <Route path="/" element={<Registration />}></Route>
         <Route path="/login" element={<Login />}></Route>
         <Route path="/forgot-password" element={<ForgotPassword />}></Route>
         <Route path="/home" element={<Home />}></Route>
      </Route>
   )
);

function App() {
   return (
      <>
         <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Zoom
            limit={1}
         />
         <RouterProvider router={router} />
      </>
   );
}

export default App;
