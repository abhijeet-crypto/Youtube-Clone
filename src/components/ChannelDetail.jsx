import { useState,useEffect } from "react"

import Videos from "./Videos"
import ChannelCard from "./ChannelCard"
import { fetchFromApi } from "../utils/fetcFromApi"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

const ChannelDetail = () => {
  
  const [ChannelDetail, setChannelDetail] = useState(null)
  const [videos, setvideos] = useState([])
  
  const {id}= useParams();

  useEffect(()=>{
    fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data)=> setChannelDetail(data?.items[0]));

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data)=>setvideos(data?.items));

  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(100,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(140,0,3,1) 100%)',
            zIndex:10,
            height:'300px',
          }}
        ></div>

        <ChannelCard channelDetail={ChannelDetail} marginTop="-110px"></ChannelCard>
      </Box>

      <Box display='flex' p='2'>
        <Box sx={{mr:{xs:'30px' , md:'150px'}}}></Box>
        <Videos videos={videos}></Videos>
      </Box>
    </Box>
  )
}

export default ChannelDetail