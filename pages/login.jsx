
import Cookies from "js-cookie";
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter();
    const[Password, setPassword] = useState();
    console.log(Password)
    const defPass = 12345;
        const Login = (e) => {
        e.preventDefault();
        if(Password === defPass){
            Cookies.set("loggedin", true);
            router.push("/Members")
        } else{
            alert("wrong")
        }
        }
  return (
   <>
   <input type="number"  onChange={(e) => {setPassword(Number(e.target.value))}}/>
   <button onClick={(e) => {Login(e)}}>login</button>
   
   </>
  )
}

export default Login