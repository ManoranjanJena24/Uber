import React from 'react'

const LocationSearchPanel = (props) => {

  console.log(props)
  // sample array for location

  const locations = [
    "20A, Near Indian Cafe ,Phoeneix market,Pune",
    "24B, Near Bharath Cafe ,Phoeneix market,Pune",
    "22B, Near Cafe ,Phoeneix market,Pune",
    "25B, Near Iranian Cafe ,Phoeneix market,Pune",

  ]
  return (
    <div>
      {
        locations.map(function (elem) {
          return <div onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 active:border-2  border-gray-100  active:border-black  p-3 rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>

        })
      }

    </div>
  )
}

export default LocationSearchPanel