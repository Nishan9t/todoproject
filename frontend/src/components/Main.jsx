import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BsPenFill} from 'react-icons/bs'
import {GrStatusGood} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Main({user}) {

  const url="http://localhost:8000";
  const navigate=useNavigate()
  const [title,setTitle]=useState()
  const [desc,setDesc]=useState()
  const [update,setUpdate]=useState(false)
  const [id,setId]=useState('')
  const userId=localStorage.getItem("userId")

  const[todos,setTodos]=useState([])

  const handleCreate=async(e)=>{
    e.preventDefault();
    console.log(user)
    try{
      const res= await axios.post(`${url}/todo/create`,{
          title:title,
          description:desc,
          userId:userId
      }
      );
      if(res.data.code===402)
      {
        // alert("please login")
        toast.error("please login",{
          position: toast.POSITION.TOP_CENTER
      })
        navigate("/login")
      }
          else if(res.data.code !==200)
          {
            
              // alert(res.data.message)
            
              toast.error(res.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
              
          }
      
          else if(res.data.code===200)
          {     
              // alert(res.data.message)
              toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
              setTitle('')
              setDesc("");
              navigate("/")     
          }
             

  }
  catch(error)
  {
      console.log(error);
  } 
  }

  

 const handleDelete=async(id)=>{

  try{
    const res =await axios.delete(`${url}/todo/delete/${id}`)

    if(res.data.code===200)
    {
      toast.success(res.data.message,{
        position: toast.POSITION.TOP_CENTER
    })
    }
  }
  catch(err)
  {
    console.log(err)
  }

 }


 const handleData=async(todotitle,tododesc,todoid)=>
 {
    setTitle(todotitle);
    setDesc(tododesc);
    setId(todoid);
    setUpdate(true)
   
 }

 //update

 const handleUpdate=async()=>{
 
  try{

    const res =await axios.put(`${url}/todo/update/${id}`,{
      title:title,
      description:desc
    });

    if(res.data.code===200)
    {
      toast.success(res.data.message,{
        position: toast.POSITION.TOP_CENTER
    })
      setTitle('')
      setDesc('')
      setUpdate(false)
      navigate('/')
    }

  }
  catch(error)
  {
    console.log(error);
  }
  

 }
  
 const handleLogout=()=>{
  localStorage.setItem("token",'');
  localStorage.setItem("userId",'');
  navigate("/login")
 }

 const getTodos=async()=>{
 
  try{

    const res=await axios.get(`${url}/todo/read/${userId}`)
    
    if(res.data.code===200)
    {
      const temptodo=res.data.alltodos
      setTodos(temptodo);
    }

  }
  catch(err)
  {
    console.log(err)
  }
}

useEffect(()=>{
  if(!localStorage.getItem('token') || !localStorage.getItem('userId'))
  {
    navigate("/login")
  }
},[localStorage.getItem('token'), localStorage.getItem('userId')])

  useEffect(()=>{
     getTodos();
  },[todos]);
  useEffect(()=>{
    getTodos();
 },[]);
  



  return (
    <div className='md:flex md:h-screen w-screen '>
      <div className='bg-yellow-200 md:w-1/3 md:h-full shadow-2xl shadow-gray-800 overflow-y-auto'>
        <div className='min-h-1/2 w-4/5 bg-yellow-300 mx-auto md:my-auto p-2 md:mt-40 rounded-md'>
        <button className='w-full p-2 bg-red-500 hover:bg-red-700 mt-2'
        onClick={()=>handleLogout()} 
        >Logout</button>
          <div className='flex flex-col my-auto mt-4 h-4/5 '>
            <h1 className='font-bold text-2xl w-full mx-auto text-center mb-4'>Create todo</h1>
            <input type="text" className='w-full rounded-md mb-2 h-8 p-2' placeholder='Title'
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            ></input>
            <textarea placeholder='Description' className='w-full rounded-md mb-4 h-32 p-2'
            value={desc}
            onChange={(e)=>{setDesc(e.target.value)}}
            ></textarea>
          { !update?
            <button className='w-full bg-blue-400 rounded-md  h-12 p-2 text-center mb-4'
          onClick={(e)=>handleCreate(e)}
            >Create</button>
            :
            <button className='w-full bg-blue-400 rounded-md  h-12 p-2 text-center mb-4'
          onClick={(e)=>handleUpdate(e)}
            >Update</button>
            }
          </div>
        </div>
      </div>




      <div className='bg-yellow-100 md:w-2/3 h-full justify-center overflow-y-auto '>
      
      {
       
        todos.length!==0 ?
        todos.map((todo)=>{
          return(
            <div className='w-2/3 bg-green-200 mx-auto mt-4 h-1/5 p-2 rounded-md mb-4'>
              <div key={todo._id} className='flex h-1/5 border border-2 border-black justify-end rounded-md'>
          
                  <button className='mx-2 border border-2 border-x-black px-2  text-blue-500 hover:scale-75'
                  onClick={()=>handleData(todo.title,todo.description,todo._id)}
                  
                  ><BsPenFill/></button>
                  <button className='mx-2 border border-2 border-x-black px-2  text-green-800 hover:scale-75 '
                  onClick={()=>handleDelete(todo._id)}
                  ><GrStatusGood className=' rounded-xl bg-green-500'/></button>
                
              </div>
              <div className='mt-2 '>
                <h1 className='text-xl font-bold border-b-2 border-yellow-500'>{todo.title}</h1>
                <p>{todo.description}</p>
              </div>
            </div>
          )
        })
        :
        <div className='text-center mt-8'>
           <h1 className='text-xl mx-auto text-red-400 '>No Todos created</h1>
           <h1 className='text-xl mx-auto text-green-500'>Please Create New Todo</h1>
        </div>
      }

     

      </div>
    </div>
  )
}
