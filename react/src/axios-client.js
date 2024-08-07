import axios from "axios"


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// view request interceptors( they're special function that which will be executed before the request is sent or after)
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})


// respond request interceptor {it takes two function}

axiosClient.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
   try {
        const {response} = error;
        if(response.status ===401 ){
            localStorage.removeItem('ACCESS_TOKEN')
        }
   } catch (e) {
        console.error(e)
   }
    throw error;
})


export default axiosClient

