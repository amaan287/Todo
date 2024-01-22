import React, { useState } from "react"
import { RxCross1 } from "react-icons/rx"
import axios from 'axios'
import {baseURL} from '../src/utils/constant'


interface PopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    popupContent: { id: string, text: string };
    setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>;
  }


const Popup: React.FC<PopupProps> = ({setShowPopup,popupContent,setUpdateUI}) =>{
    const [input,setInput]=useState<string>(popupContent.text)

const closePopup=()=>{
    setShowPopup(false);

}
const updateTodo=()=>{
    if (!input.trim()) {
        alert("Error: Todo must not be empty.")
        return
      }
    axios.put(`${baseURL}/update/${popupContent.id}`,{todo:input}).then((res)=>{
        console.log(res.data);
        setShowPopup(false);
        setUpdateUI((prevState)=>!prevState);
    })
}

    return (
        <div className="backdrop">
       <div className="popup">
        <RxCross1 onClick={closePopup} className="cross"/>
        <h1>Update</h1>

        <div className="popup_input_holder">
            <input 
            value={input}
            onChange={(e)=>{e.preventDefault();setInput(e.target.value)}}
            type="text" placeholder="Write a text " />
            <button onClick={updateTodo}>Update</button>
        </div>
        </div>
        </div>
    )
}
export default Popup;