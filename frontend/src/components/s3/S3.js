import { useState,useEffect } from 'react'
import axios from 'axios'
import { parseString } from "xml2js"; 


export const S3=()=>{

    const [pics,setPics] = useState([])

    useEffect(()=>{
        let getdata=async()=>{

            const res = await axios.get("https://testbucketfp.s3.amazonaws.com")
            parseString(res.data, function (err, results) {
  
                let data = JSON.stringify(results)
                const parseData = JSON.parse(data).ListBucketResult.Contents
                const images = parseData.map((ele)=>ele.Key[0])
                setPics(images)
                });
           
        }
        getdata()
    },[])
    

    return (
        <>
        <div className='imageContainer'>
            {
                pics.map((val, index)=>{
                    return (
                    <div key = {index+1} className="image">
                        <img src={`https://testbucketfp.s3.amazonaws.com/${val}`} alt="img" />
                    </div>
                    )
                })
            }
        </div>
        </>
    )
}