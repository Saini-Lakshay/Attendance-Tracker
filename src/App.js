import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import EditExercise from './components/edit.component';
import Home from './components/Home';
//import Footer from './components/footer.component';


function App() {
  return ( 
    <Router>
      <Navbar />
      <div className="container my-3">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/show" exact component = {ExerciseList}/>
          <Route path="/edit/:id" exact component = {EditExercise} />
          <Route path="/create" exact component={CreateExercise} />
          <Route path="/user" exact component={CreateUser} />
          <Route path="/users/login" exact component={Login} />
          <Route render={()=>{return <h1> Page Not Found </h1>}} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
