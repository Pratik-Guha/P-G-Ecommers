"use client"
import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase'
import { createUser } from '@/lib/firestore/user/write'
import { Button } from '@nextui-org/react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  // const { address = {} } = someObject || {};
  const {user}=useAuth()
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState({})
  useEffect(()=>{
    if(user){
      router.push('/account')
    }
  },[user])
  const handleData=(key,value)=>{
    setData({
      ...data,
      [key]:value
    })
  }

  const handleLogin=async()=>{
    setIsLoading(true)
    try {
     await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      )
      
      toast.success("Logged In successfully")
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
        <h1 className='font-bold text-xl'>Login with Email</h1>
        <form onSubmit={(e)=>{
          e.preventDefault(),
          handleLogin()
          }} className='gap-3 flex flex-col'>     
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
            <Button 
            isDisabled={isLoading} 
            isLoading={isLoading} 
            onClick={handleLogin} 
            type='submit'
             color='primary' variant='ghost'>
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
      const credential= await signInWithPopup(auth,new GoogleAuthProvider())
      const user=credential.user
      await createUser({
        uid:user.uid,
        displayName:user?.displayName,
        photoURL:user?.photoURL
      })
    } catch (error) {
      toast.error(error?.message)
    }
    setLoading(false)
  }
  return  <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
      Signin with Google
    </Button>
}