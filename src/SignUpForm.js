import React from 'react';
import {Input} from 'antd';

export default function (props){
        return(
            <form className="signUp" onSubmit={props.onSubmit.bind()}>
             <div className="row">
                    <label>邮箱</label>
                    <Input type="text"
                    placeholder="请输入邮箱"
                    value={props.formData.email}
                     onChange={props.onChange.bind(null,'email')}/>
                </div>
                <div className="row">
                    <label>用户名</label>
                    <Input type="text"
                    placeholder="请输入用户名"
                     value={props.formData.username}
                     onChange={props.onChange.bind(null,'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <Input type="password"
                    placeholder="请输入密码"
                    value={props.formData.password}
                    onChange={props.onChange.bind(null,'password')}/>
                </div>
                <div className="row actions">
                    <button type="submit" className="btn">注册</button>
                </div>
            </form>
        )
}