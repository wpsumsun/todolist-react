import React,{Component} from 'react';
import './TodoItem.css';
import {Checkbox,Icon} from 'antd';
import moment from 'moment';

export default class TodoItem extends Component{
    render(){
        return (
            <div className="TodoItem">
                <Checkbox  checked={this.props.todo.status==='completed'}
                onChange={this.toggle.bind(this)} />
                <span className="title">{this.props.todo.title}</span>
                <span className="time">{this.props.curtime}</span>
                <Icon
                className="itemDelete"
                type="close-circle"
                style={{ fontSize: 16, color: '#f04134',cursor:'pointer' }}
                onClick={this.delete.bind(this)} />
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