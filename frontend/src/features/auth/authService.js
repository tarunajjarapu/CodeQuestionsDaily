import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = `http://localhost:8000/user/register`

const register = async(userData) => {
    toast.error(API_URL)
    const response = await axios.post(API_URL, userData)
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
    logout
}

export default authService