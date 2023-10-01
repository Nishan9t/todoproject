import React from 'react'

export default function Navbar({auth,setAuth}) {
  return (
    <div className='flex w-full h-16 items-center justify-center bg-gray-400'>
        {/* <div className={!auth ? "bg-blue-500 h-full cursor-pointer":" h-full cursor-pointer"}>
          <button className={!auth?" m-auto":" m-auto "} onClick={()=>setAuth(false)}>Sign up</button>
        </div> 
        <div className={auth?"bg-blue-500 h-full py-4 px-4 cursor-pointer":"h-full px-4 py-4 cursor-pointer"} onClick={()=>setAuth(true)}>Sign in</div> */}

        


    </div>
  )
}
