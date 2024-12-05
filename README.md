# Uber

#### Backend

## 1 POST : http://localhost:4000/users/register
## INPUT:
{
    "fullname":{
        "firstname":"Yuvraj",
        "lastname":"Singh"
    },
    "email":"yuvraj@gmail.com",
    "password":"123456789"
}

## OUTPUT:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUwNWI1YjFiMDYxMzNiNDQ0MjM4MjkiLCJpYXQiOjE3MzMzMTk1MTV9.LLX3HEv89b1j2JSGne7o5eYRJm3DeIrL32DXG1d_ZIA",
    "user": {
        "fullname": {
            "firstname": "Yuvraj",
            "lastname": "Singh"
        },
        "email": "yuvraj@gmail.com",
        "password": "$2b$10$qfZcf5dQj1a.IqILsdav5OR7X/s60uzSQeK7C1OKXBSSUH2XEEC7S",
        "_id": "67505b5b1b06133b44423829",
        "__v": 0
    }
}



-----------------------------------------------------------------------------------------------------------


## 2 POST : http://localhost:4000/users/login
## INPUT:
{
    "email":"yuvraj@gmail.com",
    "password":"123456789"
}

## OUTPUT:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUwNWI1YjFiMDYxMzNiNDQ0MjM4MjkiLCJpYXQiOjE3MzMzMzIzNjB9.2twSAaU9NFrA8P8xKfXxeiFGuUaXmroX_oJ2YTViBdQ",
    "user": {
        "fullname": {
            "firstname": "Yuvraj",
            "lastname": "Singh"
        },
        "_id": "67505b5b1b06133b44423829",
        "email": "yuvraj@gmail.com",
        "password": "$2b$10$qfZcf5dQj1a.IqILsdav5OR7X/s60uzSQeK7C1OKXBSSUH2XEEC7S",
        "__v": 0
    }
}

---------------------------------------------------------------------------------------------------------------------------------------------------------------


## 2 GET : http://localhost:4000/users/profile
## 2.1) INPUT:
INSIDE Headers
->Keep Key as Authorization
->Keep Value as bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUwNWI1YjFiMDYxMzNiNDQ0MjM4MjkiLCJpYXQiOjE3MzMzNDIzMTV9.fS6AI__Pc6rCB5zzS8TRVf1pPl1L4_yBDGjVJf1GqVY


## OUTPUT:

{
    "fullname": {
        "firstname": "Yuvraj",
        "lastname": "Singh"
    },
    "_id": "67505b5b1b06133b44423829",
    "email": "yuvraj@gmail.com",
    "__v": 0
}




## 2.2) INPUT:
INSIDE Headers
->Keep Key as Authorization
->Keep Value as bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUwNWI1YjFiMDYxMzNiNDQ0MjM4MjkiLCJpYXQiOjE3MzMzNDIzMTV9.fS6AI__Pc6rCB5zzS8TRVf1pPl1L4_yBDGjVJf1GqVY


## OUTPUT:

{
    "fullname": {
        "firstname": "Yuvraj",
        "lastname": "Singh"
    },
    "_id": "67505b5b1b06133b44423829",
    "email": "yuvraj@gmail.com",
    "__v": 0
}
