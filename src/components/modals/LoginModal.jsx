import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import Modal from "./Modal"
import useLoginModal from '../../hooks/useLoginMoal';
import { useForm } from "react-hook-form";
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from "../Button";
import { AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import useRegisterModal from "../../hooks/useRegisterModal";
import axios from "axios";
import useUserStore from "../../hooks/useUserStore";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues:{
      email:"",
      password:"",
    }
  });

  const onSubmit = (data) => {
    axios.post('/api/auth/signin', data)
      .then(result=>{
        toast.success('로그인 완료!')
        userStore.login(result.data);
        loginModal.onClose();
      })
      .catch(err=>{
        console.log(err);
        toast.error('로그인 실패!')
      })
  }

  const onToggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal, registerModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="환영합니다" subtitle="에어비엔비 계정에 로그인 하세요"/>
      <Input 
        id="email"
        type="email"
        label="이메일"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        type="password"
        id="password"
        label="비밀번호"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="구글로 로그인"
        icon={FcGoogle}
      />
      <Button 
        outline
        label="깃허브로 로그인"
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          에어비엔비는 처음이신가요?
          <span onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">계정 만들기</span>
        </p>

      </div>
    </div>
  )


  return (
    <Modal 
      isOpen={loginModal.isOpen}
      disabled={loading}    
      body={bodyContent}
      footer={footerContent}
      title="로그인"
      actionText="계속하기"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal