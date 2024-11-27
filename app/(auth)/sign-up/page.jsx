"use client"
import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase'
import { createUser } from '@/lib/firestore/user/write'
import { Button } from '@nextui-org/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignUp() {
  
  const {user}=useAuth()
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState({})

  const handleData=(key,value)=>{
    setData({
      ...data,
      [key]:value
    })
  }
  const handleSignUp=async()=>{
    setIsLoading(true)
    try {
      const credential=await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      )
      await updateProfile(credential.user,{
        displayName:data?.name
      })
      const user=credential.user

      await createUser({
        uid:user.uid,
        displayName:data?.name,
        photoURL:user?.photoURL
      })
      toast.success("Account created successfully")
      router.push('/account')
    } catch (error) {
      toast.error(error?.message)
    }
    setIsLoading(false)
  }
  
  
  return (
    <main className='login'>
      <section className='flex flex-col gap-3'>
      <Link href={'/'} className='flex justify-center'>
        <img className='h-10' src="logo.png" alt="logo" />
      </Link>
      <div className='loginform mid:min-w-[440px] w-full lg:min-w-[450px]'>
        <h1 className='font-bold text-xl'>Sign Up with Email</h1>
        <form 
        onSubmit={(e)=>{
          e.preventDefault()
          handleSignUp()
        }}
        className='gap-3 flex flex-col'>     
            <input 
             type='text'
             name='user-name'
             id='user-name'
             value={data?.name ?? ""}
             onChange={(e)=>handleData("name",e.target.value)}
             placeholder='Enter your Name'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
            <input 
             type='email'
             name='user-email'
             id='user-email'
             value={data?.email ?? ""}
             onChange={(e)=>handleData("email",e.target.value)}
             placeholder='Enter your Email'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
            <input 
             type='password'
             name='user-password'
             id='user-password'
             value={data?.password ?? ""}
             onChange={(e)=>handleData("password",e.target.value)}
             placeholder='Enter your Password'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
            <Button type='submit' isLoading={isLoading} isDisabled={isLoading} onClick={handleSignUp}  color='primary' variant='ghost'>
              Sign Up
            </Button>
        </form>
        <div className='flex justify-between'>
          <Link href={'/login'}>
            <button className='font-semibold text-sm text-blue-700'>
              Already have an account? Sign in
              </button>
          </Link>
         
        </div>
        
      </div>
      </section>
    </main>
  )
}


