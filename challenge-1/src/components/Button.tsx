import React, { useState } from 'react'

export default function Button() {
  const [width, setWidth] = useState<number>(60);
  const [height, setHeight] = useState<number>(40);

  const handleClick = () => {
    setWidth(width + 100);
    setHeight(height + 100);
  }

  return (
    <>
      <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" style={{width:width, height:height}} onClick={handleClick}>add</button>
    </>
  )
}
