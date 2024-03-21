
# Notes API




## Installation

Clone git repository

```bash
  npm install 
  npm start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER`

`DB_PASSWORD`

`PORT`

`SECRET`


## API End-Points


#### Home route

```http
  https://noteapi-bpu4.onrender.com/
```

#### Log-In

```http
  https://noteapi-bpu4.onrender.com/user/login
```



| Parameter | Type     | 
| :-------- | :------- | 
| `password` | `string` |  
| `email` | `string` | 

#### Register

```http
  https://noteapi-bpu4.onrender.com/user/register
```

| Parameter | Type     | 
| :-------- | :------- | 
| `username` | `string` | 
| `password` | `string` |  
| `email` | `string` | 

#### Other Routes [Send jwt token generated after logging-in]

```http
  GET https://noteapi-bpu4.onrender.com/notes/getNote
```
```http
  POST https://back-end-mr6o.onrender.com/notes/createNote
```
```http
  PUT https://noteapi-bpu4.onrender.com/notes/updateNote/
```
```http
  DELETE https://noteapi-bpu4.onrender.com/notes/deleteNote
```



