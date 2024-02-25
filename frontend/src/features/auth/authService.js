import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'http://localhost:8000/user/'

const register = async(userData) => {
    toast.info(API_URL + '/register')
    const response = await axios.post(API_URL + '/register', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async(userData) => {
    toast.info(API_URL + '/login')
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async() => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService