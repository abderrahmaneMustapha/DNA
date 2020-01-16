import React from 'react';
import './profile.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Radar,defaults } from 'react-chartjs-2';
defaults.scale.ticks.suggestedMax = 20
class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      default_student: 14011599308,
      default_semester: 1,
      default_study_field : '17',
      study_fields : [] 
        
    }
  }

  getStudents = (result)=>{
     var temp = []
       
  }

  getSemesterCourses = (result)=>{

  }
  
  getUnivFields = (result) =>{
    var semesters = [1,2,3,4,5,6]
    for(var i=0;i< result.length; i++){
      if(result[i]['field_id'] == 17){
        result[i]['semesters'] = [...semesters]
      }
      else{
        result[i]['semesters'] = [...semesters.slice(0,4)]
      }
    }
   this.setState(
     {
      'study_fields': [...result]
     }
   )
   console.log(this.state.study_fields)
  }

  connectToPerformance = ()=>{
    
  fetch('http://127.0.0.1:8000/performance/?student='+this.state.default_student).
    then(res => res.json()).
    then(
      result =>{
        this.getStudents(result)    
      }
    )
  }

  connectToCourses = ()=>{
    
    fetch('http://127.0.0.1:8000/courses/?semestre='+this.state.default_semester+
                                    '&?study_field='+this.state.default_study_field).
      then(res => res.json()).
      then(
        result =>{
          this.getSemesterCourses(result)    
        }
      )
    }

    connectToStudyFields = ()=>{
      fetch('http://127.0.0.1:8000/univ_field/').
      then(res => res.json()).
      then(
        result =>{
          this.getUnivFields(result)    
        }
      )
    }

  componentDidMount() {
    this.connectToStudyFields()
    this.connectToPerformance()
    this.connectToCourses()
   
  }

  semestersList(){     
    return this.state.study_fields.map((element)=>
    <li className="list-group-item">
    <input  value={element['field_id']} hidden/>
    {element['name']}
    <ul id="semesters" className="list-group flex-row">
      {element.semesters.map((s)=>
       <li className="list-group-item">{s}</li>
      )}
    </ul>
  
  </li>
    )
  }
  render(){
    const greenBarColor = "#18BD9B"
    const redBarColor = "#E54787"
    const whiteBarColor = "#E7E7EB"
    const orangeBarColor = "#FC7C00"
    const semestersList = this.semestersList()

    const cardWidth = "22rem"
    return (
      
      <div className="Profile">
        { 
          /* the header we can choose a student */
        }

        <header className="">
        <div className="form-group search-student">
        <input  className=" input-group-text" type="button"/>
        <input className="text-dark" type="text" value={this.state.default_student} />
        
        </div>   
        </header>

        { 
          /* here you can see a radar about student performance in courses */
        }

        <article className="semster-module">
        {
           /* semesters section */
         }
          <section>
            <Card  >
                <Card.Body>
                  <ul id="bac_list" className="list-group">
                  {semestersList}
                  </ul>      
                </Card.Body>
            </Card> 
          </section>
         {
           /* radar section */
         }
         <section>
         <Card id="best-courses">
            <Card.Body>
                <Radar                             
                  data={{ labels :['A','B','C','D','L','M','Q'],  
                          datasets: [
                            { 
                              label: "TP ",
                              borderColor: greenBarColor,
                              data : [10,12,20],
                              fill : false
                              },
                              { 
                              label: "TD ",
                              borderColor: redBarColor,
                              data : [10,12,20],
                              fill : false
                              },
                              { 
                              label: "EXAM ",
                              borderColor: whiteBarColor,
                              data :[10,12,20],
                              fill : false
                              },
                              { 
                              label: "AVG",
                              borderColor: orangeBarColor,
                              data :[10,12,20],
                              fill : false
                              }
                          ],    
                  }}                     
                  width={300}
                  height={300}
                  options={{ maintainAspectRatio: false }}
                />
           </Card.Body>
          </Card>
              </section>
       
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
