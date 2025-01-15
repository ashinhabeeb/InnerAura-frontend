import React from 'react'
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
       <div className='footer grid md:grid-cols-3 grid-cols-1 bg-[#1f1e1e] '>
                    <div className='flex justify-center items-center gap-10 text-white md:mt-10 mt-12 mb-8 '>
                       <Link to={'/'}> <h1 className='cursor-pointer'>Home</h1></Link>
                        <h1 href="/about" className='cursor-pointer'>contact</h1>
                       <a href='/about'> <h1 className='cursor-pointer'>About</h1></a>
                    </div>
                    
                    <div className='text-white  flex flex-col justify-center items-center md:mt-10 '>
                        <h1 className='text-[60px]'>Inner Aura</h1>
                        <hr className='h-2 bg-white'/>
                        <div className='flex gap-3 mt-10 mb-3'>
                            <input type="text" placeholder=' email' className='form-control rounded-sm' />
                            <button className='bg-transparent border border-orange-400 p-1 rounded-sm hover:border-black hover:bg-orange-400 hover:text-black'>Subscribe</button>
                        </div>
                        <div className='w-full mt-16'>
                            <hr className='bg-gray-600 w-full ' style={{height:'1px'}} />
                        </div>
                        <div className='text-center mt-12 mb-3'>
                            <h1 className='text-gray-400 text-[14px]'>@2024 all rights reserved, inner aura developer and founder</h1>
                        </div>

                    </div>
                    <div className='flex justify-center items-center gap-10 text-white mt-30'>
                    <FontAwesomeIcon icon={faInstagram} className='fa-2x hover:scale-125 hover:text-pink-500 cursor-pointer' />
                    <FontAwesomeIcon icon={faTwitter} className='fa-2x  hover:scale-125 hover:text-blue-400 cursor-pointer' />
                    <FontAwesomeIcon icon={faFacebook} className='fa-2x  hover:scale-125 hover:text-blue-600 cursor-pointer' />
                    <FontAwesomeIcon icon={faWhatsapp} className='fa-2x  hover:scale-125 hover:text-green-400 cursor-pointer' />
                    </div>

                </div>
    </>
  )
}

export default Footer
