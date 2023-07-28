import { useState,useEffect } from 'react'
import axios from 'axios'
import { parseString } from "xml2js"; 


export const S3=()=>{

    const [pics,setPics] = useState([])
    const [totalData,setTotalData] = useState([])
    const itemsPerPage = 6

    useEffect(()=>{
        let getdata=async()=>{

            const res = await axios.get("https://testbucketfp.s3.amazonaws.com")
            parseString(res.data, function (err, results) {
  
                let data = JSON.stringify(results)
                const parseData = JSON.parse(data).ListBucketResult.Contents
                const images = parseData.map((ele)=>ele.Key[0])
                setPics(images.slice(0,itemsPerPage))
                setTotalData(images)
                });
        }
        getdata()
    },[])

        const handleInfiniteScroll= async()=>{
            try{
                if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
                    const nextPageStart = pics.length;
                    let nextPageEnd ;
                    if(nextPageStart+itemsPerPage<=totalData.length){
                        nextPageEnd = nextPageStart + itemsPerPage;
                    }
                    else{
                        nextPageEnd = nextPageStart + totalData.length - nextPageStart
                    }
                    if (nextPageEnd <= totalData.length) {
                          setPics((prev) => [...prev, ...totalData.slice(nextPageStart, nextPageEnd)]);
                    } else {
                      window.removeEventListener('scroll', handleInfiniteScroll);
                    }
                 }
            }
            catch(e){
                console.log(e)
            }
        }

    useEffect(()=>{
        window.addEventListener('scroll', handleInfiniteScroll)
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
          };
    },[pics])
    

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