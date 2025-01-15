import React, { useEffect, useState } from 'react'
import { UpdateUserProfileApi } from '../services/allApi'
import { serverUrl } from '../services/serverUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Profile() {

    const [userdetails, setUserdetails] = useState({
        username: "",
        email: "",
        password: "",
        profileImg: ""
    })

    const [updatestatus, setUpdateStatus] = useState("")
    const [preview, setPreview] = useState("")
    const [existingImg, setExistingImg] = useState("")

    // console.log(userdetails)
    // console.log(existingImg)

    const handleProfile = (e) => {
        console.log(e.target.files[0])
        setUserdetails({ ...userdetails, profileImg: e.target.files[0] })
    }

    const handleProfileUpdate = async () => {

        const token = sessionStorage.getItem('token')

        const { username, email, password, profileImg } = userdetails

        const reqbody = new FormData()

        reqbody.append("username", username)
        reqbody.append("email", email)
        reqbody.append("password", password)
        preview ? reqbody.append("profileImg", profileImg) : reqbody.append("profileImg", existingImg)


        if (preview) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await UpdateUserProfileApi(reqbody, reqHeader)
            console.log(result)
            if (result.status == 200) {
                alert('succesfully updated')
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                setUpdateStatus(result.data)
            }
            else {
                console.log('something went wrong')
            }

        }
        else {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await UpdateUserProfileApi(reqbody, reqHeader)
            console.log(result)
            if (result.status == 200) {
                alert('succesfully updated')
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                setUpdateStatus(result.data)
            }
            else {
                console.log('something went wrong')
            }
        }
    }

    useEffect(() => {
        const existingUser = sessionStorage.getItem('existingUser');
        if (existingUser) {
            const user = JSON.parse(existingUser);
            console.log(user)
            setUserdetails({ username: user.username, email: user.email, password: user.password });
            setExistingImg(user.profileImg || '');
        }
    }, [updatestatus])

    useEffect(() => {
        if (userdetails.profileImg) {
            setPreview(URL.createObjectURL(userdetails.profileImg))
        }
    }, [userdetails.profileImg])

    // console.log(preview)
    // console.log(existingImg)



    return (
        <>
          <div className="container min-h-[100vh] bg-[#1b1b1b]">
            <h1 className="text-center text-white text-[40px] pt-16">PROFILE</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="col-span-1 flex justify-center lg:justify-start">
                <Link to={"/"}>
                  <button className="btn ms-0 lg:ms-28 text-white">
                    <FontAwesomeIcon className="fa-xl me-1" icon={faArrowLeft} style={{ color: "#ffffff" }} />
                  </button>
                </Link>
              </div>
              <div className="col-span-1 p-10 mt-12 rounded-md flex justify-center items-center border border-[#696868]">
                <div>
                  <label htmlFor="ProfileImg">
                    <input onChange={(e) => handleProfile(e)} type="file" style={{ display: "none" }} id="ProfileImg" />
                    {existingImg === "" ? (
                      <img
                        className="rounded-full mb-5"
                        style={{ width: "200px", height: "200px" }}
                        src={
                          preview
                            ? preview
                            : "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-full mb-5"
                        style={{ width: "200px", height: "200px" }}
                        src={preview ? preview : `${serverUrl}/${existingImg}`}
                        alt=""
                      />
                    )}
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      onChange={(e) => setUserdetails({ ...userdetails, username: e.target.value })}
                      value={userdetails.username}
                      className="form-control p-2 w-full"
                      type="text"
                      placeholder="Name"
                    />
                    <input
                      onChange={(e) => setUserdetails({ ...userdetails, email: e.target.value })}
                      value={userdetails.email}
                      className="form-control p-2 w-full"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="text-center mt-8">
                    <button onClick={handleProfileUpdate} className="btn text-white bg-[#cd5c1f] rounded-sm p-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </>
      );
      
}

export default Profile
