import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      todoList:[
      ]
    }
  }
  render() {
    let todos=this.state.todoList.map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} />
        </li>
      )
    })
    console.log(todos)

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
          onSubmit={this.addTodo.bind(this)}
          onChange={this.changeTitle.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }

  addTodo(event){
    this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false
    })
    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })
    console.log(this.state.newTodo)
  }

  changeTitle(event){
    this.setState({
      newTodo:event.target.value,
      todoList:this.state.todoList
    })
  }
}

export default App;

let id=0;

function idMaker() {
  id+=1;
  return id
}
