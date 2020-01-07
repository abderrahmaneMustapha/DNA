import React from 'react';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doughnut } from 'react-chartjs-2';

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      best_courses : [],
      best_courses_winrate: []
    }
  }

 calculatebestcourses = (result)=>{   
 
  var temp = []
  for(var i=0; i< result.length;i++){
    var id = result[i]["cours_id"]
    var admis = result[i].admis_number
    var total = result[i].student_number
    temp.push({"id":id, "winrate": (admis/total).toFixed(2)})
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
  componentDidMount() {
   fetch('http://127.0.0.1:8000/best_courses/').
   then(res => res.json()).
   then(
     result =>{
       this.calculatebestcourses(result)
      
     }

   )

  }
  render(){
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">

            <article className="col-md-10">

              <section>
                <header>{this.state.best_courses.length}</header>
                  <div id="general-info">
                  <Card id="best-courses"  style={{ width: '18rem' }}>
                    <Card.Body>{this.state.best_courses[0]}</Card.Body>
                  </Card>
                  <Card id="popular-bacfield"  style={{ width: '18rem' }}>
                    <Card.Body>popular field</Card.Body>
                  </Card>
                  <Card id="best-bacfield"  style={{ width: '18rem' }}>
                    <Card.Body>best field</Card.Body>
                  </Card>
                  <Card id="best-gender"  style={{ width: '18rem' }}>
                    <Card.Body>best gender</Card.Body>
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
