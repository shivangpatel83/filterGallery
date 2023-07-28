import {Navigate} from "react-router-dom";


export const ProtectedRoute=  (props)=>{
    const token =  localStorage.getItem("token")
    if(!token){
        return <Navigate to='/'></Navigate>
    }
    return props.children
}

export default ProtectedRoute