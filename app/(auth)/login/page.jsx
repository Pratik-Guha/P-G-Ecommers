"use client"
import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase'
import { Button } from '@nextui-org/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  // const { address = {} } = someObject || {};
  const {user}=useAuth()
  const router=useRouter()

  useEffect(()=>{
    if(user){
      router.push('/dashboard')
    }
  },[user])
  return (
    <main className='login'>
      <section className='flex flex-col gap-3'>
      <Link href={'/'} className='flex justify-center'>
        <img className='h-10' src="logo.png" alt="logo" />
      </Link>
      <div className='loginform mid:min-w-[440px] w-full lg:min-w-[450px]'>
        <h1 className='font-bold text-xl'>Login with Email</h1>
        <form className='gap-3 flex flex-col'>     
            <input 
             type='email'
             name='user-email'
             id='user-email'
             placeholder='Enter your Email'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
            <input 
             type='password'
             name='user-password'
             id='user-password'
             placeholder='Enter your Password'
             className='px-3 py-2 rounded-xl w-full  focus:outline-none'
            />
            <Button color='primary' variant='ghost'>
              Login
            </Button>
        </form>
        <div className='flex justify-between'>
          <Link href={'/sign-up'}>
            <button className='font-semibold text-sm text-blue-700'>Create New Account</button>
          </Link>
          <Link href={'/forget-password'}>
            <button className='font-semibold text-sm text-blue-700'>Forget Password?</button>
          </Link>
        </div>
        <hr/>
        <SignInWithGoogleComponent/>
      </div>
      </section>
    </main>
  )
}


function SignInWithGoogleComponent(){

  const [isLoading, setLoading] = useState(false)
  const handleLogin=async()=>{
    setLoading(true)
    try {
      const user= await signInWithPopup(auth,new GoogleAuthProvider())
    } catch (error) {
      toast.error(error?.message)
    }
    setLoading(false)
  }
  return  <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
      Signin with Google
    </Button>
}