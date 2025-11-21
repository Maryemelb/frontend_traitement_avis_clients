"use client"
import { useState } from "react";

export default function Comment() {
    const [comment, setComment]= useState('')
    console.log(comment)
    const submit= async (e)=>{
        e.preventDefault()
        console.log(comment)
        console.log(localStorage.getItem("token"));

        let response= await fetch('http://127.0.0.1:8000/predict',{
            method: 'POST',
            body: JSON.stringify({
                comment : comment,
                id_user: localStorage.getItem('user_id')
            }),
            headers: {
                'Content-Type': 'application/json',                
                'Authorization': `Bearer ${localStorage.getItem('token')}`    
            }
            
        })
        return (response.json())

    }
    return (<div>
        <form onSubmit={submit}> 
           <label>Comment</label>
           <input type="text" name="comment" onChange={e=> setComment(e.target.value)}></input>
           <button  type="submit">Submit</button>
    </form>
    </div>);
}
