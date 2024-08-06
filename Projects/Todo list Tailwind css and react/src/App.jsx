import { useEffect, useState } from 'react'
import Navbar from './component/navbar';
import './App.css'
import { v4 as uuidv4 } from 'uuid';
 

function App() {
  const [count, setCount] = useState(0)
  //todo: is our input text
  const [todo, setTodo] = useState("")
  //todos: is the array that hold all the todos
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  function savetoLS(){
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  // Creating a useEffect that once run in begning and fetch data from localstorage
  useEffect(() =>{
    
    localStorage.getItem('todos')?setTodos(JSON.parse(localStorage.getItem('todos'))):"";
  }, [])

  const Finished_todo =()=>{
      setshowFinished(!showFinished);
  }

  const handleAdd = (e) => {
    setTodos([...todos, {id:uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    savetoLS()
  };


  const handleEdit = (e, id) => {
    let index = todos.findIndex(item=>{
        return  item.id === id;
    })
    setTodo(todos[index].todo);
    let newTodo = todos.filter(item=>{
      return  item.id!== id;
    })
    setTodos(newTodo);
    savetoLS()
  };


  const handleDelete = (e, id) => {
  let a = confirm(`Are you sure you want to delete`) 
  if(a){
    let newTodo = todos.filter(item=>{
      return  item.id!== id;
    })
    setTodos(newTodo);
  }
  savetoLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value)
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
        return  item.id === id;
    })
    let newTodo = [...todos]
    newTodo[index].iscompleted =!newTodo[index].iscompleted;
    setTodos(newTodo);
    savetoLS()
  };

  

  return (
    <>
      <Navbar />
      <div className="container h-[85vh] w-[80vw] p-5 mx-auto my-10 bg-purple-200 rounded-lg">
        <div className='heading w-[100%] text-center'><h1 className=' text-white text-[30px] font-bold'>iTASK - Manage Your Notes </h1></div>
        <div className='my-5 mx-2 text-black'>
          <h2 className='add-text font-bold text-[20px]'>Add Todo</h2>
          <div>
            <input type="text" onChange={handleChange} value={todo} className='input-box outline-none border-none w-[60%] text-[15px] p-2 rounded-xl' placeholder='Add your todo....' />
            <button onClick={handleAdd} disabled={todo.length<1} className='add px-4 py-2 bg-purple-600 text-white rounded-xl mx-6 disabled:bg-purple-300'>Add</button>
          </div>
        </div>
        <h2 className='font-bold text-[20px]'>Your Todos</h2>
        <input type="checkbox" onChange={Finished_todo} checked={showFinished} /> Show Finished
        <div className='sepration w-[100%] h-[1px] bg-slate-500 my-4' ></div>
        <div className='todos max-h-[62%]  overflow-x-hidden overflow-y-scroll'>
          {/* Display this if todos is empty */}
          {
            todos.length === 0 && <div className='text-center text-gray-600'>No todos added yet</div>
          }
          {
            todos.map(item => {
              // key is important to the react for the list to work properly and it is recommanded to give unique value
              /* (showFinished || !item.iscompleted) if this come true then show that particular todo,
                  means if I say showFinished then show all todo as allover condition become true for every todo. But if I say don't show Finished then only not completed todo would be visible because for them item.iscompleted is false and ! change to true... Hope understand
              */

              return (showFinished || !item.iscompleted) && (<div key={item.id} >
                  <div className='todo my-2 w-[100%] flex justify-between '>
                    <div className="text w-[70%]">
                      <input type="checkbox" className='mx-4' name={item.id} onClick={handlecheckbox} checked={item.iscompleted} />
                      <span className={item.iscompleted?"line-through text-[23px]":"text-[23px]"}>{item.todo}</span>
                    </div>
                    <div className="buttons flex gap-4">
                      {/* Basically a arrow function which call the function by name and pass the id 
                      e cantain the event listner datails*/}
                      <button onClick={(e) =>{handleEdit(e, item.id)}} name={item.id} className='px-2 py-0.5 bg-purple-600 text-white rounded-xl mx-3'><span className="material-symbols-rounded">edit</span></button>
                      <button onClick={(e)=>{e, handleDelete(e, item.id)}} className='px-2 py-0.5 bg-purple-600 text-white rounded-xl mx-3'><span className="material-symbols-rounded">Delete</span></button>
                    </div>
                  </div>
                  <div className='sepration hidden w-[100%] h-[1px] bg-slate-500' ></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
