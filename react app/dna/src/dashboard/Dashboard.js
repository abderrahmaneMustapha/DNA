import React from 'react';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HorizontalBar,defaults,Bar,Pie } from 'react-chartjs-2';

defaults.global.defaultFontColor = '#E7E7EB';
defaults.scale.ticks.beginAtZero = true; 
defaults.scale.ticks.suggestedMax = 100

var bac_fields = [
  {
    "path_id": 1,
    "path_name": "S"
},
{
    "path_id": 2,
    "path_name": "M"
},
{
    "path_id": 4,
    "path_name": "TM"
},
{
    "path_id": 5,
    "path_name": "other"
}
]

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      best_courses : [],
      best_courses_winrate: [],

      popular_fields : [],
      popular_fields_number : [],

      best_bacfield: [],
      best_bacfield_winrate: [],

      best_gender: [],
      best_gender_winrate: [],
      
      years : [],

      current_year : 2010,
      crrent_level: 1,
      current_field:"MIAS",

      year_cours: [],
      year_years: [],
      year_path: [],
      year_winrate: [],

      year_cours_worst: [],
      year_years_worst: [],
      year_path_worst: [],
      year_winrate_worst: [],

      bac_avgs: [],
      bac_paths: [],
      bac_student: [],
      bac_years: [],
      bac_feedbacks: [],
      bac_id: [],


    }
    this.handleClickYear = this.handleClickYear.bind(this);
  
  }


 calculatebestcourses = (result)=>{   
  
    var temp = []
    for(var i=0; i< result.length;i++){
      var id = result[i]["cours_id"]
      var admis = result[i].admis_number
      var total = result[i].student_number
      temp.push({"id":id, "winrate": (admis/total).toFixed(4) * 100})
    }
    temp.sort((a,b)=> {
      return b.winrate - a.winrate
    })
    var best_temp = []
    var winrate_temp = []
    for(var i=0; i< temp.length;i++){
      best_temp.push(temp[i]['id'])
      winrate_temp.push(temp[i]['winrate'])
    }
    this.setState({
      best_courses:[...best_temp] ,
      best_courses_winrate: [...winrate_temp],
    })    

}

calculatepopularfield = (result)=>{
  var temp = []
 
    
    for(var i=0; i< bac_fields.length;i++){
      var count = 0
      for(var j=0; j<result.length;j++){
        if(bac_fields[i]['path_id'] == result[j]['highshcool_path']){
          count++
        }
      }
      temp.push({
        'bac_path': bac_fields[i]['path_name'],
        'percentage': (count/result.length).toFixed(4) * 100
      })
      
    }
    temp.sort((a,b)=> {
      return b.percentage - a.percentage
    })
    let field_temp = []
    let percentage_temp = []
    for(var i=0; i< temp.length;i++){
      field_temp.push(temp[i]['bac_path'])
      percentage_temp.push(temp[i]['percentage'])
    }

    this.setState({
      popular_fields : [...field_temp],
      popular_fields_number : [...percentage_temp]
    }) 
   
}


calculatebestbacfield = (result)=>{
  var temp = []   
  for(var i=0; i< bac_fields.length;i++){
    var count_student = 0
    var count_admis = 0
    for(var j=0; j<result.length;j++){
      if(bac_fields[i]['path_id'] == result[j]['path']){
        count_student += result[j]['student_number']
        count_admis += result[j]['admis_number']
      }
    }
    temp.push({
      'bac_path': bac_fields[i]['path_name'],
      'winrate': (count_admis/ count_student).toFixed(4) * 100
    })
    
  }

  temp.sort((a,b)=> {
    return b.winrate - a.winrate
  })
  let field_temp = []
  let winrate_temp = []
  for(var i=0; i< temp.length;i++){
    field_temp.push(temp[i]['bac_path'])
    winrate_temp .push(temp[i]['winrate'])
  }

  this.setState({
    best_bacfield: [...field_temp],
    best_bacfield_winrate: [...winrate_temp],
  })
}

