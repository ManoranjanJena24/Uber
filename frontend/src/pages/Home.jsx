import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef=useRef(null)
  const confirmRidePanelRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const panelRef=useRef(null)
  const panelCloseRef =useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)

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


  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confirmRidePanel])



  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicleFound])


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
              <LocationSearchPanel  setPanelOpen={setPanelOpen}  setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-10 pt-12'>
           <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>           
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12'>
            <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>           
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12'>
              <LookingForDriver/>
           </div>

            

    </div>
  )
}

export default Home