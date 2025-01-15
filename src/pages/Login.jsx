import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserApi } from '../services/allApi'


function Login() {

  const navigate = useNavigate()

  const [logindetails, setLogindetails] = useState({
    email: "",
    password: ""
  })
  // console.log(logindetails)

  const handleLogin = async () => {
    const { email, password } = logindetails

    if (!email || !password) {
      alert('please fill the form completely')
    }
    else {
      const result = await loginUserApi({ email, password })
      // console.log(result.data)
      if (result.status == 200) {
        alert('login successfull')

        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token', result.data.token)

        setLogindetails({
          email: "",
          password: ""
        })

        navigate('/')

      }
      else if (result.status == 406) {
        alert(result.response.data)
      }
      else {
        alert("something went wrong")
      }
    }

  }


  return (
    <>
      <div className='bg-[#181818] min-h-screen'>
        <div className='grid md:grid-cols-3 grid-cols-1'>
          <div><Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} className='fa-2x md:p-20 p-12' /></Link></div>
          <div className='p-10 flex flex-col justify-center items-center gap-8 mt-10'>
            <h1 className='text-white text-[36px] text-center'>Login to your Account</h1>
            {/* <input type="text" placeholder='username' className='form-control w-full p-2 rounded-sm' /> */}

            <input onChange={(e) => setLogindetails({ ...logindetails, email: e.target.value })} value={logindetails.email} type="text" placeholder='email' className='form-control w-full p-2 rounded-sm' />
            <input onChange={(e) => setLogindetails({ ...logindetails, password: e.target.value })} value={logindetails.password} type="text" placeholder='password' className='form-control w-full p-2 rounded-sm' />

            <Link className='w-full'><button onClick={handleLogin} className='text-white p-2 rounded-sm bg-[#494948] w-full'>Login</button></Link>
            <h1 className='text-white'>New User ?<Link to={'/register'}> Register</Link></h1>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Login
