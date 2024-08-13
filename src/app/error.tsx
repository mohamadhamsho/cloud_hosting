'use client'

import Image from 'next/image'
import Link from 'next/link'
import errorImage from '../assets/errors.jpg'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <Image src={errorImage} alt="error" width={500} height={500} />
      <h2 className="text-xl text-red">Something went wrong</h2>
      <h2 className="text-xl ">Error message: {error.message}</h2>
      <button
        onClick={() => reset()}
        className="bg-secondary text-white w-fit py-2 px-4 rounded-md mt-2"
      >
        Try again
      </button>
      <Link
        href={'/'}
        className="text-lg bg-primary text-white w-fit py-2 px-4 rounded-md mt-2"
      >
        Go To Home Page
      </Link>
    </div>
  )
}

export default ErrorPage
