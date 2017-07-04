import React from 'react';
import {Input} from 'antd';

export default function (props) {
    return(
            <form className="signIn" onSubmit={props.onSubmit.bind(this)}> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <Input type="text" value={props.formData.username}
                     onChange={props.onChange.bind(null,'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <Input type="password" value={props.formData.password}
                    onChange={props.onChange.bind(null,'password')}/>
                </div>
                <div className="row actions">
                    <button type="submit" className="btn">登录</button>
                    <a href="" onClick={props.onForgotPassword.bind(this)}>忘记密码？</a>
                </div>
            </form>
        )
}