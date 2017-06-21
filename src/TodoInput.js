import React , {Component} from 'react';
import './TodoInput.css';

export default class TodoList extends Component{
    render(){
        return <input type='text' 
        className="TodoInput"
        defaultValue={this.props.content} 
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key==='Enter'){
            this.props.onSubmit(e)
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}