import './login.css'
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { Nav } from '../nav/Nav';
import APIService from '../axios'
import axios from "axios"
import {toast} from "react-toastify";
import {secret} from '../secret'


export const Login=()=>{

    const [isHovered, setIsHovered] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const [loginMail, setLoginEmail ] = useState('')
    const [loginPassword, setLoginPassword ] = useState('')
    const navigate = useNavigate()

    const customCSS={
        background: "rgb(158, 57, 39)",
        borderRadius : "10px",
        display : 'flex',
        justifyContent : "center",
        alignItems : 'center',
        color: isHovered || isVisited ? 'black' : "white",
        fontWeight:"bold"
    }

    const toggleClick = async ()=>{
        if(loginMail===``||loginPassword===``){
            toast.warn("Please Fill all the Fields!")
            return
        }

        try {
            const response = await APIService.post("/login",{
                    email: loginMail,
                    password: loginPassword
                })
             localStorage.setItem("token", response.data.token)
             localStorage.setItem(`name`, response.data.name)
             localStorage.setItem(`image`, '');
             toast.success("Login Successful")
            navigate(`/pixelGallery`)
        }
        catch (error){
            if(error.response.status === 401){
                toast.warn(error.response.data.error)
            }
            else if(error.response.status === 500){
                toast.warn(error.response.data.error)
            }
        }
    }


    const googleLogin = async (data)=>{
        try{
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${data.access_token}`)
              if(res.data.verified_email){
              const {name, email, picture} = data
              const response = await APIService.post("/signup",{
                   name,
                   email,
                   isSocial : true
               })
            localStorage.setItem("token", response.data.token);
            toast.success("Login Successful");
            localStorage.setItem(`name`, response.data.name);
            localStorage.setItem(`image`, picture);
            navigate(`/pixelGallery`);
              }
              else{
                  toast.error("Unauthorize User!!!")
                  return
              }
      }
      catch(error){
      if(error.response.status === 401){
          toast.warn(error.response.data.error)
      }
      else if(error.response.status === 500){
          toast.warn(error.response.data.error)
      }
  }
}

 return(
    <>
    <Nav/>
        <div className="container">
        <div className="login">
        <div className="googleLogin">
        <LoginSocialGoogle className="login-social-google"
        client_id={secret.CLIENT_ID} //replace with your client id
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"

        onResolve={({ provider, data }) => {
          if(data.access_token && data.email_verified){
          googleLogin(data);
        }
        else{
            toast.error("Authentication Failed!!!")
            return
        }
        }}

        onReject={(err) => {
          console.log(err);
          toast.error("Authentication Failed!!!")
          return
        }}
        >
        <GoogleLoginButton
         className="google-login-button"
         onMouseEnter={()=>setIsHovered(true)}
         onMouseLeave={()=>setIsHovered(false)}
         onClick={()=>{setIsVisited(true)}}
         style={customCSS}
         />
        </LoginSocialGoogle>
        </div>
        <div className="options">
        <div className="line"></div>
        <h3>OR</h3>
        <div className="line"></div>
        </div>
        <div className="userName">
            <input type="email" placeholder="Username" onChange={(e)=>setLoginEmail(e.target.value)} value={loginMail}/>
        </div>
        <div className="password">
            <input type="password" placeholder="Password"onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} />
        </div>
        <div className="button">
            <button onClick={toggleClick}>Submit</button>
        </div>
        </div>
        </div>
        </>
    )
}