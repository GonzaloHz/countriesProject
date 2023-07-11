import { useNavigate } from "react-router-dom";

const Card = ({continent, flag, id, name, population}) => {

    const navigate = useNavigate()
    const redirectToDetail = (id) => {
        navigate(`/home/${id}`)
        console.log(id);
    }

    return(
        <div className="flex flex-col bg-amber-400 rounded-xl border-solid border-2 border-black opacity-70 w-[300px] h-[200px] pt-4 justify-evenly my-2 lg:my-6">
            <div className="flex px-4 gap-4 text-xl items-center justify-center lg:justify-start">
                <img className="w-[30px] h-[30px]" src={flag} alt={name}/>
                <h1 className="font-bold">{name}</h1>
            </div>
            <div className="flex justify-between px-4 font-semibold text-lg">
                <div>
                    <p>Continent:</p>
                    <p>Population:</p>
                </div>
                <div className="text-right">
                    <p>{continent}</p>
                    <p>{population}</p>
                </div>
            </div>
            <div className="flex justify-center px-4">
                <button onClick={()=>redirectToDetail(id)} className="bg-amber-400 px-12 py-1 rounded-2xl font-semibold border-solid border-2 border-black w-full">See More</button>
            </div>
        </div>
    )
}

export default Card;