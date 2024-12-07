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





import React, { useContext, useEffect,useState } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    console.log("token", token)

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                setUser(response.data.user);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.error(err);
            navigate('/login');
        });

    }, [token])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper







