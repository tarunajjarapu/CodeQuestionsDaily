import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'http://localhost:8000'

const register = async(userData) => {
    toast.info(API_URL + '/register')
    const response = await axios.post(API_URL + '/user/register', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async(userData) => {
    toast.info(API_URL + '/login')
    const response = await axios.post(API_URL + '/user/login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async() => {
    localStorage.removeItem('user')
}

const chat = async() => {
    toast.info(API_URL + '/question/createQuestions')
    const response = await axios.get(API_URL + '/question/createQuestions')
    toast.info(response.data)
    return response.data
}

const authService = {
    register,
    login,
    logout,
    chat
}

export default authService