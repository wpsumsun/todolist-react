import React , {Component} from 'react';
import './UserDialog.css';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud';
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp';

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedTab:'signInOrSignUp',// 'forgotPassword'
            formData:{
                email:'',
                username:'',
                password:''
            }
        }
    }


    signUp(e){
        e.preventDefault()
        let {email,username,password}=this.state.formData
        if(email && email.indexOf('@')<0){
            alert("请输入正确格式的邮箱地址！")
            return
        }
        if(username&&username.length<=3){
            alert('用户名必须大于三个字符')
            return
        }
        if(password&&password.length<6){
            alert('密码长度至少6位')
            return
        }
        let success=(user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error=(error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                    break
                default:
                alert(error)
                break
            }
        }
        signUp(email,username,password,success,error)
    }
    signIn(e){
        e.preventDefault()
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error=(error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username,password,success,error)
    }

    changeFormData(key,e){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }

    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab==='signInOrSignUp'?
                    <SignInOrSignUp
                    formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}
                    />:
                    <ForgotPasswordForm 
                    formData={this.state.formData}
                    onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)} 
                    onSignIn={this.returnToSignIn.bind(this)} />
                    }

                </div>
            </div>
        )
    }

    showForgotPassword(){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab='forgotPassword'
        this.setState(stateCopy)
    }

     returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
   }

    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}