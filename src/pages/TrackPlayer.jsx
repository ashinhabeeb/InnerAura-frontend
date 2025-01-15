
import React, { useEffect, useState, useRef } from 'react'
import Footer from '../components/Footer'
import { faArrowLeft, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addTosavedCollectionApi, getAudioDetailsApi, viewplaylistTracksApi } from '../services/allApi'
import { useLocation, useNavigate, useParams } from 'react-router'
import { serverUrl } from '../services/serverUrl'






function TrackPlayer() {

    const [audio, setAudio] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef(null)

    const location = useLocation()

    const { audiotitle } = useParams()
    const navigate = useNavigate()



    const isFromPlaylist = location.state?.fromPlaylist || new URLSearchParams(location.search).get('fromPlaylist') === 'true';
    // console.log("Is from playlist:", isFromPlaylist);

    // function to seek to specific time in the audio
    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }

    // function to update the current time and duration of audio

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }

    // function handle playing the audio
    const handlePlay = () => {
        audioRef.current.play()
        setIsPlaying(true)
    }

    // function to handle pausing the audio
    const handlePause = () => {
        audioRef.current.pause()
        setIsPlaying(false)
    }

    // handle download
    const handleDownload = async () => {
        const response = await fetch(audio.audiourl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${audio.audiotitle}.mp3`); // Set the file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object
    }

    // function to format duration of audio in mm:ss format
    const formatDuration = (durationSeconds) => {
        const minutes = Math.floor(durationSeconds / 60)
        const seconds = Math.floor(durationSeconds % 60)
        const formatedSeconds = seconds.toString().padStart(2, '0')

        return `${minutes}:${formatedSeconds}`
    }

    // function to toggle between play and pause
    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause()
        }
        else {
            handlePlay()
        }
    }


    const getAudio = async () => {
        const result = await getAudioDetailsApi(audiotitle)
        // console.log(result.data)
        setAudio(result.data)
        const audioData = result.data
        setAudio({
            audioimage: audioData.audioimage,
            audiourl: audioData.audiourl,
            audiodescription: audioData.audiodescription,
            audiotitle: audioData.audiotitle
        })
    }

    const playlistAudio = async () => {
        const result = await viewplaylistTracksApi(audiotitle)
        // console.log(result.data)
        const playlistData = result.data
        setAudio({
            audioimage: playlistData.audioImg,
            audiourl: playlistData.audioUrl,
            audiodescription: playlistData.description,
            audiotitle: playlistData.title
        })
    }

    const handleSaveTrack = async () => {

        const token = sessionStorage.getItem("token")

        if (token) {

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const reqbody = new FormData()

            reqbody.append("audiodescription", audio.audiodescription)
            reqbody.append("audiotitle", audio.audiotitle)
            reqbody.append("audiourl", audio.audiourl)
            reqbody.append("audioimage", audio.audioimage)

            const result = await addTosavedCollectionApi(reqbody, reqHeader)
            // console.log(result)
            if (result.status == 401) {
                alert(result.response.data)
            }
            else if (result.status == 200) {
                alert(result.data.message)
            }

        }
        else {
            alert("please login to save track to your collection")
            console.log("unauthorised access due to no token")
        }


    }

    useEffect(() => {
        if (isFromPlaylist) {
            playlistAudio()
        }
        else {
            getAudio()
        }

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
        }
        // cleanup before unmount or before reruns
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
            }
        }

    }, [])

    return (
        <>

            <div className='min-h-[120vh] bg-[#727171] '>
                <div className='p-10'></div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* First div */}
                    <div className="">
                        {/* Content of the first div */}

                        <button onClick={() => navigate(-1)} className="btn ms-12 lg:ms-28 lg:mt-2 mb-10 lg:mb-0 text-white">
                            <FontAwesomeIcon className="fa-xl me-1 " icon={faArrowLeft} style={{ color: "#ffffff" }} />
                        </button>

                    </div>

                    {/* Center div */}
                    <div className="flex flex-col justify-center items-center">
                        <div className='p-3'>
                            {isFromPlaylist == true ?
                                <img
                                    className="rounded-lg shadow-2xl "
                                    src={audio?.audioimage?.startsWith('uploads') ? `${serverUrl}/${audio?.audioimage}` : audio?.audioimage}
                                    alt=""
                                />
                                :
                                <img
                                    className="rounded-lg shadow-2xl"
                                    src={audio.audioimage}
                                    alt=""
                                />}
                        </div>

                        <div className="mt-5">

                            <input style={{ width: '390px' }} type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />

                            {isFromPlaylist == true ?
                                <audio ref={audioRef} src={`${serverUrl}/${audio?.audiourl}`} />
                                :
                                <audio ref={audioRef} src={audio.audiourl} />}

                            <div className='track duration flex justify-between'>
                                <p>{formatDuration(currentTime)}</p>
                                <p>{formatDuration(duration)}</p>
                            </div>

                            <div className='flex justify-center items-center'>
                                <button style={{ borderRadius: '50%', width: "60px" }} onClick={handlePlayPause} className="flex items-center justify-center btn p-3 text-[35px] bg-[#383838] ">
                                    {!isPlaying ?
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className="fa-1x ms-1"
                                            style={{ color: "white" }}
                                        />
                                        :
                                        <FontAwesomeIcon
                                            icon={faPause}
                                            className="fa-1x "
                                            style={{ color: "#ffffff" }}
                                        />}

                                </button>
                            </div>




                        </div>
                        <p className="text-center mt-5 text-white text-[30px]">
                            {audio.audiotitle}
                        </p>
                        <p className="text-center mt-5 text-white text-[15px]">
                            {audio.audiodescription}
                        </p>


                    </div>

                    {/* Third div */}
                    <div className="flex justify-center items-center">
                        {/* Content of the third div */}
                    </div>
                </div>

                <div className='flex justify-center items-center gap-8 my-6 '>
                    <button onClick={handleDownload} className='btn rounded-sm text-white bg-orange-500 p-2'>Download</button>
                    <button onClick={handleSaveTrack} className='btn rounded-sm text-white bg-slate-500 p-2'>Save Track</button>

                </div>



            </div>

            <Footer></Footer>
        </>
    )
}

export default TrackPlayer
