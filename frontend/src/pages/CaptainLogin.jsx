import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

        //2 way binding is react koo pataa nahii chaltaa aap kyaa type kartee hee
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [captainData, setCaptainData] = useState({})
    
        //Default behaviour of reloading koo stop karnee kee liyee e.preventDefault()
        const submitHandler = (e) => {
            e.preventDefault();
            console.log(email, password)
            setCaptainData({
                email: email,
                password: password
            })
            console.log(userData)
            setEmail('');
            setPassword('');
        }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='email'
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'

                        type='password'
                        placeholder='password'
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'

                    >Login</button>
                </form>

                <p className='text-center'>Want to Join a fleet? <Link to='/captain-signup' className='text-blue-600'> Register as a Captain ?</Link></p>

            </div>

            <div>
                <Link
                    to='/login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as User</Link>
            </div>

        </div>
    )
}

export default CaptainLogin