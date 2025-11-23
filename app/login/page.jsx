"use client"
import { useState } from "react";
import Link from "next/link"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        // OAuth2PasswordRequestForm only accepts form-data encoded as URL-encoded.
        const form = new URLSearchParams();
        form.append("username", username)
        form.append("password", password)
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
            method: 'POST',
            body: form.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        response = await response.json()
        localStorage.setItem('token', await response["access_token"])
        localStorage.setItem('user_id', await response["user_id"])

    }
    return (<div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center mx-auto px-6 py-10">
                <a href="google.com" className="flex items-center text-2xl font-semibold text-gray-600 mb-6 dark:text-white">
                    <img className=" w-25  mr-5" src="robot.png" alt="logo" />
                    traiter automatiquement les avis des clients
                </a>
                <div className="w-full sm:max-w-md bg-white rounded-lg shadow dark:border md:mt-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 ">
                        <h1 className="font-bold text-2xl dark:text-white">Sign in to your account</h1>
                        <form action="" onSubmit={submit} class="space-y-4">
                            <div>
                                <label htmlFor="email" className="block font-medium text-sm mb-2 text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" placeholder="name@example.com" onChange={e => setUsername(e.target.value)} className="w-full focus:outline-none bg-gray-100 py-3 px-3 rounded-lg text-gray-900 border-gray-400 focus:border-amber-200 dark:placeholder-gray-700" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block font-medium text-sm mb-2 text-gray-900  dark:text-white">Your password</label>
                                <input type="password" name="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} className="w-full focus:outline-none bg-gray-100 py-3 px-3 rounded-lg text-gray-900 border-gray-400 focus:border-amber-200 dark:placeholder-gray-700" />
                            </div>
                            <button type="submit" className="w-full bg-green-400 rounded-2xl py-2 font-bold text-lg text-white">Sign in</button>
                            <p className="text-gray-400 dark:text-white" >Don't have an account <Link href={"/signup"} className="text-green-500 underline">sign up</Link></p>
                        </form>
                    </div>


                </div>

            </div>


        </section>
    </div>);
}