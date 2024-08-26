import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Index from './layout/Index'
import CreatePost from './pages/CreatePost'
import ProtectedRoute from './utils/ProtectedRoute'
import ShowPosts from './pages/ShowPosts'
import UserProfile from './pages/UserProfile'
import OtherUserProfile from './pages/OtherUserProfile'
import ProfileUpdate from './pages/ProfileUpdate'
import EditPost from './pages/EditPost'
import Logout from './pages/Logout'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='instagram/login' element={<Login />} />
          <Route path='instagram/signup' element={<Signup />} />
          <Route path='/instagram' element={<ProtectedRoute/>}>
            <Route path='about' element={<About/>}/>
            <Route path='' element={<ShowPosts/>}/>
            <Route path='create-post' element={<CreatePost/>}/>
            <Route path='user-profile' element={<UserProfile/>}/>
            <Route path='profile-update' element={<ProfileUpdate/>}/>
            <Route path='user-profile/:userId' element={<OtherUserProfile/>}/>
            <Route path='edit-post/:postId' element={<EditPost/>}/>
            <Route path='logout' element={<Logout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
 
export default App