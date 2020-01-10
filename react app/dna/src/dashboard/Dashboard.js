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
  var year = this.state.current_year
  for(var i=0; i< result.length;i++){ 
    if(year == this.state.years[result[i]['date']-1]){
      
      temp.push({
        "course" : result[i].course,
        "year" : this.state.years[result[i]['date']-1],
        "bac_path": this.findStudentPath(result[i].path),
        "winrate": ( isNaN((parseInt(result[i].admis_number) / parseInt(result[i].student_number)).toFixed(4) * 100) ) ? 0 :   (parseInt(result[i].admis_number) / parseInt(result[i].student_number)).toFixed(4) * 100,       
       })
    }
     
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

  temp.sort((a,b)=> {
    return  parseInt(a.winrate) - parseInt(b.winrate)
  })
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
  this.connectToBestCourses()
  this.connectToBac()
  this.connectToCourseProfile()
  this.connectToScholarYear()
}
handleClickYear = (e)=>{
  let year = e.target.text
  
  this.setState({
    current_year : parseInt(year),
  })

  this.connectToCourseProfile()
}



displayYears = ()=>{
  var id =  "years_list"
  const yearsList = this.state.years.map((year) =>
  <li className="nav-item active">
    <a className="nav-link text-white" href="#year-analysis"  onClick={this.handleClickYear}>
    {year}
    </a>
  </li>
);
return yearsList
}


  render(){
    const cardWidth = "22rem"
    const barColor = "#18BD9B"
    const redBarColor = "#E54787"
    let yearsList = this.displayYears()

    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">

            <article className="col-md-8">
              {
                /*generale info section start*/
              }
              <section>
                <header className="text-center">General Info</header>
                  <div id="general-info">
                  <Card id="best-courses"  style={{ width: cardWidth}}>
                    <Card.Body>
                        <HorizontalBar
                               
            
                        data={{ labels : this.state.best_courses.slice(0,5),  
                                datasets: [
                                  { 
                                    label: "Top 5 Admis Percentage since 2010 ",
                                    backgroundColor: barColor,
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
                                  backgroundColor: barColor,
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
                                  backgroundColor: barColor,
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
                                  backgroundColor: barColor,
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
                <header className="text-center">Year Analysis</header>
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
                                  backgroundColor: barColor,
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
                                  backgroundColor: barColor,
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
                                  backgroundColor: barColor,
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

              <div>

              </div>
            </aside>

          </div>    
        </div>
      </div>
      
      
    );
  }
 
}

export default  Dashboard;