calculatebestgender = (result)=>{
  let temp = []
  var total_admis_student = 0
  var total_male = 0
  var total_female = 0
  
  for(var i=0; i< result.length;i++){
    total_admis_student += result[i]['admis_number']
    total_male += result[i]['m_admis_number']
    total_female +=  (result[i].admis_number - result[i].m_admis_number)
  } 

  temp.push({'gender': 'Male', 'winrate': (total_male / total_admis_student).toFixed(4) * 100})
  temp.push({'gender': 'Female', 'winrate': (total_female/ total_admis_student).toFixed(4) * 100 })

  temp.sort((a,b)=> {
    return b.winrate - a.winrate
  })
  
  let gender_temp = []
  let winrate_temp = []
  for(var i=0; i< temp.length;i++){
    gender_temp.push(temp[i]['gender'])
    winrate_temp.push(temp[i]['winrate'])
  }  

  this.setState({
    best_gender: [...gender_temp],
    best_gender_winrate: [... winrate_temp],
  })
  
}

getscholaryears = (result)=>{
  let temp = []
  for(var i=0; i< result.length;i++){
     temp.push(result[i]['scholar_year'])
  } 

  this.setState({
    years : [...temp]
  })
}
findStudentPath = (id)=>{
  for(var i=0; i<  bac_fields.length;i++){    
    if(bac_fields[i]['path_id'] == id){
      return bac_fields[i]['path_name']
    }
 }
}
calculatebestcourseyear = (result)=>{
 
  let temp = []

  for(var i=0; i< result.length;i++){       
      temp.push({
        "course" : result[i].course,
        "year" : this.state.years[result[i]['date']-1],
        "bac_path": this.findStudentPath(result[i].path),
        "winrate": ( isNaN((parseInt(result[i].admis_number) / parseInt(result[i].student_number)).toFixed(4) * 100) ) ? 0 :   (parseInt(result[i].admis_number) / parseInt(result[i].student_number)).toFixed(4) * 100,       
       })  
     
  }
  temp.sort((a,b)=> {
    return  parseInt(b.winrate) - parseInt(a.winrate)
  })
  var temp_courses = []
  var temp_years = []
  var temp_bac_paths = []
  var temp_winrates= []

  for(var i=0; i< temp.length;i++){  
    temp_courses.push(temp[i].course)
    temp_years.push(temp[i].year)
    temp_bac_paths.push(temp[i].bac_path)
    temp_winrates.push(temp[i].winrate)
  }



  this.setState({
    year_cours: [...temp_courses],
    year_years: [...temp_years],
    year_path: [...temp_bac_paths],
    year_winrate: [...temp_winrates],
     
  })

  temp.sort((a,b)=>
   parseInt(a.winrate) - parseInt(b.winrate)
  )
   temp_courses = []
   temp_years = []
   temp_bac_paths = []
   temp_winrates= []
  for(var i=0; i< temp.length;i++){  
    temp_courses.push(temp[i].course)
    temp_years.push(temp[i].year)
    temp_bac_paths.push(temp[i].bac_path)
    temp_winrates.push(temp[i].winrate)
  }

  
  this.setState({
    year_cours_worst: [...temp_courses],
    year_years_worst: [...temp_years],
    year_path_worst: [...temp_bac_paths],
    year_winrate_worst: [...temp_winrates],
     
  })

}

getbestbacavg = (result)=>{
  var bac_avgs = []
  var bac_paths = []
  var bac_student = []
  var bac_years = []
  var bac_feedbacks = []
  var bac_id = []

  result.sort((a,b)=> {
    return  parseInt(b.bac_avg) - parseInt(a.bac_avg)
  })

  for(var i=0; i < result.length;i++){
    
    bac_avgs.push(result[i]['bac_avg'])      
    bac_paths.push(this.findStudentPath(result[i]['highshcool_path']))
    bac_student.push(result[i]['student_id'])
    bac_years.push(result[i]['bac_year'])
    bac_feedbacks.push(result[i]['bac_feedback'])
    bac_id.push(result[i]['bac_id'])
  
  }

  this.setState(
    {
      bac_avgs: [...bac_avgs],
      bac_paths: [...bac_paths],
      bac_student: [...bac_student],
      bac_years: [...bac_years],
      bac_feedbacks: [...bac_feedbacks],
      bac_id: [...bac_id] 

    }
  )
 
}


