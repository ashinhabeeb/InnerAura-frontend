import React from 'react'
import { Link } from 'react-router-dom'

function MeditationCard({ alltracks }) {

    return (
        <>
            <div className='flex flex-col justify-center items-center p-2'>
                <Link to={`/viewTracks/${alltracks?.Categoryname}`}>
                    <img className='rounded-md' src={alltracks?.Categoryimage} alt="no image" style={{ width: '260px', height: '180px' }} />
                    <p className='text-white text-center'>{alltracks?.Categoryname}</p>
                </Link>
            </div>
        </>
    )
}

export default MeditationCard
