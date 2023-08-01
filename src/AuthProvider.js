import { useState, useEffect } from 'react';
import { createContext } from "react"

// Init context
export const AuthContext = createContext()

// Init function to provide context 
// Methods provided within this function are available to all other components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        const currentUser = window.localStorage.getItem("username")
        const token = window.localStorage.getItem("token")
        setUser(currentUser)
        setToken(token)
    }, [user, token])
  
    return (
      <AuthContext.Provider value={{ user, token }}>
        {children}
      </AuthContext.Provider>
    )
}