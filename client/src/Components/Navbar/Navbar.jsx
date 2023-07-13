import logoImg from '../../assets/henryBG-removebg.png'
import linkedinLogo from '../../assets/testBg-removebg-preview.png'
import ghLogo from '../../assets/githublogo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

   const navigate = useNavigate()
   const handleRedirect = (e) => {
      navigate(e.target.value)
   }

    return(
     <div className="bg-amber-400 h-[50px] w-full flex justify-between items-center px-3 lg:px-6">
         <img className='w-[45px] h-[45px] bg-black rounded-3xl' src={logoImg} alt='Henry Travel'/>
         <div className='flex gap-3 lg:gap-4'>
            <button onClick={(e)=>handleRedirect(e)} value='/' className='font-bold'>Home</button>
            <button onClick={(e)=>handleRedirect(e)} value='/home' className='font-bold'>Countries</button>
            <button onClick={(e)=>handleRedirect(e)} value='/add-activity' className='font-bold'>Add Activity</button>
            <a rel="noreferrer" href="https://www.linkedin.com/in/gonzalo-hernandez-8161b9237/" target="_blank">
               <img className='w-[30px] h-[30px] rounded-3xl' src={linkedinLogo} alt='Linkedin'/>
            </a>
            <a rel="noreferrer" href="https://github.com/GonzaloHz" target="_blank">
               <img className='w-[30px] h-[30px] rounded-3xl' src={ghLogo} alt='Github'/>
            </a>
         </div>
     </div>
    )
 }
 
 export default Navbar;