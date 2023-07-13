import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { deleteOneActivity, getCountryById } from "../../Redux/Actions/actions";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker} from "react-leaflet"
import swal from "sweetalert";

const CardDetail = () => {

    const dispatch = useDispatch()
    const {id} = useParams()

    const country = useSelector(state=>state.countryById)
    const [loader, setLoader] = useState(true)
    
    useEffect(()=>{
        dispatch(getCountryById(id))
        console.log(loader);
    }, [dispatch, id, loader])
    
    const handleDeleteActivity = (idActivity) => {
        swal({
            title: "Are you sure?",
            text: "You will delete this activity in this country",
            icon: "warning",
            buttons: {
                cancel: {
                  text: "Cancel",
                  value: null,
                  visible: true,
                  className: "bg-red-600 text-white",
                  closeModal: true,
                },
                confirm: {
                  text: "Confirm",
                  value: true,
                  visible: true,
                  className: "bg-green-600",
                  closeModal: true
                }
            }
          })
          .then((willDelete) => {
            if (willDelete) { 
              dispatch(deleteOneActivity(idActivity))
              dispatch(getCountryById(id))
              setLoader(!loader)
              setTimeout(() => {
                  swal("Poof! The selected activity was deleted successfully", {
                  icon: "success",
                })}, 500)
            } else {
              swal("Alright! I'm going to pretend that never happened");
            }
          })
    }

    return(
    <div className="bg-bg-card-detail bg-cover h-screen bg-no-repeat bg-paddingRightCardDetail flex flex-col lg:flex-row justify-evenly items-center px-2 lg:flex-wrap">
        <div className={`flex flex-col w-full justify-around items-center max-w-[500px] ${country?.Activities?.length !== 0 ? "gap-2" : "gap-8"} lg:gap-20`}>
            <div className="flex flex-col w-full backdrop-blur text-white rounded-xl border-solid border-2 border-black p-4">
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
        </div>
        {country && country?.Activities?.length !== 0 && <div className="w-full min-h-fit flex flex-col backdrop-blur text-white rounded-xl border-solid border-2 border-black px-4 py-4 gap-4 max-w-[600px]">
            <div className="text-center text-xl">
                <h1>
                    Available Activities
                </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center">
                {window.screen.width>1024 ? country?.Activities?.map(a=>
                    <div className="flex flex-col p-2 w-[250px]" key={a.id}>
                        <div className="flex flex-row text-center border-transparent border-2 border-b-white justify-between">
                            <div>{a.name}</div>
                            <button onClick={()=>handleDeleteActivity(a.id)} className="bg-white text-black px-2 font-semibold border-solid border-2 border-white">Delete</button>
                        </div>
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
                    country && country?.Activities?.length && country?.Activities[country.Activities.length-1] &&
                        <div className="flex flex-col p-2 w-[250px]" key={country?.Activities[country.Activities.length-1].id}>
                            <div className="flex flex-row text-center border-transparent border-2 border-b-white justify-between">
                                <div className="text-center border-transparent border-2 border-b-white">{country?.Activities[country.Activities.length-1].name}</div>
                                <button onClick={()=>handleDeleteActivity(country?.Activities[country.Activities.length-1].id)} className="bg-white text-black px-2 font-semibold border-solid border-2 border-white">Delete</button>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="text-start">
                                    <p>Dificculty: </p>
                                    <p>Duration: </p>
                                    <p>Season: </p>
                                </div>
                                <div className="text-end">
                                    <p>{country?.Activities[country.Activities.length-1]?.dificculty}</p>
                                    <p>{country?.Activities[country.Activities.length-1]?.duration} Hours</p>
                                    <p>{country?.Activities[country.Activities.length-1]?.season}</p>
                                </div>
                            </div>
                        </div>} 
            </div>
        </div>}
    </div>
    )
}

export default CardDetail