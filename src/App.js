
import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from "react";
import { v4 } from 'uuid'

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  //state, props
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(()=>{
    const storagedTodolist = localStorage.getItem(TODO_APP_STORAGE_KEY)
    if (storagedTodolist)
    {
      setTodoList(JSON.parse(storagedTodolist))
    }
  },[])

  useEffect(()=> {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  },[todoList])




  const ontextInputChange = useCallback((e) =>{
    setTextInput(e.target.value); //nguoi dung nhap vo the input
  },[]);

  const onAddButtonClick = useCallback((e) => {
    //them TextInput vao danh sach TodoList
    setTodoList([...todoList, 
      {id: v4() , name: textInput, isCompleted: false},
    ]);

    setTextInput("");
  },[textInput,todoList]);


  const OnCheckBtnClick = useCallback((id)=>{
    setTodoList((prevState)=> prevState.map((todo) => todo.id === id ? {...todo, isCompleted:true}:todo))
  },[]);


  return (
    <div>
    <h3>Danh sách cần làm </h3>
    <Textfield name="add-todo" placeholder="Thêm việc cần làm... " elemAfterInput={
      <Button isDisabled={!textInput} appearance="primary" onClick={onAddButtonClick}>Thêm</Button>
    } 
    css={{padding:"2px 4px 2px"}}
    value={textInput}
    onChange={ontextInputChange}
    ></Textfield>
    <TodoList todoList={todoList} onCheckBtnClick={OnCheckBtnClick} />
    </div>  
  );
}

export default App;
