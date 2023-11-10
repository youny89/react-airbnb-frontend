import { Outlet } from 'react-router-dom'

import ToastProvider from './providers/ToastProvider'
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

function App() {
  return (
    <>
      <ToastProvider />
      <SearchModal />
      <RegisterModal/>
      <LoginModal />
      <RentModal />
      <Navbar />
      <div className='pb-20 pt-32 text-xl'>
        <Outlet />
      </div>
    </>
    );
}

export default App;
