import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import NotFound from './views/NotFound'
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashbord from './views/Dashbord';
import UserForm from './views/UserForm';

const router = createBrowserRouter ([
    // default layout router
    {
        path:'/',
        element :<DefaultLayout/>,
        children:
        [
            {
                path:'/',
                element:<Navigate to="users"/>
            },
            // dashboard route
             {
                path: '/dashboard',
                element: <Dashbord/>
            },

             // users route
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="UserCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="UserUpdate"/>
            },
        ]
    },

    //guest layout router
    {
        path:'/',
        element: <GuestLayout/>,
        children:
        [
                        // login route
                {
                    path: '/login',
                    element: <Login/>
                },

                //signup route
                {
                    path: '/signup',
                    element: <Signup/>
                },
        ]
    },

    // not found route
    {
        path: '*',
        element: <NotFound/>
    }
])
export default router;
