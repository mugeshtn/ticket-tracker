import Header from '../components/Header'
import AuthCard from '../components/AuthCard'

const Register = () => {
  return (
    <>
        <Header/>
        <AuthCard register={true}/>
    </>
  )
}

export default Register