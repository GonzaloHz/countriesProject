import { useDispatch, useSelector } from "react-redux";
import { filteredByName, getAllCountries } from "../../Redux/Actions/actions";
import Card from "../Cards/Card";
import { useEffect, useState } from "react";

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state=>state.countries)
    const [qname, setQname] = useState("")
    const [qcontinent, setQcontinent] = useState("")
    useEffect(()=>{
        dispatch(getAllCountries())
    }, [dispatch])
    useEffect(()=>{
        dispatch(filteredByName(qname, qcontinent))
    }, [dispatch, qname, qcontinent])

    const writeCountryName = (e) => {
        setQname(e.target.value)
    }

    const filteredByContinent = (e) => {
        setQcontinent(e.target.value)
    }

   return(
    <div className="flex flex-col bg-bg-home h-screen bg-no-repeat  bg-cover bg-paddingRightTop">
        <div className="flex flex-col w-screen h-screen items-center justify-center space-y-6 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-2">
            <div className="flex">
                <input 
                    className="border-solid border-2 border-black bg-amber-400 py-2 px-2 w-[230px] rounded-lg"
                    type="text"
                    placeholder="Search for a country by name"
                    onChange={(e)=>writeCountryName(e)}
                />
            </div>
            <div className="flex">
                <select onChange={(e)=>filteredByContinent(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                    <option disabled selected>Filtered by continent</option>
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
                <select className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black">
                    <option value="">Filtered by activity</option>
                </select>
            </div>
        </div>
        <div className="flex h-screen">
            {countries.length && Object.keys(countries) !==0 && countries?.map(c=>{
                return <Card 
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
            })}
        </div>
    </div>
   )
}

export default Home;