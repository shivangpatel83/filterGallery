import './signup.css'
import {useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { Nav } from '../nav/Nav';
import APIService from "../axios";

export const Signup =()=>{

    const navigate = useNavigate()
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')

    const validatePwd=(pwd)=>{
        const minLength = 8
        const maxLength = 16
        const regExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/
        if(pwd.length<minLength || pwd.length>maxLength){
            return true
        }
        else if(!regExp.test(pwd)){
            return true
        }
    }

    const validateEmail=(mail)=>{
        const validRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if(!validRegex.test(mail)){
        return true
        }
    }

    const toggleClick=async()=>{
        if(name=== ``|| email===``|| password===`` || confirmPassword===``) {
            toast.info("Please fill the Information!!!")
                return
            }
            else if(validateEmail(email)){
                toast.info("Invalid Email!!!")
                return
            }
            else if(password !== confirmPassword){
                toast.info("Password does not match!!!")
                return
            }
            else if(validatePwd(password)){
                toast.info("Invalid Password parameters!!!'")
                return
            }

            try {
                const response = await APIService.post("/signup", {
                    name,
                    email,
                    password,
                })
                if(response.data.status===401){
                    toast.error(response.data.error)
                    return
                }
                toast.success('Account Created successfully!!!');
                navigate('/')
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


    return(
    <div className='signupSection'>
        <Nav/>
        <h1>Start with Sign up.</h1>
    <div className="signupContainer">
        <h2>Sign up Form</h2>
        <div className="name">
            <label className='labelName' htmlFor="name">Name: </label>
            <input className='inputName'  onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter the First Name'/>
        </div>
        <div className="email">
            <label className='labelEmail' htmlFor="email">Email: </label>
            <input className='inputEmail' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter the Email'/>
        </div>
        <div className="password">
            <label className='labelPassword' htmlFor="password">Password: </label>
            <input className='inputPassword' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Create Password'/>
        </div>
        <div className="confirmPassword">
            <label className='labelConfirmPassword' htmlFor="confirmPassword">Confirm Password: </label>
            <input className='inputConfirmPassword' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder='Confirm create Password'/>
        </div>
        <div className='signupBtn' onClick={toggleClick}><button>Sign up</button></div>
        
    </div>

</div>
        )
}


