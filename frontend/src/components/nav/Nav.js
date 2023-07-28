import "./nav.css"
import {useNavigate,useLocation} from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";


export const Nav=()=>{

    const location = useLocation();
    const url = location.pathname;
    const navigate = useNavigate();
    const userName = localStorage.getItem(`name`)
    const image = localStorage.getItem(`image`)

    const toggleLogout=()=>{
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="nav">
        <div className="title">
            <div className="logo">
                <img src="./logo.jpg" alt="" />
            </div>
            <h3>FilterPixel</h3>
        </div>
        <div className="info">
            {
                (url !== '/' && url !== '/signup' && url !== '/signup/') ?
                 (image ? 
                 <>
                 <h3>Hi! {userName}</h3>
                 <img className='logoImage' src={image} alt="pic"/>
                 <button className="btn" onClick={toggleLogout}>Log Out</button>
                 </>
                 :
                 <>
                 <h3>Hi! {userName}</h3>
                 <FaUserAlt/>
                 <button className="btn" onClick={toggleLogout}>Log Out</button>
                 </>
                 )
                 :
                 (url === '/') ?
                 <button className="btn" onClick={()=>navigate('/signup')} >Sign Up</button>
                 :
                <button className="btn" onClick={()=>navigate('/')}>Log In</button>
            }
            
        </div>
        
        </div>
    ) 
    
}