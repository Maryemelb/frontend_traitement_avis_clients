"use client"
import { useState } from "react";
export default function Signup(){
   const [email, setEmail]= useState('')
   const[password, setPassword]= useState('')
   const submit= async (e)=>{
    e.preventDefault()
    console.log("start")
    let response= await fetch('http://127.0.0.1:8000/create_user', {
        method:'POST',
        body: JSON.stringify({
            email: email, //username
            password: password
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(JSON.stringify(response))
   }
    return( 
    <div>
     <form >
      <label >email</label>
      <input type="email" name="email" placeholder="Email" required onChange={e =>setEmail(e.target.value)}/><br></br>
      <label >password</label>
      <input type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} /><br></br>
      <button type="submit" onClick={submit}>Login</button>
     </form>
    </div>)
}