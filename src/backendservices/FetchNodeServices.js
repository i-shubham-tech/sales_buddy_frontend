import axios from "axios";
// const serverURL="https://jw8bn53z-5000.inc1.devtunnels.ms"
const serverURL = "https://salesbuddy-backend.onrender.com"

const postData = async (url, body) => {
  try {
    var response = await axios.post(`${serverURL}/${url}`, body)
    var result = response.data
    return (result)
  }
  catch (e) {
    return (null)
  }

}
const getData = async (url) => {

  try {
    var response = await axios.get(`${serverURL}/${url}`)
    var result = response.data
    return (result)
  }
  catch (e) {
    return (null)
  }
}
const getAuthData = async (url) => {

  try {
    var response = await axios.get(`${serverURL}/${url}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    return response.data
  }
  catch (error) {
    return error.response.data
  }
}
const postAuthData = async (url, body) => {
  try {
    var response = await axios.post(`${serverURL}/${url}`, body, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    return response.data
  }
  catch (error) {
    return error.response.data
  }

}

const generateOtp = () => {
  const otp = parseInt(Math.random() * 8999 + 1000)
  return otp
}





export { serverURL, postData, getData, generateOtp, postAuthData, getAuthData }