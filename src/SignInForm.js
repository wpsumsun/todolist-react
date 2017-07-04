import React from 'react';
import {Input,Button} from 'antd';
import 'antd/dist/antd.css';

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
                    <Button type="primary" htmlType="submit" size="large">登录</Button>
                    <span onClick={props.onForgotPassword.bind(this)}>忘记密码？</span>
                </div>
            </form>
        )
}