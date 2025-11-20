"use client"
import { useState } from "react";

export default function Login() {
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    const submit= async (e)=>{
        e.preventDefault()
        // OAuth2PasswordRequestForm only accepts form-data encoded as URL-encoded.
        const form= new URLSearchParams();
        form.append("username", username)
        form.append("password", password)
        console.log("start")
        let response= await fetch('http://127.0.0.1:8000/login', {
            method:'POST',
            body: form.toString(),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        response = await response.json()
        localStorage.setItem('token',await JSON.stringify(response["access_token"]))
       }
    return (<div> 
          <form >
      <label >email</label>
      <input type="email" name="username" placeholder="Email" required onChange={e =>setUsername(e.target.value)}/><br></br>
      <label >password</label>
      <input type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} /><br></br>
      <button type="submit" onClick={submit}>Login</button>
     </form>
    </div>);
}