import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div>
        <div className='flex gap-4 active:border-2  border-gray-100  active:border-black  p-3 rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>24B, Near Iranian Cafe ,Phoeneix market,Pune</h4>
        </div>

        <div className='flex gap-4 active:border-2 p-3 border-white active:border-black  rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>24B, Near Iranian Cafe ,Phoeneix market,Pune</h4>
        </div>
    </div>
  )
}

export default LocationSearchPanel