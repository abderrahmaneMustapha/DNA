import React from 'react';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HorizontalBar,defaults } from 'react-chartjs-2';
defaults.global.defaultFontColor = '#E7E7EB';
class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      best_courses : [],
      best_courses_winrate: [],
      popular_fields : [],
      popular_fields_number : [],

    }
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

  componentDidMount() {
    this.connectToBestCourses()
    this.connectToBac()
  }
  render(){
    const cardWidth = "25rem"
    const barColor = "#18BD9B"
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">

            <article className="col-md-10">

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
                      data={{ labels : this.state.best_courses.slice(0,5),  
                              datasets: [
                                { 
                                  label: "Top  bac field since 2010",
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
                  <Card id="best-gender"  style={{ width: cardWidth }}>
                    <Card.Body>
                    <HorizontalBar                              
                      data={{ labels : this.state.best_courses.slice(0,5),  
                              datasets: [
                                { 
                                  label: "Male Vs Female Admis since  2010",
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
                  </div>              
              </section>

              <section>
                <header>header2</header>
                <div id="year-analysis"></div>
              </section>  

            </article>

            <aside className="col-md-2">

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
