import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import App from "../App";
import SignIn from "../Authentication/SignIn";
import Login from "../Authentication/Login";
import Dashboard from "../layouts/Dashboardlayout";
import MyParcels from "../Dashboard/MyParcels";
import MyEarnings from "../Dashboard/MyEarnings";
import MakeAdmin from "../Dashboard/MakeAdmin";
import PrivateRoute from "../routes/PrivateRoute";
import Manageitme from "../Dashboard/users/Manageitme";
import Viewchart from "../Dashboard/users/Viewchart";
import Addadvertisement from "../Dashboard/Vendor/Addadvertisement";
import Addproducts from "../Dashboard/Vendor/Addproducts"
import Myproducts from "../Dashboard/Vendor/Myproducts";
import VendorRoute from "./VendorRoute";
import Myadvertisement from "../Dashboard/Vendor/Myadvertisement";
import Alladvertisement from "../Dashboard/AdminPage/Alladvertisement";
import Allusers from "../Dashboard/AdminPage/Allusers";
import Allorders from "../Dashboard/AdminPage/Allorders";
import AdminRoute from "./AdminRoute";
import Datacard from "../localpage/Datacard";
import Detail from "../localpage/Detail";
import Bevendor from "../Dashboard/Vendor/Bevendor";
import Profile from "../Dashboard/common/Profile";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { index: true, element: <App /> },
      { path: "SignIn", element: <SignIn /> },
      { path: "Login", element: <Login /> },
      { path: "Datacard", element: <Datacard /> },
      { path: "Datacard", element: <Datacard /> },
      { path: "Bevendor", element: <Bevendor /> },
      { path: "Bevendor", element: <Bevendor /> },
      { path: "Datacard/detail", element: <Detail /> },
      { path: "Datacard/detail/:id", element: <PrivateRoute><Detail /></PrivateRoute> },
      {path: "Profile", element: <Profile />}
    ]
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      { path: "App", element: <App /> },
     // { path: "Profile", element: <Profile /> },
      { path: "MyParcels", element: <MyParcels /> },
      { path: "Manageitme", element: <Manageitme /> },
      { path: "Viewchart", element: <Viewchart /> },
      
      { path: "MyEarnings", element: <VendorRoute><MyEarnings /></VendorRoute> },
      { path: "Addadvertisement", element: <VendorRoute><Addadvertisement /></VendorRoute> },
      { path: "Addproducts", element: <VendorRoute><Addproducts /></VendorRoute> },
      { path: "Myproducts", element: <VendorRoute><Myproducts /></VendorRoute> },
      { path: "Myadvertisement", element: <VendorRoute><Myadvertisement /></VendorRoute> },

      { path: "Alladvertisement", element: <AdminRoute><Alladvertisement /></AdminRoute> },
      { path: "MakeAdmin", element: <AdminRoute><MakeAdmin /></AdminRoute> },
      { path: "Allusers", element: <AdminRoute><Allusers /></AdminRoute> },
      { path: "Allorders", element: <AdminRoute><Allorders /></AdminRoute> }
    ]
  }
]);
