import React, {Component } from 'react';
import axios from 'axios';


export default class EditExercises extends Component{
    constructor(props) {
        super(props);
        
        this.onChangeCoursename = this.onChangeCoursename.bind(this);
        this.onChangeDelivered = this.onChangeDelivered.bind(this);
        this.onChangeAttended = this.onChangeAttended.bind(this);
        this.onChangeMinPer = this.onChangeMinPer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            courseName: '',
            Attended: 0,
            Delivered: 0,
            MinPer: 0,
            courses: []
        }
    }

    componentDidMount() {
        if(!sessionStorage.token)
        {
            this.props.history.push("/users/login")
        }
        else{
            var url = window.location.href;
            var id = url.substring(url.lastIndexOf('/') + 1);
           // alert(id);
            axios.get('http://localhost:5000/exercise/'+id)
            .then(response => {
                this.setState({
                    courseName: response.data.courseName,
                    Attended: response.data.Attended,
                    Delivered: response.data.Delivered,
                    MinPer: response.data.MinPer
                })
                alert(response.data.courseName);
            })
            .catch(function(error) {
                console.log(error);
        })
    }
}

    onChangeCoursename(e) {
        this.setState({
            courseName: e.target.value
        });
    }
    onChangeAttended(e) {
        this.setState({
            Attended: e.target.value
        });
    }
    onChangeDelivered(e) {
        this.setState({
            Delivered: e.target.value
        });
    }
    onChangeMinPer(e) {
        this.setState({
            MinPer: e.target.value
        });
    }
    
    
    onSubmit(e) {
        e.preventDefault();
        if( (Number(this.state.Attended) > Number(this.state.Delivered) ) || Number(this.state.MinPer)>100)
        {
            alert('Attended should be greater or equal to Delivered and Minimum Percentage should be less than or equal to 100')
        }else{
        const exercise = {
            courseName: this.state.courseName,
            Delivered: this.state.Delivered,
            Attended: this.state.Attended,
            MinPer: this.state.MinPer
        }

        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        axios.post('http://localhost:5000/exercise/update/'+id, exercise,{
            headers : {
                'authorization' : sessionStorage.token
            }
        })
          .then(res =>{
              alert('Addded')
              this.props.history.push("/show")
          })
        }
        }

    

    render(){
        return(
        <div>
            <h3>Edit Course Here</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Course Name : </label>
                    <input type="text"
                    className="form-control"
                    required="true"
                    value={this.state.courseName}
                    onChange={this.onChangeCoursename}
                    /></div>
                 <div className="form-group">
                        <label>Lect Attended : </label>
                        <input type="number"
                        required="true"
                        className="form-control"
                        value={this.state.Attended}
                        onChange={this.onChangeAttended}
                     /></div>
                 <div className="form-group">
                            <label>Lect Delivered : </label>
                            <input type="number"
                            required="true"
                            className="form-control"
                            value={this.state.Delivered}
                            onChange={this.onChangeDelivered}
                     /></div>
                     <div className="form-group">
                            <label>Minimum Percentage : </label>
                            <input type="number"
                            required="true"
                            className="form-control"
                            value={this.state.MinPer}
                            onChange={this.onChangeMinPer}
                     /></div>
                     <div className="form-group">
                         <input type="submit" value="Edit Course" className="btn btn-primary" />
                     </div>
            </form>
            </div>
        )
    }
}