connectToBestCourses = ()=>{
  fetch('http://127.0.0.1:8000/best_courses/').
then(res => res.json()).
then(
  result =>{
    this.calculatebestcourses(result)
   
  }

  
)
}

connectToBac = ()=>{
  fetch('http://127.0.0.1:8000/bac/').
  then(res => res.json()).
  then(
    result =>{
      this.getbestbacavg(result)  
      this.calculatepopularfield(result)
     
    }
  )
}

connectToCourseProfile = () =>{
  fetch('http://127.0.0.1:8000/course_profile/').
  then(res => res.json()).
  then(
    result =>{
  
      this.calculatebestbacfield(result)
      this.calculatebestgender(result) 
    
    }
  )
}

connectToCourseProfileBydate = () =>{
  var date = (this.state.years.indexOf(this.state.current_year)+1)==0 ? 1: (this.state.years.indexOf(this.state.current_year)+1)

  fetch('http://127.0.0.1:8000/course_profile/?date='+date).
  then(res => res.json()).
  then(
    result =>{
  
      this.calculatebestcourseyear(result)    
    }
  )
}

connectToScholarYear = ()=>{
  fetch('http://127.0.0.1:8000/scholar_years/').
  then(res => res.json()).
  then(
    result =>{
      this.getscholaryears(result)    
    }
  )
}




componentDidMount() {
  this.connectToScholarYear()
  this.connectToBestCourses()
  this.connectToBac()
  this.connectToCourseProfile()  
  this.connectToCourseProfileBydate()
 
}
handleClickYear = (e)=>{
  let year = e.target.text
  
  this.setState({
    current_year : parseInt(year),
  })

  this.connectToCourseProfileBydate()
}



displayYears = ()=>{
  var id =  "years_list"
  const yearsList = this.state.years.map((year) =>
  <li className="list-group-item">
    <a className="nav-link text-white" href="#year-analysis"  onClick={this.handleClickYear}>
    {year}
    </a>
  </li>
);
return yearsList
}

