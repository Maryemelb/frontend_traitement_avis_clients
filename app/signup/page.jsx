"use client"
import { useState } from "react";
import Link from "next/link"

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        console.log("start")
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create_user`, {
            method: 'POST',
            body: JSON.stringify({
                email: email, //username
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        console.log(JSON.stringify(response))
    }
    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center mx-auto px-6 py-10">
                    <a href="google.com" className="flex items-center text-2xl font-semibold text-gray-600 mb-6 dark:text-white">
                        <img className=" w-25  mr-5" src="robot.png" alt="logo" />
                        traiter automatiquement les avis des clients
                    </a>
                    <div className="w-full sm:max-w-md bg-white rounded-lg shadow dark:border md:mt-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 ">
                            <h1 className="font-bold text-2xl dark:text-white">Create your account</h1>
                            <form action="" onSubmit={submit} class="space-y-4">
                                <div>
                                    <label htmlFor="email" class="block font-medium text-sm mb-2 text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} className="w-full focus:outline-none bg-gray-100 py-3 px-3 rounded-lg text-gray-900 border-gray-400 focus:border-amber-200 dark:placeholder-gray-700" />
                                </div>
                                <div>
                                    <label htmlFor="password" class="block font-medium text-sm mb-2 text-gray-900  dark:text-white">Your password</label>
                                    <input type="password" name="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} className="w-full focus:outline-none bg-gray-100 py-3 px-3 rounded-lg text-gray-900 border-gray-400 focus:border-amber-200 dark:placeholder-gray-700" />
                                </div>
                                <Link href={'/login'}><button type="submit" className="w-full bg-green-400 rounded-2xl py-2 font-bold text-lg text-white">Sign in</button></Link>
                            </form>
                        </div>


                    </div>

                </div>
            </section>
        </div>)
}