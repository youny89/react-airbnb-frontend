import { useNavigate } from "react-router-dom"

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img 
        onClick={()=> navigate('/')}
        alt="로고"
        className="hidden md:block cursor-pointer"
        width={100}
        height={100}
        src="/images/logo.png"
    />
  )
}

export default Logo