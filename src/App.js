import ToastProvider from './providers/ToastProvider'
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <ToastProvider />
      <RegisterModal/>
      <Navbar />
    </>
    );
}

export default App;