diplayBestBacresults = ()=>{
  var bac_list  = []
  let bac_avgs = [...this.state.bac_avgs]
  var bac_paths = [...this.state.bac_paths]
  var bac_student = [...this.state.bac_student]
  var bac_years = [...this.state.bac_years]
  var bac_feedbacks = [...this.state.bac_feedbacks]
  var bac_id = [...this.state.bac_id]
  
  for(var i=0;i<10;i++){
    bac_list.push(
    <li id="bac_list_group_item" className="list-group-item">
    <div id="#bac_ids">
     <p> student : {bac_student[i]}</p>
      <p> id: {bac_id[i]}</p>
    </div>

    <div id="#bac_infos">
      <p>Avg: {bac_avgs[i]}</p>
      <p>{bac_feedbacks[i]}</p>
    </div>

    <div id="bac_year">      
      <p>Year: {bac_years[i]}</p> 
      <p>Path: {bac_paths[i]}</p>
    </div> 
    </li>
    )
  }

  return bac_list
 
}


  render(){
    const cardWidth = "22rem"
    const greenBarColor = "#18BD9B"
    const redBarColor = "#E54787"
    let yearsList = this.displayYears()
    let bacList = this.diplayBestBacresults()

    return (
      <div className="Dashboard">
        <h1 className="text-center">Dashboard</h1>
        <div className="container">
          <div className="row">

            <article className="col-md-8">
              {
                /*generale info section start*/
              }
              <section>
                <header className="text-center"><h3>General Info</h3></header>
                  <div id="general-info">
                  <Card id="best-courses"  style={{ width: cardWidth}}>
                    <Card.Body>
                        <HorizontalBar
                               
            
                        data={{ labels : this.state.best_courses.slice(0,5),  
                                datasets: [
                                  { 
                                    label: "Top 5 Admis Percentage since 2010 ",
                                    backgroundColor: greenBarColor,
                                    data : this.state.best_courses_winrate.slice(0,5)
                                     }
                                ]
                        }}                      

                        width={100}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                        />
                    </Card.Body>
                  </Card>


                  <Card id="popular-bacfield"  style={{ width: cardWidth }}>
                    <Card.Body>
                    <HorizontalBar                              
                      data={{ labels : this.state.popular_fields,  
                              datasets: [
                                { 
                                  label: "Most popular bac field since 2010",
                                  backgroundColor: greenBarColor,
                                  data : this.state.popular_fields_number
                                  }
                              ]
                      }}                      

                      width={100}
                      height={200}
                      options={{ maintainAspectRatio: false }}
                      />
                    </Card.Body>
                  </Card>
                  <Card id="best-bacfield"  style={{ width: cardWidth }}>
                    <Card.Body>
                    <HorizontalBar                              
                      data={{ labels : this.state.best_bacfield,  
                              datasets: [
                                { 
                                  label: "Top  bac field since 2010",
                                  backgroundColor: greenBarColor,
                                  data : this.state.best_bacfield_winrate
                                  }
                              ]
                      }}                      

                      width={100}
                      height={200}
                      options={{ maintainAspectRatio: false }}
                      />
                    </Card.Body>
                  </Card>
                  <Card id="best-gender"  style={{ width: cardWidth }}>
                    <Card.Body>
                    <HorizontalBar                              
                      data={{ labels : this.state.best_gender,  
                              datasets: [
                                { 
                                  label: "Male Vs Female Admis since  2010",
                                  backgroundColor: greenBarColor,
                                  data : this.state.best_gender_winrate
                                  }
                              ]
                      }}                      

                      width={100}
                      height={200}
                      options={{ maintainAspectRatio: false }}
                      />
                    </Card.Body>
                  </Card>
                  </div>              
              </section>
              {
                /* generale info section end */
              }

              {
                /* year analysis section start */
              }
              <section>
                <header className="text-center"><h3>Years Analysis</h3></header>
                <div id="year-analysis">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="collapse navbar-collapse">                   
                    <ul id="years_list" className="navbar-nav">
                     {yearsList}
                    </ul>
                  </div>
                </nav>
                <div>
                <Card id="years_analysis_card">
                    <Card.Body>
                    <Card>
                    <Card.Body>
                      <Bar
                        data={{ labels : this.state.year_cours.slice(0,5),  
                              datasets: [
                                { 
                                  label: "best modules for "+this.state.current_year,
                                  backgroundColor: greenBarColor,
                                  data : this.state.year_winrate.slice(0,5)
                                  }
                              ]
                        }}
                        width={100}
                        height={80}
                       />       
                    </Card.Body>
                  </Card>  

                   <Card>
                    <Card.Body>
                    <Bar
                        data={{ labels : this.state.year_cours_worst.slice(0,5),  
                              datasets: [
                                { 
                                  label: "best field for "+this.state.current_year,
                                  backgroundColor: redBarColor,
                                  data : this.state.year_winrate_worst.slice(0,5)
                                  }
                              ]
                        }}
                        width={100}
                        height={80}
                       />         
                    </Card.Body>
                  </Card> 

                   <Card>
                    <Card.Body>
                    <Bar
                        data={{ labels : this.state.best_gender,  
                              datasets: [
                                { 
                                  label: "Male Vs Female Admis since  2010",
                                  backgroundColor: greenBarColor,
                                  data : this.state.best_gender_winrate
                                  }
                              ]
                        }}
                        width={100}
                        height={80}
                       />          
                    </Card.Body>
                  </Card>         


                  <Card>
                    <Card.Body>
                    <Bar
                        data={{ labels : this.state.best_gender,  
                              datasets: [
                                { 
                                  label: "Male Vs Female Admis since  2010",
                                  backgroundColor: greenBarColor,
                                  data : this.state.best_gender_winrate
                                  }
                              ]
                        }}
                        width={100}
                        height={80}
                       />         
                    </Card.Body>
                  </Card> 
                    </Card.Body>
                  </Card>
                </div>                
                </div>
              </section>                
              {
                /* year analysis section end */
              }

            </article>

            <aside className="col-md-4">
            <header className="text-center"><h3>Best  10 Bac Avg since 2010</h3></header>

              <div>
              <Card  style={{ width: "25rem" }}>
                    <Card.Body>
                      <ul id="bac_list" className="list-group">
                      {bacList}
                      </ul>      
                    </Card.Body>
                  </Card> 
              </div>
            </aside>

          </div>    
        </div>
      </div>
      
      
    );
  }
 
}

export default  Dashboard;
