import React, { useContext, useEffect, useState } from 'react'
import background from '../assets/bg-wave.avif'
import { Link } from 'react-router-dom';
import MeditationCard from '../components/MeditationCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getallHomeTracksApi } from '../services/allApi';


function Home() {

    const [islogin, setIslogin] = useState(false)


    const [allprojects, setallprojects] = useState([])

    // console.log(allprojects)

    const getHomeTracks = async () => {
        const result = await getallHomeTracksApi()
        // console.log(result.data)

        setallprojects(result.data.slice(0, 3))

    }

    useEffect(() => {
        getHomeTracks()
        if (sessionStorage.getItem('token')) {
            setIslogin(true)
        }
    }, [])

    return (
        <>

            <div className='max-w-full' style={{
                opacity: 1,
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',


            }}
            >

                <Header></Header>


                <div className='w-full grid lg:grid-cols-2 sm:grid-cols-1 '>
                    <div className='text-white md:p-32 p-12'>
                        <h1 className=' text-[29px]'>Find your calm, embrace your minds, your journey to inner peace starts here</h1>
                        {islogin == false ?
                            <Link to={'/login'}><button className='bg-slate-500 rounded-sm p-2 mt-4'>Explore</button></Link>
                            :
                            <Link to={'/alltracks'}><button className='bg-slate-500 rounded-sm p-2 mt-4'>Explore</button></Link>}
                    </div>
                    <div className='md:flex md:justify-center hidden '>
                        {/* <img src={homeImg} alt="no image" className='rounded-full' style={{ height: '450px', width: '450px' }} /> */}
                    </div>
                </div>
            </div>

            {/* home meditation tracks */}
            <div className='bg-[#141414] p-20'>
                <h1 className='text-center text-white text-[35px] mb-8'>Our Meditation Tracks</h1>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 '>
                    {allprojects?.map((item) => (
                        <MeditationCard alltracks={item} />
                    ))
                    }
                </div>
                {islogin == true ?
                    <Link to={'/alltracks'}> <h1 className='text-center text-orange-400 text-[15px] mt-5'>Click to See More Tracks</h1></Link>
                    :
                    <Link to={'/login'}> <h1 className='text-center text-orange-400 text-[15px] mt-5'>Click to See More Tracks</h1></Link>
                }
            </div>


            {/* footer */}

            <Footer></Footer>
        </>
    )
}

export default Home
