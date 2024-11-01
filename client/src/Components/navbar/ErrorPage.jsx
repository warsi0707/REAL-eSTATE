import React from 'react'
import { useRouteError } from 'react-router-dom'
export default function ErrorPage() {
   const error = useRouteError()
   console.error(error)
  return (
    <div className='h-screen'>
      <h1 className='text-white'>Page not found</h1>
    </div>
  )
}
