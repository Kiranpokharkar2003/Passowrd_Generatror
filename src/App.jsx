import { useState, useEffect, useCallback, useRef} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg';
import './App.css'

function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-{}[]~`'<>,"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass) 
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    password.current?.setSelectionRange(0,19);
    window.navigator.clipboard.writeText(password)
  }, [password])

   useEffect(()=>{
    passwordGenerator()
    }, [length, numberAllowed,charAllowed, passwordGenerator ]
  )
  return (
    <>
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-10 my-8 py-5 text-blue-700 bg-slate-400 text-center'>
     <h1 className='text-black text-3xl text-center font-semibold tracking-wide my-3'>Password Generator</h1>
     <input type='text' value={password} className='outline-none rounded-lg w-full py-1 px-5' placeholder='password' readOnly ref={passwordRef}/>
     <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-300 text-white px-3 py-0.5 mt-2 shrink.0'>copy</button>
    
     <div className='flex text-center text-sm gap-x-2'>
      <input type='range' min={6} max={20} value={length}
      className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/><br/>
      <label className='text-black mt-2 font-senmibold font-medium'>length : {length}</label>
     </div>
     <div className='flex text-sm gap-x-2'>
      <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChangeCapture={()=>{
       setNumberAllowed((prev) => !prev); 
      }}
      />
      <label className='text-black mt-2 font-senmibold font-medium' htmlFor='numberInput'>Number</label>
     </div>
     <div className='flex text-sm gap-x-2'>
     <input type='checkbox' defaultChecked={charAllowed} id='characterInput' onChangeCapture={()=>{
       setCharAllowed((prev) => !prev); 
      }}
      />
      <label className='text-black mt-2 font-senmibold font-medium' htmlFor='numberInput '>Character</label>
     </div>
    </div>
    </>
  )
}

export default App
