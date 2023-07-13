import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addOneActivity, getAllCountries } from "../../Redux/Actions/actions"
import swal from 'sweetalert'


const AddActivity = () => {

    const dispatch = useDispatch()
    const countries = useSelector(state=>state.countriesCopy2)

    useEffect(()=>{
        Object.keys(countries).length === 0 && dispatch(getAllCountries(0, 250))
    },[dispatch, countries])

    const [input, setInput] = useState({
        name: '',
        dificculty: '',
        duration: '',
        season: '',
        idCountry: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        dificculty: '',
        duration: '',
        season: '',
        idCountry: ''
    })

    function validate(state){
        const errors = {};
        if(!state.name){
            errors.name = "Name is required";
        }else if(!/^[a-zA-Z]{3,20}$/.test(state.name)){
            errors.name = "The name must have from 3 to 20 characters. And they can only be letters";
        }
        if(!state.dificculty){
            errors.dificculty = "Dificculty is required";
        }else if(!/^[0-9]{1,2}$/.test(state.dificculty)){
            errors.dificculty = "The dificculty can only contain values from 1 to 5. And only numbers are allowed"
        }
        if(!state.duration){
            errors.duration = "Duration is required";
        }else if(!/^[0-9]{1,2}$/.test(state.duration)){
            errors.duration = "The duration can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.season){
            errors.season = "Please add a season to this activity";
        }
        if(!state.idCountry){
            errors.idCountry = "Please add a country to this activity";
        }
        
        return errors;
    }

    const handleSetInput = (e) => {
        setInput((prevInput) => {
          const newInput = {
            ...prevInput,
            [e.target.name]: e.target.value,
          };
          const validations = validate(newInput);
          setErrors(validations);
          return newInput;
          
        });
    }
    
    const handleSubmitActivity = () => {
        Object.keys(errors).length===0 ?
        swal({
            title: "Are you sure?",
            text: "You will create a new activity in the selected country",
            icon: "info",
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
          .then((willCreate) => {
            if (willCreate) {
              dispatch(addOneActivity(input)) 
              setInput({
                name: '',
                dificculty: 1,
                duration: 0,
                season: '',
                idCountry: 0
              })
              swal("Poof! Your new activity is already added", {
                icon: "success",
              });
            } else {
              swal("You can still edit the information about the activity");
            }
          }) :
          swal("Oops! You have to complete correctly all the information about the activity", {
            icon: "warning"
          })
    }

    return(
    <div className="bg-bg-add-activity bg-paddingRightAddActivity h-screen w-screen flex justify-center items-center">
        <div className="text-center font-semibold backdrop-blur rounded-xl border-solid border-2 border-black">
            <div className="flex flex-col">
                <label>Name: </label>
                <input name='name' value={input.name} onChange={(e)=>handleSetInput(e)} className="border-solid border-2 border-black bg-amber-400 py-2 px-2 rounded-lg text-center" placeholder="Activity Name" type="text"/>
                <span className="text-red-600">{errors.name}</span>
            </div>
            <div className="flex flex-col">
                <label>Dificculty: </label>
                <input name='dificculty' value={input.dificculty} onChange={(e)=>handleSetInput(e)} className="appearance-none bg-amber-400 border-2 border-black rounded-md accent-black" type="range" min={1} max={5}/>
                <span>{input.dificculty}</span>
                <span className="text-red-600">{errors.dificculty}</span>
            </div>
            <div className="flex flex-col">
                <label>Season: </label>
                <select name='season' value={input.season} onChange={(e)=>handleSetInput(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black text-center">
                    <option hidden>Assign to a season</option>
                    <option>Summer</option>
                    <option>Autumn</option>
                    <option>Winter</option>
                    <option>Spring</option>
                </select>
                <span className="text-red-600">{errors.season}</span>
            </div>
            <div className="flex flex-col">
                <label>Duration: </label>    
                <input name='duration' value={input.duration} onChange={(e)=>handleSetInput(e)} className="border-solid border-2 border-black bg-amber-400 py-2 px-2 rounded-lg text-center" placeholder="Duration in Hours" type="text"/>
                <span className="text-red-600">{errors.duration}</span>
            </div>
            <div className="flex flex-col">
                <label>Country: </label>
                <select name='idCountry' value={input.idCountry} onChange={(e)=>handleSetInput(e)} className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black text-center">
                    <option hidden>Assign to a country</option>
                    {countries && countries.length && countries.map(c=>
                        <option key={c.name} value={c.id}>{c.name}</option>)}
                </select>
                <span className="text-red-600">{errors.country}</span>  
            </div>
            <div className="flex justify-center items-center pt-2">
                <button className="bg-amber-400 rounded-lg py-2 px-2 border-solid border-2 border-black" onClick={()=>handleSubmitActivity()}>Add this Activity</button>
            </div>
        </div>
    </div>
    )
}

export default AddActivity