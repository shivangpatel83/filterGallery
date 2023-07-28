import './App.css';
import { Login } from './components/login/Login';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Route, Routes} from 'react-router-dom'
import { NoRoute } from './components/Noroute';
import { Signup } from './components/signup/Signup';
import { PixelGallery } from './components/pixelGallery/PixelGallery';
import {ProtectedRoute} from './components/ProtectedRoute'
import { S3 } from './components/s3/S3';
import { Drive } from './components/drive/Drive';


function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000} position={"top-center"} hideProgressBar={true}/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/pixelGallery" element={
          <ProtectedRoute><PixelGallery/></ProtectedRoute>
        }>
           <Route index element={<ProtectedRoute><S3/></ProtectedRoute>}/>
           <Route path="s3" element={<ProtectedRoute><S3/></ProtectedRoute>}/>
            <Route path="drive" element={<ProtectedRoute><Drive/></ProtectedRoute>}/>
        </Route>
        <Route path='*' element={<NoRoute/>}/>
      </Routes>    
      </div>
  );
}

export default App;
