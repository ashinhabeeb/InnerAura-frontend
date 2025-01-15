import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCategoryDetailsApi } from '../services/allApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'




function ViewTracks() {

  const [category, setCategory] = useState([])
  const [audioTrack, setAudioTrack] = useState([])
  const navigate = useNavigate()


  const { Categoryname } = useParams()

  const getAudtioTracks = async () => {
    const result = await getCategoryDetailsApi(Categoryname)
    // console.log(result.data)
    setCategory(result.data[0])

  }

  // console.log(category)
  // console.log(category.audios)



  useEffect(() => {
    if (category && category.audios) {
      setAudioTrack(category.audios); // Set the audio tracks when category changes
    }
  }, [category]);

  useEffect(() => {
    getAudtioTracks()
  }, [])



  return (

    <>
      <div className='bg-[#181818] min-h-screen p-10'>

       
         
            <button onClick={()=>navigate(-1)} className="btn ms-2 lg:ms-28 text-white">
              <FontAwesomeIcon className="fa-xl me-1 " icon={faArrowLeft} style={{ color: "#ffffff" }} />
            </button>
         
  
          <h1 className='text-center text-white text-[60px]'>{category?.Categoryname}</h1>
      
        <p className='text-center text-[rgb(179,176,171)] p-5'>{category?.Categorydescription}</p>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
          {audioTrack?.map((item) => (
            <div className='flex flex-col text-white justify-center items-center p-5'>
              <Link to={`/TrackPlayer/${item?.audiotitle}`}><img className='rounded-md' src={item?.audioimage} alt="" /></Link>
              <p className='text-center mt-5'>{item.audiotitle}</p>
            </div>
          ))
          }
        </div>



      </div>





    </>

  )
}

export default ViewTracks
