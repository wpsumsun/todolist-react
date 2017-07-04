import React,{Component} from 'react';
import {Input,Button} from 'antd';
import 'antd/dist/antd.css';

export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
                <h3>重置密码</h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label>邮箱</label>
                        <Input type="text" value={this.props.formData.email}
                        onChange={this.props.onChange.bind(null, 'email')}/>
                    </div>
                    <div className="row actions">
                        <Button htmlType="submit" type="primary" size="large">发送重置邮件</Button>
                        <span onClick={this.props.onSignIn}>返回登录</span>
                    </div>
                </form>
            </div> 
        )
    }
} 