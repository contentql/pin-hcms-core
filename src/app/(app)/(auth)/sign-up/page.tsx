import { redirect } from 'next/navigation'

import SignUpForm from '@/app/(app)/(auth)/sign-up/_components/SignUpForm'
import { auth } from '@/lib/authjs-payload-adapter/auth'

const SignInPage = async () => {
  const session = await auth()
  if (session) return redirect('/profile')
  return <SignUpForm />
}

export default SignInPage
