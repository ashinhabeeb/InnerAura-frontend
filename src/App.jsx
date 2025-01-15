import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Challenges from './components/Challenges'
import Alltracks from './pages/Alltracks'
import MyPlaylist from './pages/MyPlaylist'
import ViewTracks from './components/ViewTracks'
import TrackPlayer from './pages/TrackPlayer'
import AboutUs from './pages/AboutUs'
import PlaylistUploadModal from './components/PlaylistUploadModal'
import EditPlaylist from './components/EditPlaylist'
import Profile from './components/Profile'
import SavedAudios from './components/SavedAudios'
import ProtectedRoute from './protected/ProtectedRoute'
import Journal from './components/Journal'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/challenges' element={<Challenges/>}/>
      <Route path='/alltracks' element={<ProtectedRoute><Alltracks/></ProtectedRoute>}/>
      <Route path='/viewTracks/:Categoryname' element={<ViewTracks/>}/>
      <Route path='/myplaylist' element={<ProtectedRoute><MyPlaylist/></ProtectedRoute>}/>
      <Route path='/TrackPlayer/:audiotitle' element={<TrackPlayer/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/uploadplaylist' element={<ProtectedRoute><PlaylistUploadModal/></ProtectedRoute>}/>
      <Route path='/editplaylistTrack/:id' element={<ProtectedRoute><EditPlaylist/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/savedaudios' element={<ProtectedRoute><SavedAudios/></ProtectedRoute>}/>
      <Route path='/journal' element={<Journal/>}/>
    </Routes>
    </>
  )
}

export default App
