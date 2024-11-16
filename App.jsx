import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let edittodoIndex = todos.findIndex(pertodo=>pertodo.id === id)
    setTodo(todos[edittodoIndex].todo)

    let newTodos = todos.filter(pertodo=>{
      return pertodo.id !==id
    }); 
    setTodos(newTodos) 
  
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
   
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
 
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let checkedId = e.target.name;  
    let index = todos.findIndex(pertodo=>{
      return pertodo.id === checkedId;
    }) 

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  

  return (
    < >
 
       <div 
       className="mx-3 md:container 
       md:mx-auto my-5 rounded-xl p-5
      bg-green-50 min-h-[80vh] md:w-[35%]">

        <h1 className='font-bold text-center text-3xl'>
          Manage your todos at one place
        </h1>

        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-2xl font-bold'>Add a Todo</h2>

          <div className="flex">

          <input  
          onChange={handleChange} 
          value={todo} type="text" 
          className='w-full rounded-full px-5 py-1' />

          <button 
          onClick={handleAdd} 
          disabled={todo.length<1} 
          className='bg-green-500 mx-2 
          rounded-full hover:bg-green-800
          disabled:bg-green-200 p-4 py-2 
          text-sm font-bold text-white'>
            Save
          </button>

          </div>
        </div>
        
        <input 
        className='my-4' 
        id='show' 
        onChange={toggleFinished} 
        type="checkbox" 
        checked={showFinished} /> 

        <label 
        className='mx-2' 
        htmlFor="show">
          Show Finished
        </label> 

        <div 
        className='h-[1px] bg-black 
        opacity-15 w-[90%] mx-auto my-2'></div>


        <h2 className='text-2xl font-bold'>Your Todos</h2>

        <div className="todos">

          {todos.length ===0 && <div className='m-5'>
                                     No Todos to display
                                </div> }

          {todos.map(eachtodo=>{
 
            return (showFinished || !eachtodo.isCompleted) && 
            
            <div key={eachtodo.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'> 
                <input 
                name={eachtodo.id} 
                onChange={handleCheckbox} 
                type="checkbox" 
                checked={eachtodo.isCompleted}/>

                <div 
                className={eachtodo.isCompleted?"line-through":""}>
                  {eachtodo.todo}
                </div>

              </div>

              <div className="buttons flex h-full">

                <button 
                onClick={(e)=>handleEdit(e, eachtodo.id)} 
                className='bg-green-600 hover:bg-green-950 
                p-2 py-1 text-sm font-bold 
                text-white rounded-md mx-1'>
                  <FaEdit  />
                </button>

                <button 
                onClick={(e)=>{handleDelete(e, eachtodo.id)}} 
                className='bg-green-600 hover:bg-green-950 
                p-2 py-1 text-sm font-bold
                text-white rounded-md mx-1'>
                  <AiFillDelete />
                </button>

              </div> 

            </div>

          })}

        </div>
        
       </div>
    </>
  )
}

export default App