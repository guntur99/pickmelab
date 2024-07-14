import React, { useState } from 'react'
import { useAuth } from './AuthProvider'

export default function Home() {

    const [result, setResult] = useState("");
    const { callFunction, logout } = useAuth();

    const handleClick = async () => {
        const id = await callFunction.getPrincipalId();
        setResult(id);
    }

  return (
    <>
        <center>
            <div className='text-white'>Home</div>
            <button 
                type="button"
                onClick={handleClick}
            >
                Show Id?
            </button>
            <h2 className='text-white'>This is your id principal: {result}</h2>
            <button id="logout" onClick={logout}>
                logout
            </button>
        </center>
    </>
  )
}
