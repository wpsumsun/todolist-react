import React,{Component} from 'react';
import './TodoItem.css';
import {Checkbox,Icon} from 'antd';

export default class TodoItem extends Component{
    render(){
        return (
            <div className="TodoItem">
                <Checkbox  checked={this.props.todo.status==='completed'}
                onChange={this.toggle.bind(this)} />
                <span className="title">{this.props.todo.title}</span>
                <div>
                    <span className="time">
                    <Icon type="clock-circle-o"
                     style={{ fontSize: 12, color: '#108ee9',marginRight:3}} />
                     {this.props.curtime}
                    </span>
                    <Icon
                    className="itemDelete"
                    type="close-circle"
                    style={{ fontSize: 16, color: '#f04134',cursor:'pointer' }}
                    onClick={this.delete.bind(this)} />
                </div>
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