import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CaptainSignup = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    // const [userData, setUserData] = useState({})
    const [vehicleColor, setvehicleColor] = useState('')
    const [vehiclePlate, setvehiclePlate] = useState("")
    const [vehicleCapacity, setvehicleCapacity] = useState("")
    const [vehicleType, setvehicleType] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
        const captainData={
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            password: password,
            email: email,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType:vehicleType

            }
        }

        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)

        if(response.status ===201){
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token',data.token);
            navigate('/captain-home')
        }
        
        setEmail("")
        setPassword("")
        setfirstName("")
        setlastName("")
        setvehicleColor("")
        setvehiclePlate("")
        setvehicleCapacity("")
        setvehicleType("")
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>

                    <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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
                    <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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
                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className="flex gap-4 mb-7">
                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='text'
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => {
                                setvehicleColor(e.target.value)
                            }}

                        />
                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='text'
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => {
                                setvehiclePlate(e.target.value)
                            }}

                        />
                    </div>
                    <div className="flex gap-4 mb-7">
                        <input
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='number'
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => {
                                setvehicleCapacity(e.target.value)
                            }}

                        />

                        <select
                            required
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            value={vehicleType}
                            onChange={(e) => {
                                setvehicleType(e.target.value)
                            }}>
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car" >Car</option>
                            <option value="auto" >Auto</option>
                            <option value="moto" >Moto</option>
                        </select>
                    </div>

                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'

                    >Create Captain Account</button>

                </form>

                <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'> Login here </Link></p>

            </div>

            <div>
                <p className='text-[10px] leading-tight'>By procedding, you consent to get calss,<span className='underline '>WhatsApp or SMS message</span> , including by automated means,from Uber and its <span>affilates to the number provided</span> .</p>
            </div>

        </div>
    )
}

export default CaptainSignup