"use client"
import { useState, useEffect } from "react";

export default function Comment() {
    const [comment, setComment] = useState('')
    const [data, setData]= useState([])
    console.log(comment)

    const loadComments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            });
      
            if (!response.ok) {
              console.error("Failed to fetch comments:", response.status);
              return;
            }
      
            setData(await response.json()); // now comments is already an array
            console.log(data)

          } catch (error) {
            console.error("Error fetching comments:", error);
          }
      };
    useEffect(() => {
        loadComments();
    }, [comment])

    const submit = async (e) => {
        e.preventDefault()
        console.log(comment)
        console.log(localStorage.getItem("token"));
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`, {
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
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
        <section className="bg-gray-50 h-full w-full" >
            <div className="p-5 flex flex-col max-h-160">
                <div className="overflow-auto  mb-6">
            {
                data.map((com)=>(
                    <div className="overflow-auto  p-5 flex flex-col rounded-lg bg-white border-1 border-solid border-gray-400 inset-shadow-2xs shadow-gray-400 space-y-5 mb-6 md:mx-40 Lg:mx-40 " key={com.id}>
                         <p className="text-yellow-400 font-bold text-lg">
                            {com.score === "5 stars" && "★★★★★"}
                            {com.score === "4 stars" && "★★★★"}
                            {com.score === "3 stars"&& "★★★"}
                            {com.score === "2 stars"&& "★★"}
                            {com.score === "1 star" && "★"}
                            </p>
                         <p>{com.created_at ? new Date(com.created_at).toLocaleString() : "No date"}</p>
                         <p>Added by {com.user_id}</p>
                        <p className="text-gray-450 ">{com.comment}</p>
                    </div>
                ))
               }
               </div>
               <form onSubmit={submit}>
                <div className="flex flex-col mx-5 items-left md:mx-40 Lg:mx-40 ">
                    <label htmlFor="" className="text-sm font-bold mb-3">Add your comment</label>
                    <textarea
                        onChange={e=>setComment(e.target.value)}
                        placeholder="add comment..."
                        className="p-6 h-32 border-2 bg-white  border-gray-300 w-full border-dashed focus:outline-none shadow-none resize-none"
                    />                
                    <button type="submit" className="bg-green-400 text-white w-40 rounded-lg p-1 font-bold mt-3">Add</button>
                </div>
                </form>
            </div>

        </section>
    </div>);
}
