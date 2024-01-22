import React,{ useState, useEffect } from 'react';
import Todo from '../components/Todo'
import axios from 'axios'
import { baseURL } from './utils/constant';
import Popup from "../components/popup"
import './index.css';

interface TodoItem {
  id: number;
  todo: string;
  _id: string;
}

function App() {  

const [todos,setTodos]=useState<TodoItem[]>([]);
const [input,setInput]=useState("");
const [updateUI,setUpdateUI]=useState(false);
const [showPopup,setShowPopup]=useState(false);
const [popupContent,setPopupContent]=useState({});

useEffect(()=>{
  axios.get(`${baseURL}/get`).then((res)=>setTodos(res.data))
  .catch((err)=>console.log(err));
  
},[updateUI]);

const saveTodo=()=>{

  if (!input.trim()) {
    alert("Error: Todo must not be empty.")
    return
  }

  axios.
  post(`${baseURL}/save`,{todo:input})
  .then((res)=> 
  {
    console.log(res.data)
    setUpdateUI((prevState)=>!prevState)
    setInput("")
  })
  .catch((err)=>{
    console.log(err);
    alert("Error saving todo. Please try again.");
  });

};

  return (
  <main className='wrapper '>
       <div className='container'>
       <h1 className='title'>Todo App</h1>

<div className="input_holder">
  <input value={input} 
  onChange={(e)=>{setInput(e.target.value)}}
  type="text" placeholder='Add a Todo'/>
  <button onClick={saveTodo}>Add</button>
</div>

<div className="list">
       
            {todos.map(el => <Todo key={Number(el.id)} text={el.todo} id={el._id} setUpdateUI={setUpdateUI} setShowPopup={setShowPopup} setPopupContent= {setPopupContent} />
          )}
          
        </div>

      </div>
      
          {showPopup&&<Popup setShowPopup={setShowPopup} popupContent={popupContent} setUpdateUI={setUpdateUI} setPopupContent={setPopupContent}/>}
      </main>

)}

export default App
