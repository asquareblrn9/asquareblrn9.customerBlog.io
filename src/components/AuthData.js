import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthData = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(()=>{
        const check = onAuthStateChanged(auth, (user)=>{
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
    },[])

  return (
    <div>
      
    </div>
  )
}

export default AuthData
