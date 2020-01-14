import React from 'react';
import './profile.css';

import 'bootstrap/dist/css/bootstrap.min.css';


class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      students : [],
      default_student: ''
    }
  }
  componentDidMount() {
  

  }
  render(){
    return (
      
      <div className="Profile">
        { 
          /* the header we can choose a student */
        }

        <header>a</header>

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
