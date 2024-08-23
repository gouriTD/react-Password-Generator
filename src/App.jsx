import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [pwdLength, setPwdLength] = useState(10);
  const [isUpperCaseAllowed, setIsUpperCaseAllowed] = useState(true);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharacterAllowed, setIsSpecialCharacterAllowed] = useState(false);

  const pwdRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let charStr = "abcdefghijklmnopqrstuvwxyz";
    let pwd = "";
    
    if(isUpperCaseAllowed){
      charStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }

    if(isNumberAllowed){
      charStr += "0123456789"
    }

    if(isSpecialCharacterAllowed){
      charStr += "~`! @#$%^&*()_-+={[}]|\:;<,>.?/"
    }

    console.log(charStr,pwdLength)

    for (let index = 1; index <= pwdLength; index++) {
      
      const charIndex = Math.floor(Math.random() * charStr.length) + 1
      pwd += charStr.charAt(charIndex)
    }
    setPassword(pwd);
  },[isNumberAllowed,isSpecialCharacterAllowed,isUpperCaseAllowed,setPassword,pwdLength])

  const copyPasswdToClipboard = useCallback(()=>{
    // here we will try to copy the password generated in the clipboard
    window.navigator.clipboard.writeText(pwdRef.current.value)

    // With select we set focus on the entire character set.
    pwdRef?.current.select()

     // With setSelectionRange we set focus on the given range of character set.
    // pwdRef?.current.setSelectionRange(0,5)
  },[pwdRef])
  


  useEffect(()=>{
    console.log(`pwdLength: ${pwdLength}`)
    generatePassword();
  },[isUpperCaseAllowed,isNumberAllowed,isSpecialCharacterAllowed,pwdLength])



  return (
    <>
      <div className=' flex justify-center items-center w-full h-full' >
        <div className=' w-[300px] h-[400px] bg-slate-300  shadow-xl rounded-lg p-4'>
          <h2 className='text-blue-800 text-2xl font-bold mb-6'>Password Generator</h2>
          <div className='w-[100] flex mb-10'>
            <input className="bg-white shrink-0 outline-none px-2 rounded-l-lg text-gray-800 font-semibold" 
            type="text" 
            placeholder='Password' 
            value={password}
            readOnly
            ref={pwdRef}
            />
            <button 
            className=' hover:bg-blue-800 active:outline-none'
            onClick={copyPasswdToClipboard}
            >
              Copy
            </button>
          </div>
         
          <input 
              className=" cursor-pointer" 
              type="range" 
              min={1}
              max={20} 
              value={pwdLength} 
              id='pwdLen' 
              onChange={(e)=>{
                setPwdLength(e.target.value)
              }}
          />
          <label className=' text-gray-800 font-semibold ml-2'>length: {pwdLength}</label>

          <div className='w-[100] flex mb-3 mt-3'>
            <label className=' text-gray-900 font-semibold mr-7'>Uppercase letters included: </label>
            <input className="bg-white" type="checkbox" defaultChecked={isUpperCaseAllowed} onChange={()=>setIsUpperCaseAllowed(prev=>!prev)}/>
          </div>

          <div className='w-[100] flex mb-3 mt-3'>
            <label className=' text-gray-900 font-semibold mr-7'>Numbers included: </label>
            <input className="bg-white" type="checkbox" defaultChecked={isNumberAllowed} onChange={()=>setIsNumberAllowed(prev=>!prev)}/>
          </div>

          <div className='w-[100] flex mb-3 mt-3'>
            <label className=' text-gray-900 font-semibold mr-7'>Special characters included: </label>
            <input className="bg-white" type="checkbox" defaultChecked={isSpecialCharacterAllowed} onChange={()=>setIsSpecialCharacterAllowed(prev=>!prev)}/>
          </div>
          
        </div>
      </div>
      
    </>
  )
}

export default App
