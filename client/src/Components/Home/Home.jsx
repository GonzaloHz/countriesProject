import { useDispatch, useSelector } from "react-redux";
import { filteredByName, getAllActivities } from "../../Redux/Actions/actions";
import Card from "../Cards/Card";
import { useEffect, useState } from "react";

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state=>state.countries)
    const activities = useSelector(state=>state.activities)
    const [qname, setQname] = useState("")
    const [qcontinent, setQcontinent] = useState("")
    const [qActivityname, setQactivityname] = useState("")
    const [qOrder, setQorder] = useState("")
    const [qNameOrPoP, setqNameOrPoP] = useState("")
    const [page, setPage] = useState(1)
    useEffect(()=>{
        dispatch(getAllActivities())
    }, [dispatch])
    useEffect(()=>{
        dispatch(filteredByName(qname, qcontinent, qActivityname, qNameOrPoP, qOrder, (page-1)*(window.screen.width>1024?8:2) , (window.screen.width>1024?8:2)))
    }, [dispatch, qname, qcontinent, qActivityname, qNameOrPoP, qOrder, page])
    
    const writeCountryName = (e) => {
        setQname(e.target.value)
    }
    const filteredByContinent = (e) => {
        setQcontinent(e.target.value)
    }
    const filteredByActivity = (e) => {
        setQactivityname(e.target.value)
    }
    const orderingCountriesByAbc = (e) => {
        setQorder(e.target.value)
    }
    const orderingCountriesByProp = (e) => {
        setqNameOrPoP(e.target.value)
    }
    const handlePrevPage = () => {
        if(page > 1) {
            setPage(page-1)
        }
    }
    const handleNextPage = () => {
        if(page < 32) {
        setPage(page+1)
        }
    }

   return(
    <div className="flex flex-col bg-bg-home h-screen bg-no-repeat  bg-cover bg-paddingRightTop">
        <div className="flex flex-col w-screen h-2/6 items-center justify-center gap-4 space-x-0 lg:h-1/4 lg:gap-5">
            <div className="flex flex-col w-screen items-center justify-center gap-4 lg:pt-2 lg:flex-row lg:gap-2">
                <div className="flex">
                    <input 
                        className="border-solid border-2 border-black bg-amber-400 py-2 px-2 w-[230px] rounded-lg"
                        type="text"
                        placeholder="Search for a country by name"
                        onChange={(e)=>writeCountryName(e)}
                        />
                </div>
                <div className="flex lg:order-first">
                    <select onChange={(e)=>filteredByContinent(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                        <option hidden>Filtered by continent</option>
                        <option value="">Show All</option> 
                        <option value="Africa">Africa</option> 
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Antarctica">Antarctic</option> 
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option> 
                        <option value="Oceania">Oceania</option>  
                    </select>
                </div>
                <div className="flex">
                    <select onChange={(e)=>filteredByActivity(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                        <option hidden>Filtered by activity</option>
                        <option value="">Show All</option>
                        {activities?.length>0 && activities?.map(a=>
                            <option key={a.name} value={a.name}>{a.name}</option>
                            )}
                    </select>
                </div>
            </div>
            <div className="flex gap-2 pb-2 lg:pb-0">
                <select onChange={(e)=>orderingCountriesByAbc(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                    <option value="ASC" >Upward</option>
                    <option value="DESC" >Falling</option> 
                </select>
                <select onChange={(e)=>orderingCountriesByProp(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                    <option value="name" >By Name</option>
                    <option value="population" >By Population</option> 
                </select>
            </div>
        </div>
        <div className="flex h-3/6 flex-wrap justify-around px-8 lg:h-5/6">
            {countries.length && Object.keys(countries) !==0 && countries?.map(c=>
                <Card 
                key={c.id}
                    id={c.id}
                    name={c.name}
                    population={c.population}
                    area={c.area}
                    capital={c.capital}
                    continent={c.continent}
                    flag={c.flag}
                    subregion={c.subregion}
                />
            )}
        </div>
        <div className="flex gap-4 justify-center items-center p-6 lg:pb-12">
            {page > 1 && <button className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black" onClick={()=>handlePrevPage()}>Previous</button>}
            <button className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">{page}</button>
            {page < 32 && <button className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black" onClick={()=>handleNextPage()}>Next</button>}
        </div>  
    </div>
   )
}

export default Home;