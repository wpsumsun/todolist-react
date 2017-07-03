import React , {Component} from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './TodoInput.css'


function submit(props,e){
    if(e.key==='Enter'){
        if(e.target.value.trim()!==""){
            props.onSubmit(e)
        }
    }
}
function changeTitle(props,e){
    props.onChange(e)
}

export default function(props){
     return(
         <Input type='text' 
        placeholder="输入后回车即可创建"
        size='large'
        className="TodoInput"
        value={props.content} 
        onChange={changeTitle.bind(null,props)}
        onKeyPress={submit.bind(null,props)}
        />
     ) 
}