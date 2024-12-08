import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef=useRef(null)
  const panelCloseRef =useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()

  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:24
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://th.bing.com/th/id/R.eadac11b662faa57e4b806263f8e7642?rik=dXbhLg7x49QVbg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuber-logo-vector-png-uber-icon-png-50-px-1600.png&ehk=hWY6TYYwZAYpPbHKLid%2f431JJx%2frKI7tiY%2b6i993Y1A%3d&risl=&pid=ImgRaw&r=0" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>

        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip </h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className='bg-[#eee] px-12 py-2  text-lg rounded-lg w-full mt-5'
              onClick={()=>{
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              type="text"
              placeholder='Add a pick-up location'
            />
            <input 
            className='bg-[#eee] px-12 py-2  text-lg rounded-lg w-full mt-3' 
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            type="text" 
            placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0 '>
              <LocationSearchPanel/>
        </div>
      </div>
            <div className='fixed w-full z-10 bg-white bottom-0 p-3'>
              <div className='flex w-full p-3 bg-red-600 items-center justify-between '>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />
                <div className='bg-green-500 w-1/2'>
                  <h4 className='font-medium text-sm'>UberGo <span><i className="ri-user-3-line"></i>4</span></h4>
                  <h5 className='font-medium text-sm'> 2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹193.20</h2>
              </div>
            </div>

    </div>
  )
}

export default Home