import logoImg from "../../assets/henryBG-removebg.png"
import { useNavigate } from "react-router-dom";

const Landing = () =>{

  const navigate= useNavigate()

  const Home = () => {
    navigate('/home')
  }

  return(
    <div className="flex bg-bg-landing h-screen bg-no-repeat bg-cover bg-paddingRight" >
      <div className="hidden lg:flex flex-col h-screen w-2/4 justify-center items-center backdrop-blur shadow-xl">
        <h1 className="text-8xl font-mono font-bold text-amber-400 stroke-black" style={{"WebkitTextStroke": "2px black"}}>HENRY TRAVEL</h1>
        <img src={logoImg} alt="none" style={{width:"603px", height:"414px"}}/>
        <button className="bg-amber-400 px-8 py-2 rounded-3xl font-semibold border-solid border-2 border-black"
          onClick={()=>Home()}>
            Start the experience
        </button>
      </div>     
      <div className="flex flex-col h-screen justify-center items-center backdrop-blur-[3px] lg:hidden">
        <h1 className="text-6xl font-mono font-bold text-amber-400" style={{"WebkitTextStroke": "2px black"}}>HENRY</h1>
        <h1 className="text-6xl font-mono font-bold text-amber-400" style={{"WebkitTextStroke": "2px black"}}>TRAVEL</h1>
        <img src={logoImg} alt="none" style={{width:"603px", height:"414px"}}/>
        <button className="bg-amber-400 px-4 py-1 rounded-2xl font-semibold border-solid border-2 border-black" 
          onClick={()=>Home()}>
            Start the experience
          </button>
      </div>
      
    </div>
  )
}

export default Landing;