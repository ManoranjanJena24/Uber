// import React,{useContext} from 'react'
// import { UserDataContext } from '../context/userContext'
// import{useNavigate}from 'react-router-dom'


// const UserProtectWrapper = ({
//     children
// }) => {
//     // const {user} = useContext(UserDataContext)

//     const token =localStorage.getItem('token')
//     const navigate=useNavigate()
//     console.log("token",token)

//     // if(!user.email){
//     //     navigate('/login')
//     // }

//     if(!token){
//         navigate('/login')
//     }
//   return (
//     <>
//     {children}
//     </>
//   )
// }

// export default UserProtectWrapper





import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/userContext'
import{useNavigate}from 'react-router-dom'


const UserProtectWrapper = ({
    children
}) => {
    const token =localStorage.getItem('token')
    const navigate=useNavigate()
    console.log("token",token)

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])

   
    
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper