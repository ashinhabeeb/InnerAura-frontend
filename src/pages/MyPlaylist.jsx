import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { deletePlaylistTrackApi, getPlaylistTracksApi } from '../services/allApi'
import { serverUrl } from '../services/serverUrl'
import Footer from '../components/Footer'





function MyPlaylist() {


    const [token, setToken] = useState("")
    const [myplaylist, setMyplaylist] = useState([])
    const [deleteStatus, setDeletestatus] = useState("")

    const getPlaylistTracks = async () => {
        if (token) {

            const reqHeader = {
                "Content-Type": "multipart/formdata",
                "Authorization": `Bearer ${token}`
            }
            const result = await getPlaylistTracksApi(reqHeader)
            console.log(result.data)
            setMyplaylist(result.data)
        }
        else {
            console.log('unauthorised access')
        }
    }

    const handleDelete = async (id) => {
        const result = await deletePlaylistTrackApi(id)
        setDeletestatus(result.data)
    }

    // console.log(myplaylist)
    // console.log(token)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (token) {
            getPlaylistTracks()

        }
    }, [token, deleteStatus])


    return (
        <>

            <div className='bg-[#111010] min-h-screen  '>
                {/* <Header></Header> */}
                <h1 className='text-center text-white text-[60px] '>My playlist</h1>
                <Link to={'/alltracks'}>
                    <button className="btn mt-10 ms-16 lg:ms-28 text-white">
                        <FontAwesomeIcon className="fa-xl me-1 " icon={faArrowLeft} style={{ color: "#ffffff" }} />
                    </button>
                </Link>

                <div className='flex items-center justify-center flex-col mt-10'>
                    <Link to={'/uploadplaylist'}><button className='bg-[#82827d] text-white p-3 my-5'>Upload</button></Link>

                </div>
                {myplaylist?.length <= 0 ?
                    <div className='d-flex items-center justify-center mt-24'>
                        <h1 className='text-center text-white p-5 text-[25px]'>Your playlist is empty add some tracks!</h1>
                    </div>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
                        {myplaylist?.map((item) => (
                            <div className='border border-gray-700 rounded-xl my-10'>
                                <div className='flex flex-col text-white justify-center items-center p-5'>
                                    <Link to={`/TrackPlayer/${item.title}?fromPlaylist=true`}><img style={{ width: '250px', height: '160px' }} className='rounded-md' src={item?.audioImg?.startsWith('uploads') ? `${serverUrl}/${item?.audioImg}` : item?.audioImg} alt="" /></Link>
                                    <p className='text-center mt-5'>{item.title}</p>
                                    <hr className='text-white w-44 my-3' />
                                    <div className='flex justify-between items-center gap-36 mt-2'>

                                        <Link to={`/editplaylistTrack/${item._id}`} state={{ trackDetails: item }}><button className='btn '><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green" }} /></button></Link>

                                        <button onClick={() => handleDelete(item._id)} className='btn'><FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                        }



                    </div>}



            </div>
            <Footer></Footer>
        </>
    )
}

export default MyPlaylist
