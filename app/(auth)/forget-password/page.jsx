"use client"
import { auth } from '@/lib/firebase'
import { Button } from '@nextui-org/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React, {  useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgetPassword() {
  
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState({})

  const handleData=(key,value)=>{
    setData({
      ...data,
      [key]:value
    })
  }
  const handleSendEmail=async()=>{
    setIsLoading(true)
    try {
     if(!data?.email){
      throw new Error("Email is required")
     }
     await sendPasswordResetEmail(auth,data?.email)
     toast.success("Password reset link sent to your email")
    } catch (error) {
      toast.error(error?.message)
    }
    setIsLoading(false)
  }
  
  
  return (
    <main className='login'>
      <section className='flex flex-col gap-3'>
      <Link href={'/'} className='flex justify-center'>
      <Image className='h-10' src="/logo.png" alt="logo" width={80} height={80} />
      </Link>
      <div className='loginform mid:min-w-[440px] w-full lg:min-w-[450px]'>
        <h1 className='font-bold text-xl'>Forgot Password</h1>
        <form 
        onSubmit={(e)=>{
          e.preventDefault()
          handleSendEmail()
        }}
        className='gap-3 flex flex-col'>     
            
            <input 
             type='email'
             name='user-email'
             id='user-email'
             value={data?.email ?? ""}
             onChange={(e)=>handleData("email",e.target.value)}
             placeholder='Enter your Email'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
           
            <Button type='submit' isLoading={isLoading}  color='primary' variant='ghost'>
              Send Reset Link
            </Button>
        </form>
        <div className='flex justify-between'>
          <Link href={'/login'}>
            <button className='font-semibold text-sm text-blue-700'>
              Try Another Way
              </button>
          </Link>
         
        </div>
        
      </div>
      </section>
    </main>
  )
}


