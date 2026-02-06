import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home" 
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/common/NavBar'
import OpenRoute from './components/common/OpenRoute'
import Error from './components/common/Error'
import ResetPasswordToken from './pages/ResetPasswordToken'
import ResetPassword from './pages/ResetPassword'
import PageOTP from './pages/PageOTP'
import AboutUs from './pages/AboutUs'
import Profile from './components/Dashboard/Profile'
import Dashboard from './pages/Dashboard'
import Settings from './components/Dashboard/Settings/Settings'
import EnrolledCourses from './pages/EnrolledCourses'
import Wishlist from './pages/Wishlist'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourse from './pages/AddCourse'
import MyCourses from "./pages/MyCourses"
import Catalog from './pages/Catalog'
import CoursePage from './pages/CoursePage'
import Cart from "./pages/Cart";
import ViewCourseMain from './components/ViewCourse/ViewCourseMain'
import Instructor from './pages/Instructor'

const App = () => {

  const { user } = useSelector((state) => state.profile);
  const { step } = useSelector((state) => state.course);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 text-white'>
      <NavBar/>
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/login" 
          element={
          <OpenRoute>
            <Login />
          </OpenRoute>
          }
        />
        <Route 
          path="/signup" 
          element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
          }
        />
        <Route
          path="/Error"
          element={
            <Error/>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ResetPasswordToken/>
          }
        />
        <Route
          path="/update-password/:token"
          element={<ResetPassword/>}
        />
        <Route
          path="/verify-email"
          element={<PageOTP/>}
        />
        <Route
          path="/about"
          element={<AboutUs/>}
        />

        <Route path="/courses/:courseId" element={<CoursePage/> }/>
        <Route path="/catalog/:categoryName" element={<Catalog />}/>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path="settings" element={<Settings/>}/>
          <Route path="enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="wishlist" element={<Wishlist />}/>
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="add-course" element={<AddCourse/>}/>
                <Route path="my-courses" element={<MyCourses/>}/>
                <Route path="instructor-dashboard" element={<Instructor/>}/>
              </>
            )
          }
          <Route path="cart" element={<Cart/>}/>
        </Route>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                element={<ViewCourseMain />}
              />
              <Route
                path="/view-course/:courseId"
                element={<ViewCourseMain />}
              />
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App; 
