import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import App from "../App";
import SignIn from "../Authentication/SignIn";
import Login from "../Authentication/Login";
import Dashboard from "../layouts/Dashboardlayout";
import MyParcels from "../Dashboard/MyParcels";
import MyEarnings from "../Dashboard/MyEarnings";
import MakeAdmin from "../Dashboard/MakeAdmin";

export const router = createBrowserRouter([
{
    path: "/",
   Component: Rootlayout,
    children: [
      {
     index: true,
        Component: App,
      },
      
    
  {
    path:'SignIn',
    Component: SignIn
  },
  {
    path: 'Login',
    Component: Login
  }
    ],
  },
{
  path: '/dashboard',
  Component: Dashboard,
  children: [
    {
      index: true,
      // Optionally, add a DashboardHome component or similar
      Component: MyParcels, // or another default component
    },
    {
      path: 'MyEarnings',
      Component: MyEarnings,
    },
    {
      path: 'MakeAdmin',
      Component: MakeAdmin
    }
  ]
}
])
