import React from 'react';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      students : []
    }
  }
  componentDidMount() {
  

  }
  render(){
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">

            <article className="col-md-10">

              <section>
                <header>header1</header>
                  <div id="general-info">
                  <Card id="best-courses"  style={{ width: '18rem' }}>
                    <Card.Body>best courses</Card.Body>
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
