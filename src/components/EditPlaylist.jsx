
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { serverUrl } from '../services/serverUrl';
import { EditPlaylistTrackApi } from '../services/allApi';



function EditPlaylist() {

    const { id } = useParams()
    const navigate = useNavigate()

    const location = useLocation();
    const { trackDetails } = location.state || {};


    const [preview, setPreview] = useState("")

    const [token, setToken] = useState("")

    const [trackdetails, setTrackDetails] = useState({
        category: trackDetails.category,
        title: trackDetails.title,
        description: trackDetails.description,
        audioImg: "",
        audioUrl: trackDetails.audioUrl
    })

    // console.log(trackdetails)


    const handleCancel = () => { 
       navigate(-1)
    }


    const handleUpdate = async () => {

        const { category, title, description, audioImg, audioUrl } = trackdetails

        const reqbody = new FormData()

        reqbody.append("category", category)
        reqbody.append("title", title)
        reqbody.append("description", description)
        reqbody.append("audioUrl", audioUrl)
        preview ? reqbody.append("audioImg", audioImg) : reqbody.append("audioImg", trackDetails.audioImg)

        const token = sessionStorage.getItem('token')

        if (preview) {

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result = await EditPlaylistTrackApi(id, reqbody, reqHeader)
           
            console.log(result)
            if (result.status == 200) {
                alert('succesfully updated playlist Track')
                navigate('/myplaylist')
            }
            else {
                alert('updation failed')
            }
        }
        else {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await EditPlaylistTrackApi(id, reqbody, reqHeader)
            console.log(result)
            if (result.status == 200) {
                alert('succesfully updated playlist Track')
                navigate('/myplaylist')
            }
            else {
                alert('updation failed')
            }
        }

    }

    const handleAudioImg = (e) => {
        // console.log(e.target.files[0])
        setTrackDetails({ ...trackdetails, audioImg: e.target.files[0] })
    }

    const handleAudioUrl = (e) => {
        // console.log(e.target.files[0])
        setTrackDetails({ ...trackdetails, audioUrl: e.target.files[0] })
    }

    // console.log(preview)
    // console.log(token)

    useEffect(() => {
        if (trackdetails.audioImg) {
            setPreview(URL.createObjectURL(trackdetails.audioImg)); // File: Create object URL
        }
    }, [trackdetails.audioImg])


    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setToken(sessionStorage.getItem('token'))
        }
    },[])

    // console.log(token)

    // console.log(preview)

    return (
        <>

            <div className="grid grid-cols-12 bg-[#070707] min-h-[100vh]">
                <div className="col-span-2"></div>
                <div className="col-span-8 lg:p-10 p-0">
                    <div className='bg-[#323131] p-12 rounded-md flex flex-col items-center justify-center m-3'>
                        <h1 className='text-white mb-5 text-[20px]'>Edit Track in your Playlist</h1>

                        <div className='grid md:grid-cols-4 grid-cols-1 w-full'>
                            <div className='col-span-1 lg:p-2 p-0  w-full flex flex-col items-center justify-center'>
                                <label htmlFor="TrackImage">
                                    <img className='rounded-full  ' style={{ width: '150px', height: '150px' }} src={preview ? preview : `${serverUrl}/${trackDetails.audioImg}`} alt="" />
                                    <input onChange={(e) => handleAudioImg(e)} type="file" style={{ display: "none" }} id="TrackImage" />
                                </label>
                            </div>
                            <div className='col-span-3 lg:p-5  w-full flex flex-col '>
                                <input onChange={(e) => setTrackDetails({ ...trackdetails, category: e.target.value })} value={trackdetails.category} type="text" placeholder='category' className='p-2 form-control mb-3 w-100 rounded-sm' />
                                <input onChange={(e) => setTrackDetails({ ...trackdetails, title: e.target.value })} value={trackdetails.title} type="text" placeholder='title' className='p-2  form-control mb-3 w-100 rounded-sm' />
                                <input onChange={(e) => setTrackDetails({ ...trackdetails, description: e.target.value })} value={trackdetails.description} type="text" placeholder='Description' className='p-2  form-control mb-7 w-100 rounded-sm' />

                                <label htmlFor="Audio"><span className="text-bold border text-white border-transparent lg:p-3 p-1 bg-gray-500">Upload Audio File</span>
                                    <input onChange={(e) => handleAudioUrl(e)} style={{ display: 'none' }} id="Audio" type="file" placeholder='audio Url' className='p-2  form-control mb-3 w-100 rounded-sm' />
                                </label>


                            </div>

                        </div>
                        <div className='flex gap-4 lg:ms-auto mt-5 lg:mt-0  me-5 text-white'>
                            <button onClick={handleCancel} className='bg-[#a4442f]  p-3 rounded-sm'>Cancel</button>
                            <button onClick={handleUpdate} className='bg-[#57862c] p-3 rounded-sm'>Update</button>
                        </div>

                    </div>
                </div>
                <div className="col-span-2"></div>

            </div>
        </>
    )
}

export default EditPlaylist
