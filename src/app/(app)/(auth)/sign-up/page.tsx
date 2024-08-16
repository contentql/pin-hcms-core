import SignUpForm from '@/components/auth/sign-up/SignUpForm'
import withNoAuth from '@/utils/withNoAuth'

const SignUpPage = async () => {
  return <SignUpForm />
}

export default withNoAuth(SignUpPage)
