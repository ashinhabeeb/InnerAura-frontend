import { commonApi } from "./commonApi";
import {serverUrl} from "./serverUrl"


//get home tracks api

export const getallHomeTracksApi = async()=>{
    return await commonApi('GET',`${serverUrl}/alltracks`,"","")
}

// get alltracks api
export const getallAllTracksApi = async(searchKey)=>{
    return await commonApi('GET',`${serverUrl}/alltracks?search=${searchKey}`,"","")
}

// get details of the specific category
export const getCategoryDetailsApi = async(Categoryname)=>{
    return await commonApi('GET',`${serverUrl}/viewTracks/${Categoryname}`,"","")
}

// api to vire a particular audio track
export const getAudioDetailsApi = async(audiotitle)=>{
    return await commonApi('GET',`${serverUrl}/TrackPlayer/${audiotitle}`,"","")
}

// api to add/register a new user

export const registerUserApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqbody,"")
}

// api to add/register a new user

export const loginUserApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqbody,"")
}

// api to add a new track to playlist
export const addTracktoPlaylist = async(reqbody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/uploadplaylist`,reqbody,reqHeader)
}

// api to get all playlist tracks'
export const getPlaylistTracksApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/allplaylisttracks`,"",reqHeader)
}

// api to vieew playlit tracks in trackplayer
export const viewplaylistTracksApi = async(audiotitle)=>{
    return await commonApi('GET',`${serverUrl}/viewePlaylistTracks/${audiotitle}`,"","")
}

// api to delete playlist tracks
export const deletePlaylistTrackApi = async(id)=>{
    return await commonApi('PUT',`${serverUrl}/myplaylist/${id}`,{},"")
}

// api to edit playlist track
export const EditPlaylistTrackApi = async(id,reqbody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/editplaylistTrack/${id}`,reqbody,reqHeader)
}

// api to update user profile
export const UpdateUserProfileApi = async(reqbody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/profile`,reqbody,reqHeader)
}

// api to add track to saved collection
export const addTosavedCollectionApi = async(reqbody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/savedtracks`,reqbody,reqHeader)
}

// api to get track from saved collection
export const getSavedTracksApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getsavedtracks`,{},reqHeader)
}

// api to delete track from saved collection
export const deletesavedTrackApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/deletesavedtrack/${id}`,{},reqHeader)
}

// api to add journal to backend
export const addJournalApi = async(reqbody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/addjournal`,reqbody,reqHeader)
}

// api to get journal and to display in frontend
export const getJournalApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getJournal`,{},reqHeader)
}

// api to delete journal 
export const deletejornalApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/deletejournal/${id}`,{},reqHeader)
}