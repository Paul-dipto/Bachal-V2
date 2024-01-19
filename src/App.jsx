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
         <RouterProvider router={router} />
      </>
   );
}

export default App;
