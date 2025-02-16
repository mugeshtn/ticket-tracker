import Header from '../components/Header'
import AuthCard from '../components/AuthCard'

const Register = () => {
  return (
    <>
        <Header signIn={false}/>
        <AuthCard register={true}/>
    </>
  )
}

export default Register