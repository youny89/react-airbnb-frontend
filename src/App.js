import ToastProvider from './providers/ToastProvider'
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import LoginModal from './components/modals/LoginModal';

function App() {
  return (
    <>
      <ToastProvider />
      <RegisterModal/>
      <LoginModal />
      <Navbar />
    </>
    );
}

export default App;
