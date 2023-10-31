import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginMoal';
import useUserStore from '../../hooks/useUserStore';

const UserMenu = () => {
  const logout = useUserStore(state=> state.logout);
  const currentUser = useUserStore(state=> state.currentUser);
  const [ isOpen, setIsOpen] = useState(false)    
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal();
  const toggleOpen = useCallback(()=> setIsOpen(value => !value) ,[])

  const onLogout = () => {
    loginModal.onClose();
    logout();
  }

  return (
    <div className="relrative">
        <div className="flex flex-row items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                당신의 공간을 에어비엔비하세요
            </div>
            <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div className='absolute rounded-xl shadow-md max-w-[300px] w-[50vw] sm:w-[40vw] md:w-[30vw]  bg-white overflow-hidden right-0 top-20 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    <>
                        {currentUser ? <>
                            <MenuItem label="여행" onClick={onLogout}/>
                            <MenuItem label="위시리시트" onClick={onLogout}/>
                            <MenuItem label="예약" onClick={onLogout}/>
                            <MenuItem label="my properties" onClick={onLogout}/>
                            <hr />
                            <MenuItem label="계정" onClick={onLogout}/>
                            <MenuItem label="당신의 공간을 에어비엔비 하세요" onClick={onLogout}/>
                            <hr />
                            <MenuItem label="로그아웃" onClick={onLogout}/>
                        </> : <>
                            <MenuItem label="로그인" onClick={loginModal.onOpen}/>
                            <MenuItem label="회원가입" onClick={registerModal.onOpen}/>
                        </>}
                    </>
                </div>

            </div>
        )}
    </div>
  )
}

export default UserMenu