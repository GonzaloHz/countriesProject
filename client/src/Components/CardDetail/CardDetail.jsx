import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getCountryById } from "../../Redux/Actions/actions";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker} from "react-leaflet"

const CardDetail = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(()=>{
        dispatch(getCountryById(id))
    }, [dispatch, id])
    
    const country = useSelector(state=>state.countryById)

    return(
    <div className="bg-bg-card-detail bg-cover h-screen bg-no-repeat bg-paddingRightCardDetail flex flex-col justify-around items-center px-2 lg:flex-wrap">
        <div className=" w-full h-2/6 flex flex-col justify-around backdrop-blur text-white rounded-xl border-solid border-2 border-black max-w-[500px]">
            <div className="flex flex-row justify-center gap-3">
                <img className="w-[50px] h-[50px] rounded-full border-solid border-2 border-black" src={country?.flag} alt={country?.name}/>
                <h1 className="font-bold text-3xl">{country?.name}</h1>
            </div>
            <div className="flex flex-row justify-between px-4">
                <div className="text-lg text-start">
                    <p>Capital: </p>
                    <p>Continent: </p>
                    <p>Subregion: </p>
                    <p>Area: </p>
                    <p>Population: </p>
                </div>
                <div className="text-lg text-end">
                    <p>{country?.capital}</p>
                    <p>{country?.continent}</p>
                    <p>{country?.subregion}</p>
                    <p>{country?.area} km2</p>
                    <p>{country?.population}</p>
                </div>
            </div>
            <div className="text-center font-semibold">
                {country?.id}
            </div>
        </div>
        {country && country?.lat && country?.lng && 
            <MapContainer center={[country?.lat, country?.lng]} zoom={3} scrollWheelZoom={false}
                className="w-[250px] h-[250px]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[country?.lat, country?.lng]} />
            </MapContainer>}
        {country && country?.Activities?.length !== 0 && <div className="w-full min-h-fit flex flex-col backdrop-blur text-white rounded-xl border-solid border-2 border-black px-4 py-4 gap-4 max-w-[600px]">
            <div className="text-center text-xl">
                <h1>
                    Available Activities
                </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center">
                {window.screen.width>1024 ? country?.Activities?.map(a=>
                    <div className="flex flex-col p-2 w-[250px]" key={a.id}>
                        <div className="text-center border-transparent border-2 border-b-white">{a.name}</div>
                        <div className="flex flex-row justify-between">
                            <div className="text-start">
                                <p>Dificculty: </p>
                                <p>Duration: </p>
                                <p>Season: </p>
                            </div>
                            <div className="text-end">
                                <p>{a.dificculty}</p>
                                <p>{a.duration} Hours</p>
                                <p>{a.season}</p>
                            </div>
                        </div>
                    </div>): 
                    country && country?.Activities?.length && country?.Activities[0] &&
                        <div className="flex flex-col p-2 w-[250px]" key={country?.Activities[0].id}>
                            <div className="text-center border-transparent border-2 border-b-white">{country?.Activities[0].name}</div>
                            <div className="flex flex-row justify-between">
                                <div className="text-start">
                                    <p>Dificculty: </p>
                                    <p>Duration: </p>
                                    <p>Season: </p>
                                </div>
                                <div className="text-end">
                                    <p>{country?.Activities[0]?.dificculty}</p>
                                    <p>{country?.Activities[0]?.duration} Hours</p>
                                    <p>{country?.Activities[0]?.season}</p>
                                </div>
                            </div>
                        </div>} 
            </div>
        </div>}
    </div>
    )
}

export default CardDetail