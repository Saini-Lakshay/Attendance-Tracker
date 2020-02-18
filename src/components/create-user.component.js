import React, {Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component{

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            password2: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.password === this.state.password2)
        {
        const user = {
            email: this.state.email,
            password: this.state.password
        }

       // console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res =>{
            if(res.data === 'submitted')
            {
                this.props.history.push("/users/login")
            }else{
                alert(res.data)
            }
        });
        

        this.setState({
            email: '',
            password: '',
            password2:''
        })
    }
    else{
        window.alert("Password donot match.....")
    }

    }


    render(){
        return(
        <div>
            <h3><u>Create New User Here !!!</u></h3><br />
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                        <label><b>Email : </b></label>
                        <input type="email"
                        className="form-control"
                        value={this.setState.email}
                        onChange={this.onChangeEmail}
                     /></div>
                 <div className="form-group">
                        <label><b>Password : </b></label>
                        <input type="password"
                        required
                        maxLength="18"
                        className="form-control"
                        value={this.setState.password}
                        onChange={this.onChangePassword}
                     /></div>
                     <h6><i>Max length could be 18 characters</i></h6><br />
                     <div className="form-group">
                            <label><b>Confirm Password : </b></label>
                            <input type="password"
                            required
                            maxLength="18"
                            className="form-control"
                            value={this.setState.password2}
                            onChange={this.onChangePassword2}
                         /></div>
                     <h6><i>Max length could be 18 characters</i></h6><br /><br />
                     <div className="form-group">
                         <input type="submit" value="Create User" className="btn btn-primary" />
                     </div>
            </form>
            </div>
        )
    }
}