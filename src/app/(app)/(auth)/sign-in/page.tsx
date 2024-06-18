import { redirect } from 'next/navigation'

import SignInForm from '@/app/(app)/(auth)/sign-in/_components/SignInForm'
import { auth } from '@/lib/auth'

const SignInPage = async () => {
  const session = await auth()
  if (session) return redirect('/')
  return <SignInForm />
}

export default SignInPage
