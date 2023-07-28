import './pixelGallery.css'
import { Nav } from "../nav/Nav"
import {NavLink, Outlet} from "react-router-dom"

export const PixelGallery=()=>{
    return (
        <>
        <Nav/>
        <div className="s3Container">
            <div className="links">
                <NavLink className="s3 link" to='s3'>S3</NavLink>
                <NavLink className="drive link" to='drive'>Google Drive</NavLink>
            </div>
            <div className="images">
            <Outlet/>
            </div>
        </div>
        </>
    )
}