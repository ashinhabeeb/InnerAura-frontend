import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUserApi } from '../services/allApi'


function Register() {

  const navigate = useNavigate()

  const [registerdetails,setRegisterdetails] = useState({
    username:"",
    email:"",
    password:""
  })

  console.log(registerdetails)

  const handleRegister = async()=>{
    
    const {username,email,password} = registerdetails

    if(!username || !email || !password){
      alert('please fill the form completely')
    }
    else{
      const result = await registerUserApi(registerdetails)
      console.log(result)
      if(result.status==200){
        alert('succesfully registered')
        setRegisterdetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else if(result.status==406){
        alert(result.response.data)
      }
      else{
        alert('something went wrong')
      }
    }


  }


  return (
    <>
      <div className='bg-[#111111] min-h-screen'>
        <div className='grid md:grid-cols-3 grid-cols-1'>
          <div><Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} style={{color:'white'}} className='fa-2x md:p-20 p-12' /></Link></div>
          <div className='p-10 flex flex-col justify-center items-center gap-8 mt-10'>
            <h1 className='text-white text-[36px] text-center'>Sign up your Account</h1>

            <input onChange={(e)=>setRegisterdetails({...registerdetails,username:e.target.value})} value={registerdetails.username} type="text" placeholder='username' className='form-control w-full p-2 rounded-sm' />
            <input onChange={(e)=>setRegisterdetails({...registerdetails,email:e.target.value})} value={registerdetails.email} type="text" placeholder='email' className='form-control w-full p-2 rounded-sm'/>
            <input onChange={(e)=>setRegisterdetails({...registerdetails,password:e.target.value})} value={registerdetails.password} type="text" placeholder='password' className='form-control w-full p-2 rounded-sm'/>

           <Link className='w-full'><button onClick={handleRegister} className='text-white p-2 rounded-sm bg-[#343434] w-full '>Register</button></Link>
            <h1 className='text-white'>Already a User ?<Link to={'/login'}> Login</Link></h1>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Register
