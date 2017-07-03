import React ,{Component} from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp'
        }
    }
    
    switch(e){
        this.setState({
            selected:e.target.getAttribute('data-statuscur')
        })
        console.log(e.target.getAttribute('data-statuscur'))
    }
    render(){
        return(
            <div className="signInOrSignUp">
                <nav>
                    <span data-statuscur="signUp" 
                        className={this.state.selected === 'signUp' ? "active" : ""}
                        onClick={this.switch.bind(this)}>
                        注册
                    </span>
                    <span data-statuscur="signIn" 
                        className={this.state.selected === 'signIn' ? "active" : ""}
                        onClick={this.switch.bind(this)}>
                        登录
                    </span>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? 
                    <SignUpForm formData={this.props.formData}
                    onSubmit={this.props.onSignUp}
                    onChange={this.props.onChange} /> 
                    : null}

                    {this.state.selected === 'signIn' ? 
                    <SignInForm formData={this.props.formData}
                    onSubmit={this.props.onSignIn}
                    onChange={this.props.onChange} 
                    onForgotPassword={this.props.onForgotPassword} />
                     : null}
                </div>
            </div>
        )
    }
}