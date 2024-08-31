import BuildingsComponent from "../components/BuildingsComponent";
import ContentWrapper from "../components/ContentWrapper";
import DashboardComponent from "../components/DashboardComponent";
import LoginComponent from "../components/LoginComponent";
import { Navigate } from 'react-router-dom'
import TopBarComponet from "../components/TopBarComponet";
import ProfileComponent from "../components/ProfileComponent";
import BillComponent from "../components/BillComponent";
export default [
    
    {
        path: '/',
        element: <ContentWrapper/>
    },
    {
        path: '/dashboard',
        element: <DashboardComponent/>
    },
    {
        path: '/login',
        element: <LoginComponent/>
    },
    {
        path: '/buildings',
        element: <BuildingsComponent/>
    },
    {
        path: '/profile',
        element: <ProfileComponent/>
    },
    {
        path: '/bills',
        element: <BillComponent/>
    }
]