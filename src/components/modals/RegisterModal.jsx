import axios from 'axios'
import { AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
  useForm
} from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from '../modals/Modal';
import Heading from '../Heading'
import Input from '../inputs/Input';
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '../../hooks/useLoginMoal'

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues:{
      name:"",
      email:"",
      password:"",
    }
  });

  const onSubmit = (data) => {
    setLoading(true);

    axios.post('/api/auth/signup', data)
      .then(result=> {
          console.log(result);
          toast.success('회원가입 완료');
          registerModal.onClose();
      })
      .catch(error=>{
        const errors = error.response.data;
        if(errors.email) {
          setError('email',{type:'server', message: errors.email.msg})
        }
        if(errors.password) {
          setError('password',{type:'server', message: errors.password.msg})
        }
        toast.error('회원가입 실패')
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  const onToggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen();
  },[registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title="에어비엔비에 오신걸 환영합니다"
        subtitle="새로운 계정을 만드세요"
      />

      <Input 
        id="email"
        type="email"
        label="이메일"
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="name"
        type="text"
        label="이름"
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        type="password"
        label="비밀번호"
        register={register}
        errors={errors}
        required
      />

    </div>
  )


  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
        <hr />
        <Button outline label="구글 로그인" icon={FcGoogle}/>
        <Button outline label="깃허브 로그인" icon={AiFillGithub}/>
        <div className='text-neutral-500 text-center mt-4 font-light'>
          <div className='flex flex-row items-center gap-3 justify-center'>
            <span>
              이미 에어비엔비 계정이 있으신가요?
            </span>
            <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>
              로그인
            </span>
          </div>
        </div>
    </div>
  )
  return (
    <Modal 
        disabled={loading}
        isOpen={registerModal.isOpen}
        body={bodyContent}
        footer={footerContent}
        title="회원가입"
        actionText="계속하기"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal