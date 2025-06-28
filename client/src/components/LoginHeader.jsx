import React from 'react'

function LoginHeader({message}) {
  return (
    <>
    <header style={{ backgroundColor: "#efefd0" }} className="px-8 py-2.5 flex justify-between items-center shadow-md z-10">
      <h1 className="text-2xl font-black">AuthExplorer</h1>
        <h2 className="text-lg italic font-black">{message}</h2>
    </header>
    </>
  )
}

export default LoginHeader;
