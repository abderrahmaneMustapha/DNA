import React from 'react';
import './courses.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';

class Courses extends React.Component {
  constructor(){
    super();
    this.state = {
      courses : []
    }
  }
  getcourses = (result)=>{
     this.setState({
       courses : [...result]
     })
  }
  connectToCourses = ()=>{
    fetch('http://127.0.0.1:8000/courses/').
    then(res => res.json()).
    then(
      result =>{
        this.getcourses(result)     
      }
    )
  }
  componentDidMount() {
    this.connectToCourses()
  }

  courseList = ()=>{
  let courses = this.state.courses
   return courses.map((course)=>
   <Card  >
   <Card.Body>
     {course.cours_id}
        
   </Card.Body>
</Card>
   )
  }
  render(){

    let courseList  = this.courseList()
    return (
      
      <div className="Courses">
      
        <header className="courses-header">
          <h1>ALL IBN KHALDOUN UNIVERSITY COURSES,
   STATS AT YOUR FINGERTIPS</h1>
        </header>

        <section>
          <div className="all-courses-list">
            {courseList}
          </div>
        </section>
      
      </div>
    );
  }
 
}

export default Courses;
