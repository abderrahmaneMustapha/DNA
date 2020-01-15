import React from 'react';
import './profile.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor(){
    super();
    this.state = {

      default_student: 14011599308
    }
  }
  getStudents = (result)=>{
     var temp = []
     for(var i=0;i< result.length; i++){
       temp.push(result[i]['student'])
       
     }
     console.log(temp[0])

     this.setState({
      students : [...temp],
     })
  }

  connectToPerformance = ()=>{
    
  fetch('http://127.0.0.1:8000/performance/').
    then(res => res.json()).
    then(
      result =>{
        this.getStudents(result)    
      }
    )
  }

  connectToCourses = ()=>{
    
    fetch('http://127.0.0.1:8000/courses/').
      then(res => res.json()).
      then(
        result =>{
          this.getSemesterCourses(result)    
        }
      )
    }

  componentDidMount() {
    this.connectToPerformance()
  }
  render(){
    return (
      
      <div className="Profile">
        { 
          /* the header we can choose a student */
        }

        <header className="input-group">
        <div className="col-md-6">
        <input className="form-control" type="text" value={this.state.default_student}/>
          <input  className=" btn-orange" type="button"/>
        </div>
      
          
      
        </header>

        { 
          /* here you can see a radar about student performance in courses */
        }

        <article>
         <section></section>
         <section></section>
        </article>

        { 
          /* more details info */
        }
        
        <article>
         <section></section>
         <section></section>
        </article>
      </div>
    );
  }
 
}

export default  Profile;
