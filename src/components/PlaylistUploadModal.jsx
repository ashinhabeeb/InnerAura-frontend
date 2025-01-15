import { useEffect, useState } from "react";
import { addTracktoPlaylist } from "../services/allApi";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function PlaylistUploadModal() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [trackdetails, setTrackDetails] = useState({
    category: "",
    title: "",
    description: "",
    audioImg: "",
    audioUrl: "",
  });

  const handleCancel = () => {
    setTrackDetails({
      category: "",
      title: "",
      description: "",
      audioImg: "",
      audioUrl: "",
    });
    setPreview("");
  };

  const handleAdd = async () => {
    const { category, title, description, audioImg, audioUrl } = trackdetails;

    if (!category || !title || !description || !audioImg || !audioUrl) {
      alert("Please fill the form completely");
    } else {
      const reqbody = new FormData();
      reqbody.append("category", category);
      reqbody.append("title", title);
      reqbody.append("description", description);
      reqbody.append("audioImg", audioImg);
      reqbody.append("audioUrl", audioUrl);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await addTracktoPlaylist(reqbody, reqHeader);
        console.log(result);
        alert("Successfully added to playlist");
        setTrackDetails({
          category: "",
          title: "",
          description: "",
          audioImg: "",
          audioUrl: "",
        });
        setPreview("");
        navigate("/myplaylist");
      } else {
        alert("Please login");
      }
    }
  };

  const handleAudioImg = (e) => {
    setTrackDetails({ ...trackdetails, audioImg: e.target.files[0] });
  };

  const handleAudioUrl = (e) => {
    setTrackDetails({ ...trackdetails, audioUrl: e.target.files[0] });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (trackdetails.audioImg) {
      setPreview(URL.createObjectURL(trackdetails.audioImg));
    }
  }, [trackdetails.audioImg]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#070707] min-h-[100vh]">
      {/* Left Section */}
      <div className="lg:col-span-2 p-4">
        <Link to={"/myplaylist"}>
          <button className="btn mt-10 ms-0 lg:ms-20 text-white flex items-center">
            <FontAwesomeIcon
              className="fa-xl me-2"
              icon={faArrowLeft}
              style={{ color: "#ffffff" }}
            />
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-8 p-4">
        <div className="bg-[#323131] p-6 lg:p-12 rounded-md flex flex-col items-center justify-center">
          <h1 className="text-white mb-5 text-xl lg:text-2xl">
            Add Track to your Playlist
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
            {/* Image Upload Section */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <label htmlFor="TrackImage">
                <img
                  className="rounded-full"
                  style={{ width: "150px", height: "150px" }}
                  src={
                    preview
                      ? preview
                      : "https://static.vecteezy.com/system/resources/previews/000/336/877/original/vector-gallery-icon.jpg"
                  }
                  alt=""
                />
                <input
                  onChange={handleAudioImg}
                  type="file"
                  style={{ display: "none" }}
                  id="TrackImage"
                />
              </label>
            </div>

            {/* Input Fields */}
            <div className="col-span-3 flex flex-col gap-4">
              <input
                onChange={(e) =>
                  setTrackDetails({ ...trackdetails, category: e.target.value })
                }
                value={trackdetails.category}
                type="text"
                placeholder="Category"
                className="p-2 form-control w-full rounded-sm"
              />
              <input
                onChange={(e) =>
                  setTrackDetails({ ...trackdetails, title: e.target.value })
                }
                value={trackdetails.title}
                type="text"
                placeholder="Title"
                className="p-2 form-control w-full rounded-sm"
              />
              <input
                onChange={(e) =>
                  setTrackDetails({
                    ...trackdetails,
                    description: e.target.value,
                  })
                }
                value={trackdetails.description}
                type="text"
                placeholder="Description"
                className="p-2 form-control w-full rounded-sm"
              />
              <label htmlFor="Audio">
                <span className="text-bold border text-white border-transparent p-3 bg-gray-500 cursor-pointer">
                  Upload Audio File
                </span>
                <input
                  onChange={handleAudioUrl}
                  style={{ display: "none" }}
                  id="Audio"
                  type="file"
                  className="p-2 form-control w-full rounded-sm"
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 text-white">
            <button
              onClick={handleCancel}
              className="bg-[#a4442f] px-6 py-3 rounded-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="bg-[#57862c] px-6 py-3 rounded-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Right Spacer */}
      <div className="lg:col-span-2"></div>
    </div>
  );
}

export default PlaylistUploadModal;
