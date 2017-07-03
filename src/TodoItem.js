import React,{Component} from 'react';
import './TodoItem.css';
import {Checkbox} from 'antd';
import moment from 'moment';

export default class TodoItem extends Component{
    render(){
        return (
            <div className="TodoItem">
                <Checkbox  checked={this.props.todo.status==='completed'}
                onChange={this.toggle.bind(this)} />
                <span className="title">{this.props.todo.title}</span>
                <span>{this.props.curtime}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }

    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }

    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
}