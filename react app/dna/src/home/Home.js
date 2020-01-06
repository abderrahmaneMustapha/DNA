import React from 'react';


import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

import './home.css';

class Home extends React.Component {
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
      
      <div className="Home">       
        <main className="Home-main ">  

          <header className="Home-header">
          <h1>
          COMPREHENSIVE STUDENTS AND COURSES STATS
         </h1>
          </header>

          <section className="Form-container pt-5">   
          <Form  inline>
            <FormControl  className="form-control" type="text" placeholder="Search..." />
          </Form>
          </section>

          <section className="Info text-center">
          <header> WHAT YOU CAN DO WITH OUR APP</header>
          <section className="Info-container">
                <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>

                  <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>

                  <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>

                  <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>

                  <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>

                  <Card className="text-center" style={{ width: '18rem' }}>                  
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>             
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>                    
                  </Card.Body>
                  </Card>
          </section>
          </section>
        </main>
      </div>
    );
  }
 
}

export default Home;
