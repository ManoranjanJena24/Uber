import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            username: {
                firstName: firstName,
                lastName: lastName
            },
            password: password,
            email: email
        })
        console.log("userdata", userData)
        setEmail("")
        setPassword("")
        setfirstName("")
        setlastName("")
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://th.bing.com/th/id/R.eadac11b662faa57e4b806263f8e7642?rik=dXbhLg7x49QVbg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuber-logo-vector-png-uber-icon-png-50-px-1600.png&ehk=hWY6TYYwZAYpPbHKLid%2f431JJx%2frKI7tiY%2b6i993Y1A%3d&risl=&pid=ImgRaw&r=0" alt="" />

                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>

                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
                            type='text'
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => {
                                setfirstName(e.target.value)
                            }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                            type='text'
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => {
                                setlastName(e.target.value)
                            }}

                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='email'
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}

                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'

                    >Login</button>
                </form>

                <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'> Login here </Link></p>

            </div>

            <div>
                <p className='text-[10px] leading-tight'>By procedding, you consent to get calss, WhatsApp or SMS message, including by automated means,from Uber and its affilates to the number provided.</p>
            </div>

        </div>
    )
}

export default UserSignup