import axios from "axios";
import { useState} from "react";
import { createContext, useContext } from "react";
import {useNavigate} from 'react-router-dom'



const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)



export const AuthProvider =({children})=>
{
    const [accessToken,setAccessToken] = useState(null);
    const [user,setUser] = useState(null);
    const navigate = useNavigate()
 

    const login = async (username,password) =>
    {    
        console.log("now i am here 2")
        const res = await axios.post('http://localhost:4000/api/login',{username,password},{withCredentials :true});
        setAccessToken(res.data.accessToken)
        setUser(res.data.user);


        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('user',JSON.stringify(res.data.user))


        console.log("this ==>>",res.data)
        

        navigate('/')
        
        
    };

    const logout = async () =>
    {
        await axios.post('http://localhost:4000/api/logout',{},{withCredentials:true});
        setAccessToken(null)
        setUser(null)

        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        

        navigate('/')
    }

    const refreshToken = async () =>
    {
        const res = await axios.post('http://localhost:4000/api/refresh',{},{withCredentials:true});
        setAccessToken(res.data.accessToken);
        setUser(res.data.user)
        
        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('user',JSON.stringify(res.data.user))

        return res.data.accessToken;
    }

    return(
        <AuthContext.Provider value = {{accessToken,user,login,refreshToken,logout}} >
            {children}
        </AuthContext.Provider>
    )
}