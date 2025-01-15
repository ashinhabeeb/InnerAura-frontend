import React from 'react'
import { Link } from 'react-router-dom'

function Challenges() {
  return (
    <>
      <div className='bg-black min-h-screen p-5'>
        <h1 className='text-center text-white text-[70px]'>Set a Goal</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 text-white mt-20  '>

            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[20px]'>The 3 Days Gratitude Challenge</h1>
                {/* <p className='mt-6 text-center'>This challenge helps  <br />you to become a better person</p> */}
                <p className='mt-6'>Durartion : 3 X 10 min track</p>
                <img className='rounded-sm mt-5' src="https://images.unsplash.com/photo-1554355201-f096c2044135?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpbmRuZXNzfGVufDB8fDB8fHww" alt="" style={{width:'250px',height:'200px'}} />
                <button className='p-2 mt-5 w-[140px] bg-orange-500 rounded-sm text-white'>Start</button>
            </div>
            <div className='flex flex-col justify-center items-center mt-16 md:mt-0 '>
                <h1 className='text-[20px]'>The 5 Day Mindfullness challenge</h1>
                {/* <p className='mt-6 text-center'>This challenge helps  <br />you to become a better person</p> */}
                <p className='mt-6'>Durartion : 5 X 10 min track</p>
                <img className='rounded-sm mt-5' src="https://plus.unsplash.com/premium_photo-1661962526339-13619deaa68e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGtpbmRuZXNzfGVufDB8fDB8fHww" alt="" style={{width:'250px',height:'200px'}} />
                <button className='p-2 mt-5 w-[140px] bg-orange-500 rounded-sm text-white'>Start</button>

            </div>
            <div className='flex flex-col justify-center items-center mt-16 md:mt-0'>
                <h1 className='text-[20px]'>7 day Affirmation challenge</h1>
                {/* <p className='mt-6 text-center'>This challenge helps  <br />you to become a better person</p> */}
                <p className='mt-6'>Durartion : 7 X 10 min track</p>
                <img className='rounded-sm mt-5' src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhfGVufDB8fDB8fHww" alt="" style={{width:'250px',height:'200px'}} />
                <button className='p-2 mt-5 w-[140px] bg-orange-500 rounded-sm text-white'>Start</button>

            </div>
        </div>
        
        <div className='mt-10 flex justify-center items-center'>
                <Link to={'/alltracks'} ><button className='bg-[#d5be92] p-3 text-black'>Browse all Mediation Tracks </button></Link>
            </div>
      </div>
    </>
  )
}

export default Challenges
