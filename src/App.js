import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut,TodoModel} from './leanCloud';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:getCurrentUser() || {},
      newTodo:'',
      todoList:[]
    }
    let user=getCurrentUser();
    if(user){
      TodoModel.getByUser(user,(todos)=>{
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList=todos
        this.setState(stateCopy)
      })
    }
  }
  
  render() {
    let todos=this.state.todoList
    .filter((item)=>!item.deleted)
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })
  

    return (
      <div className="App">
        <h1>{this.state.user.username||'我'}的待办
          {this.state.user.id? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
          onSubmit={this.addTodo.bind(this)}
          onChange={this.changeTitle.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
        null : 
        <UserDialog 
        onSignUp={this.onSignUpOrSignIn.bind(this)} 
        onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    );
  }

  signOut(){
    signOut()
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user={}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy=JSON.parse(JSON.stringify(user))
    stateCopy.user=user
    this.setState(stateCopy)
  }

  componentDidUpdate(){
    
  }

  addTodo(event){
    let newTodo={
      title:event.target.value,
      status:null,
      deleted:false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id=id;
      console.log(id)
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo:'',
        todoList:this.state.todoList
      })
    },(error)=>{
      console.log(error)
    })
  }

  changeTitle(event){
    this.setState({
      newTodo:event.target.value,
      todoList:this.state.todoList
    })
  }

  toggle(event,todo){
    todo.status=todo.status==='completed'?'':'completed'
    this.setState(this.state)
    console.log(todo)
  }

  delete(e,todo){
    todo.deleted=true;
    this.setState(this.state)
  }

}

export default App;

