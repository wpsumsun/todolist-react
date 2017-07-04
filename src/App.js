import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut,TodoModel} from './leanCloud';
import {Button,Icon} from 'antd'; 
import 'antd/dist/antd.css';
import moment from 'moment';

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
    let todosUnfinish=this.state.todoList
    .filter( (item) => (!item.deleted && item.status==="") )
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem
          todo={item}
          curtime={item.timer}
          onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })

    let todosFinished=this.state.todoList
    .filter((item)=>(!item.deleted && item.status==="completed"))
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem
          todo={item}
          curtime={item.timer}
          onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })
  

    return (
      <div className="App">
        <h1>{this.state.user.username||'我'}的待办
        {this.state.user.id?  
           <Icon type="logout"
            style={{ fontSize: 20, color: 'rgb(240, 65, 52)',cursor:"pointer",marginLeft:5}} 
            onClick={this.signOut.bind(this)} />
          : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
          onSubmit={this.addTodo.bind(this)}
          onChange={this.changeTitle.bind(this)} />
        </div>
        <ol className="todoList">
          <span className="todosUnfinish">未完成</span>
          {todosUnfinish}
        </ol>
        <ol className="todoList">
          <span className="todosFinished">已完成</span>
          {todosFinished}
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
      status:'',
      deleted:false,
      timer:moment().format('M.D.YYYY, h:mm:ss')
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
    let oldStatus=todo.status
    todo.status=todo.status==='completed' ? '' : 'completed'
    TodoModel.update(todo,()=>{
      this.setState(this.state)
    },(error)=>{
      this.status=oldStatus
      this.setState(this.state)
    })
    console.log(todo)
  }

  delete(event,todo){
    todo.deleted=true;
    this.setState(this.state)
    TodoModel.destroy(todo.id,()=>{
      todo.deleted=true
      this.setState(this.state)
    })
    console.log(todo.deleted)
  }

}

export default App;

