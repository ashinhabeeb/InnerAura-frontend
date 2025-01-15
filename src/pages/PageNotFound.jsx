import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <img src="https://media.istockphoto.com/id/1388733994/vector/404-error-icon-with-alien-spaceship-page-lost-and-message-not-found-ufo-vector-flat.jpg?s=612x612&w=0&k=20&c=OYQ4jo8uFdgJ6tN5PxorrgIbUBR2rlhJ7RRKdF8zgTw=" alt="" className='w-50' />
        <Link to={'/'}><button className='bg-orange-400 rounded-sm p-2 mt-4 text-white'>Back Home</button></Link>
      </div>
    </>
  )
}

export default PageNotFound
