import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletesavedTrackApi, getSavedTracksApi } from '../services/allApi'
import Footer from './Footer'


function SavedAudios() {

    const [savedTracks, setSavedTracks] = useState([])
    const [deletestatus,setDeletestatus] = useState("")

    const getSavedTracks = async () => {

        const token = sessionStorage.getItem("token")

        if (token) {

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await getSavedTracksApi(reqHeader)
            //  console.log(result)
            setSavedTracks(result.data)

        }
    }

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await deletesavedTrackApi(id, reqHeader)
            // console.log(result)
          
            if(result.status==200){
                alert("succesfully deleted")
                setDeletestatus(result)
               
            }
            else{
                alert('something went wrong')
            }
            
        }
    }


    useEffect(() => {
        getSavedTracks()
    }, [deletestatus])

    return (
        <>
            <div className='bg-[#111010] min-h-screen p-5 '>
                {/* <Header></Header> */}
                <h1 className='text-center text-white text-[60px] py-10'>Saved Tracks</h1>
                <Link to={'/alltracks'}>
                    <button className="btn lg:ms-28 ms-16 text-white">
                        <FontAwesomeIcon className="fa-xl me-1 " icon={faArrowLeft} style={{ color: "#ffffff" }} />
                    </button>
                </Link>


                {savedTracks.length < 0 ?
                    <div className='d-flex items-center justify-center mt-24'>
                        <h1 className='text-center text-white p-5 text-[25px]'>Your saved collection is empty add some tracks!</h1>

                    </div>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
                        {savedTracks.map((item) => (
                            <div className='border border-gray-700 rounded-xl my-10'>
                                <div className='flex flex-col text-white justify-center items-center p-5'>
                                    <Link to={`/TrackPlayer/${item?.audiotitle}`}> <img style={{ width: '250px', height: '160px' }} className='rounded-md' src={item.audioimage} alt="" /></Link>
                                    <p className='text-center mt-5'>{item.audiotitle}</p>
                                    <hr className='text-white w-44 my-3' />
                                    <div className='flex justify-between items-center gap-36 mt-2'>

                                        <button onClick={() => handleDelete(item?._id)} className='btn'><FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /></button>
                                    </div>
                                </div>

                            </div>
                        ))
                        }


                    </div>
                }
                <Footer></Footer>
            </div>
        </>
    )
}

export default SavedAudios
