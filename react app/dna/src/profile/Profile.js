import React from 'react';
import './profile.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Radar,defaults } from 'react-chartjs-2';


defaults.scale.ticks.suggestedMin = 5
class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      default_student: 14010996874,
      default_semester: 1,
      default_study_field : 17,
      radar_courses : [],
      student__avgs: [],
      student__exams: [],
      student__tps: [],
      student__tds: [],
      study_fields : [],
      algo_results : [], 
      all_performances : []       
    }
    this.handleClickSemester = this.handleClickSemester.bind(this);
  }

  getStudents = (result)=>{
    console.log(result)
     this.setState({
       all_performances : [...result]
     })
       
  }

  getSemesterCourses = (result)=>{
    var temp = []
    if (result.length > 0){
      result.map((s)=>{
        temp.push(s['cours_id'])
      })
    }
    
    this.setState({
      radar_courses : [...temp]
    }
    )
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
      study_fields: [...result]
     }
   )
  
  }

  getStudentsPerformanceSemester = (result)=>{
    var courses = this.state.radar_courses
    var avg = []
    var exam = []
    var tp = []
    var td = []
    for(var c=0;c < courses.length ; c++){
      for(var j=0; j < result.length;j++){
        if( JSON.stringify(courses[c]) == JSON.stringify(result[j].cours)) {
          avg.push(result[c].cours_avg)
          exam.push(result[c].exam)   
          tp.push(result[c].tp)   
          td.push(result[c].td)            
       }
      }
    
    }
   

    this.setState({
      'student__avgs':[...avg],
      'student__exams':[...exam],
      'student__tps':[...tp],
      'student__tds':[...td]
    })
    
  }

  getAlgoResult = (result)=>{   
    this.setState({
      algo_results: [...result ]
    })
  }

  connectToPerformance = ()=>{
    
  fetch('http://127.0.0.1:8000/performance/?student='+this.state.default_student).
    then(res => res.json()).
    then(
      result =>{
        this.getStudents(result) 
        this.getStudentsPerformanceSemester(result)
    
        }   
      
    )
  }


  connectToCourses = (s,f)=>{
    let semester = s ?  s :this.state.default_semester
    let field =  f ? f:this.state.default_study_field
    fetch('http://127.0.0.1:8000/courses/?semestre='+semester+'&study_field='+field).
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

    connectToAlgo = ()=>{
      fetch('http://127.0.0.1:8000/algore_sults/?student_id='+this.state.default_student).
      then(res => res.json()).
      then(
        result =>{
          this.getAlgoResult(result)    
        }
      )
    }

  componentDidMount() {
    this.connectToStudyFields()   
    this.connectToCourses()
    this.connectToPerformance()
    this. connectToAlgo()
   
  }

  handleClickSemester = (e)=>{
   
   let field = e.target.firstChild.value
   let semester = e.target.lastChild.innerText
    
   this.setState({
    default_semester: field,
    default_study_field : semester,
   })
 

   this.connectToCourses(semester,field)
   this.connectToPerformance()
  }

  semestersList(){     
    return this.state.study_fields.map((element)=>
    <li className="list-group-item">   
    <p>{element['name']} semsters</p>
    <ul id="semesters" className="list-group flex-row">
      {element.semesters.map((s)=>
       <li className="list-group-item" onClick={this.handleClickSemester}>
       <input  value={element['field_id']} hidden/> 
       <p>{s}</p></li>
      )}
    </ul>
  
  </li>
    )
  }

  algoResults(){
  var algo_results = this.state.algo_results
    
      return algo_results.map((element)=>
        <div className="col algo-results">
        <div  id="algo_1">
               
        <h6>Algo 01</h6> 
           <table class="table">
            <thead>            
              <tr>              
                <th scope="col">TD</th>
                <th scope="col">TP</th>
                <th scope="col">EXAM</th>
                <th scope="col">AVG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{element.algo1_td}</td>
                <td>{element.algo1_tp}</td>
                <td>{element.algo1_exam}</td>
                <td>{element.algo1_avg}</td>
              </tr>             
            </tbody>
          </table>

        </div>

        <div id="algo_2">
          <h6>Algo 02</h6>
          
          <table class="table">
            <thead>
            
              <tr>              
                <th scope="col">TD</th>
                <th scope="col">TP</th>
                <th scope="col">EXAM</th>
                <th scope="col">AVG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{element.algo1_td}</td>
                <td>{element.algo1_tp}</td>
                <td>{element.algo1_exam}</td>
                <td>{element.algo1_avg}</td>
              </tr>             
            </tbody>
          </table>
        </div>


      </div>
    
      )         
  }

  allPerformancesList (){
    var performances = this.state.all_performances
    var result = []
    for(var i=0; i < performances.length ; i++){
      var color = ""
      if( parseFloat(performances[i].cours_avg) >= 10) {color = "admis"}
      else{ color="ajourne"}
      result.push(<Card className={color}>{performances[i].cours_avg}</Card>)
    }

    return result
  }
  render(){
    defaults.scale.ticks.suggestedMax = 20
    const greenBarColor = "#18BD9B"
    const redBarColor = "#E54787"
    const whiteBarColor = "#E7E7EB"
    const orangeBarColor = "#FC7C00"
    const semestersList = this.semestersList()
    const algoResults = this.algoResults()
    const performancesList = this.allPerformancesList()
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
                  <ul id="semesters_list" className="list-group">
                  {semestersList}
                  </ul>      
                </Card.Body>
            </Card> 
          </section>
         {
           /* radar section */
         }
         <section className="flex">
         <Card id="student_performance">
            <Card.Body>
                <Radar                             
                  data={{ labels :this.state.radar_courses,  
                          datasets: [
                            { 
                              label: "TP ",
                              borderColor: greenBarColor,
                              data : this.state.student__tps,
                              fill : false
                              },
                              { 
                              label: "TD ",
                              borderColor: redBarColor,
                              data : this.state.student__tds,
                              fill : false
                              },
                              { 
                              label: "EXAM ",
                              borderColor: whiteBarColor,
                              data :this.state.student__exams,
                              fill : false
                              },
                              { 
                              label: "AVG",
                              borderColor: orangeBarColor,
                              data :this.state.student__avgs,
                              fill : false
                              }
                          ],    
                  }}                     
                  width={0}
                  height={450}
                  options={{ maintainAspectRatio: false }}
                />
           </Card.Body>
          </Card>

          <Card id="algo_performance">
            <Card.Body>
             {algoResults}
           </Card.Body>
          </Card>
              </section>

            
       
        </article>

        { 
          /* more details info */
        }
        
        <article className="semster-module">
         <section >
           
         </section>
         <section id="performances-all">
           <h1 className="text-center">All Courses Results</h1>
            {performancesList}
         </section>
        </article>
      </div>
    );
  }
 
}

export default  Profile;
