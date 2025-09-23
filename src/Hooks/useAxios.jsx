import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://local-market-server-self.vercel.app/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
