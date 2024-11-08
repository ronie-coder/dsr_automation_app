import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUploader from './components/FileUploader'
import AnimatedText from './components/AnimatedText'
import HowToUse from './components/HowToUse'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const[filesProcessed, setFilesProcessed] = useState(false)
  useEffect(()=>{
    if(filesProcessed){
      notifyStarted()
    }
  },[filesProcessed])
  const notifyStarted = () => toast(`Files are processed. Please click on download`,{position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className:"generation-started",
    transition: Bounce,});
  return (
    <div className='main-app'>
      <ToastContainer></ToastContainer>
      <h1>Daily Orders Populator</h1>
      <HowToUse></HowToUse>
      <AnimatedText></AnimatedText>
      <FileUploader filesProcessed={filesProcessed} setFilesProcessed={setFilesProcessed}></FileUploader>
    </div>
  )
}

export default App
