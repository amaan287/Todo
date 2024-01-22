import React,{useState} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import  {baseURL } from '../src/utils/constant';
import { IoIosCheckmarkCircle } from "react-icons/io";


interface TodoProps {
    text: string
    id: number
    setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
    setPopupContent: React.Dispatch<React.SetStateAction<{ text: string, id: number }>>
    setIsDeleting: React.Dispatch<React.SetStateAction<number | null>>
  }

const Todo = ({ text, id,setUpdateUI,setShowPopup,setPopupContent, }: TodoProps) => {



    const [completedStyle,setCompleted] = useState(true)
    const completed = {
        fontStyle: "italic",
        color: "#595959",
        opacity: 0.4,
        textDecoration: "line-through",

      };
      const completedTwo={
        color: "black",
        opacity: 1,
        textDecoration: "none",

      }

      const toggleStyle = () => {
          setCompleted(!completedStyle);
        };




    const updateTodo=()=>{
  
        setPopupContent({text,id});
        setShowPopup(true);
    }

    const deleteTodo=()=>{
        axios.delete(`${baseURL}/delete/${id}`)
            .then(res=>{
                console.log(res.data);
                setUpdateUI((prevState)=>!prevState)
           /// pass some information about the deleted todo
            })
                .catch(err=>console.log(err))}
    
    return (

        <div className="todo">
                <IoIosCheckmarkCircle className="todo__check" onClick={toggleStyle} />
            <div className="todo__text" style={completedStyle?completed:completedTwo} >
                {text}
            </div>
            <div className="todo__icons">
                <FaEdit className="todo__edit" onClick={updateTodo} />
                <MdDelete className="todo__delete" onClick={deleteTodo} />
            </div>
        </div>
      )}
    export default Todo;
            
