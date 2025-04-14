import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Register from '../pages/Register'
import CheckEmailPage from '../pages/CheckEmailPage'
import CheckPasswordPage from '../pages/CheckPasswordPage'
import Home from '../pages/Home'
import MessagePage from '../components/MessagePage'
import AuthLayouts from '../layout'
import ForgotPassword from '../pages/ForgotPassword'
import LandingPage from '../pages/LandingPage'
import VerifyOtp from '../pages/VerifyOtp'
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:  [
            {
                path:"/",
                element:<LandingPage/>
            },
            {
                path:"register",
                element:<AuthLayouts><Register/></AuthLayouts>,

            },
            {
                path:"verify-otp",
                element:<AuthLayouts><VerifyOtp/></AuthLayouts>,

            },
            {
                path:"email",
                element:<AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path:"password",
                element:<AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path:"reset-password",
                element:<AuthLayouts><ForgotPassword/></AuthLayouts>
            },
            {
                path:"/home",
                element:<Home/>,
                children: [
                    {
                        path:':userId',
                        element:<MessagePage/>

                    }
                ]
            }
        ]
    }
])

export default router