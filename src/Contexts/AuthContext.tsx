import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode;
  }

export const AuthContext = createContext<Object>({})

const AuthContextProvider: React.FC<Props> = ({children}) => {
    const [token, setToken] = useState<string | null>(null)

    const signIn = async (username: string, password: string): Promise<{message: string}> => {
        try {
            const {data} = await axios.post<{message: string, token: string}>(`${process.env.REACT_APP_API_URL}/api/user/sign-in`, {username, password})
            setToken(token)
            return {message: data.message}
        } catch (error) {
            return Promise.reject(error)
        }     
    }

    const signUp = async (username: string, password: string, name: string, profilePicture: string): Promise<{message: string}> => {
        try {
            const {data} = await axios.post<{message: string}>(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, {username, password, profilePicture, name})
            signIn(username, password)
            return {message: data.message}
        } catch (error) {
            return Promise.reject(error)
        }   
    }




    const authorizeToken = async (): Promise<void> => {
        const token: string | null = localStorage.getItem("token")
        try {
            if(token){
                const {data} = await axios.post<{message: string}>(`${process.env.REACT_APP_API_URL}/api/user/authorize-token`, {token})
                setToken(token)
                //toast 
                console.log(data.message)
            }
        } catch (error) {
            //toast
            console.log(error)
        }
        
    }

    useEffect(()=>{
        authorizeToken()
    }, [])


  return (
    <AuthContext.Provider value={{signUp, signIn, token}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
