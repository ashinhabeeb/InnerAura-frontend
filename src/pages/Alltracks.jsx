import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MeditationCard from '../components/MeditationCard'
import { getallAllTracksApi } from '../services/allApi'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

function Alltracks() {


    const [allcategories, setAllcategories] = useState([])
    const [token, setToken] = useState("")
    const [searchkey, setSearchkey] = useState("")

    const getAllTracks = async () => {

        if(sessionStorage.getItem('token')){
            const result = await getallAllTracksApi(searchkey)
            // console.log(result.data)
            setAllcategories(result.data)
        }   
        
    }
    // console.log(token)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        getAllTracks()
    }, [searchkey])

    // console.log(searchkey)
    // console.log(allcategories)


    return (
        <>
            <div className='bg-[#0a0a0a] min-h-screen'>
                {/* <Header></Header> */}
                {/* search section */}

                    <h1 className='text-white text-center pt-8 text-[30px]'>Choose Your Preference</h1>
                    <Link to={'/'}>
                        <button className="btn ms-12 mt-10 lg:ms-28 text-white">
                            <FontAwesomeIcon className="fa-xl me-1 " icon={faArrowLeft} style={{ color: "#ffffff" }} />
                        </button>
                    </Link>
          
                <div className='flex justify-center items-center gap-2 p-8'>
                    <input onChange={(e) => setSearchkey(e.target.value)} type="text" placeholder='search your mediation track' className='form-control p-2 w-[500px] rounded-sm' />
                    {/* <button className='bg-[#b8a98f] p-2 rounded-sm'>Search</button> */}
                </div>

                <div className='grid grid-cols'>

                </div>

                {/* tracks first row */}


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {allcategories?.map((item, index) => (
                        <MeditationCard key={index} alltracks={item} />
                    ))}
                </div>



                <div className="flex justify-center items-center gap-10 my-14">
                    <Link to={'/myplaylist'}><button className='rounded-sm bg-slate-500 p-2'><h1 className='text-center text-white text-[20px]  cursor-pointer'>My playlist</h1></button></Link>
                    <Link to={'/savedaudios'}><button className='rounded-sm bg-[#d27b37] p-2'><h1 className='text-center text-white text-[20px]  cursor-pointer'>Saved Tracks</h1></button></Link>
                </div>
              
                <Footer></Footer>
            </div>

        </>
    )
}

export default Alltracks
