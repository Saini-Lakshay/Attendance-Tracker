import React, {Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import {Link } from 'react-router-dom';


export default class ExerciseList extends Component{
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.classAttended = this.classAttended.bind(this);
        this.classNotAttended = this.classNotAttended.bind(this);
        

        this.state = {
            courseName: '',
            Attended:0,
            Delivered:0,
            exercises: [],
            loading: true
        }
    }
    fetchData = ()=>{
        axios.get('http://localhost:5000/exercise/',{
            headers : {
                'authorization' : sessionStorage.token
            }
        })
        .then(response => {
            console.log(response)
            this.setState({ exercises: response.data,loading:false })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.fetchData();
    }

    deleteExercise(id) {
        const ans = window.confirm('Are You Sure ..?');
        if(ans){
        axios.post('http://localhost:5000/exercise/delete',{
            id : id,
            //email : sessionStorage.email
        },{
            headers : {
                'authorization' : sessionStorage.token
            }
        })
          .then(res =>
            { 
                console.log(res.data)
                this.fetchData()
            })
        }
    }

    classAttended(id) {
            axios.post('http://localhost:5000/incAttendence',{
                id : id
            },{
                headers : {
                    'authorization' : sessionStorage.token
                }
            })
            .then(response => {
                this.fetchData() 
            })
    }
    classNotAttended(id) {
        axios.post('http://localhost:5000/decAttendence',{
                id : id
            },{
                headers : {
                    'authorization' : sessionStorage.token
                }
            })
            .then(response => {
                this.fetchData() 
            })
    }


    exerciseList() {
       
        return this.state.exercises.map(currentexercise => {
            
            //return <Exerxise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
            if((currentexercise.Attended/currentexercise.Delivered)*100 < currentexercise.MinPer)
            {return <tr>
            <td>{currentexercise.courseName}</td>
            <td>{currentexercise.Delivered}</td>
            <td>{currentexercise.Attended}</td>
            <td>{((currentexercise.Attended/currentexercise.Delivered)*100).toFixed(2)}%</td>
            <td>{currentexercise.MinPer}%</td>
            <td>{((((currentexercise.MinPer*currentexercise.Delivered)-(100*currentexercise.Attended))/(100-currentexercise.MinPer)+1).toFixed(0))} must be attended
            </td>
            <td>
                <button className="btn btn-block btn-success" onClick={() => {this.classAttended(currentexercise._id) }}>Attended</button>
                <button className="btn btn-block btn-primary" onClick={() => {this.classNotAttended(currentexercise._id) }}>Not Attended</button>
                </td>
            <td>
                <button  className="btn btn-danger btn-block" onClick={() => {this.deleteExercise(currentexercise._id) }}>Delete</button>
                <Link to={"/edit/"+currentexercise._id}>Edit</Link>
            </td>
        </tr>}
        else{
            return<tr>
            <td>{currentexercise.courseName}</td>
            <td>{currentexercise.Delivered}</td>
            <td>{currentexercise.Attended}</td>
            <td>{((currentexercise.Attended/currentexercise.Delivered)*100).toFixed(2)}%</td>
            <td>{currentexercise.MinPer}%</td>
            <td>{(((100*currentexercise.Attended)-(currentexercise.MinPer*currentexercise.Delivered))/currentexercise.MinPer).toFixed(0)-1} can be missed
            </td>
            <td>
                <button className="btn btn-success btn-block" onClick={() => {this.classAttended(currentexercise._id) }}>Attended</button>
                <button className="btn btn-primary btn-block" onClick={() => {this.classNotAttended(currentexercise._id) }}>Not Attended</button>
                </td>
            <td>
                <button className="btn btn-danger btn-block" onClick={() => {this.deleteExercise(currentexercise._id) }}>Delete</button>
                <Link to={"/edit/"+currentexercise._id}>Edit</Link>
            </td>
        </tr>
        }
        })
    }

    render(){
        if(this.state.loading)
        {
            return <h2>loading..</h2>
        }
       else if(sessionStorage.token)
        return(
            
            <div>
                <h3>Courses.....</h3>    
                <Table variant="light" bordered hover responsive>
                    <thead className="thead-dark">
                        <tr>
                            <th>Course Name</th>
                            <th>Lectures Delivered</th>
                            <th>Lectures Attended</th>
                            <th>Current Percentage (%)</th>
                            <th>Minimum Percentage</th>
                            <th>Lectures can be missed or to be attended</th>
                            <th>Today's Attendance</th>
                            <th>Other Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </Table>
            </div>
        )
        else 
        return <Redirect to='/users/login'/>
    }
}