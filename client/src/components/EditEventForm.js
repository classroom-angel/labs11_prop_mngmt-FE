import React, { Component } from 'react';
import axios from '../axiosInstance';

class EditEventForm extends Component {
constructor(props){
super(props);
this.state = {
    name: "",
    date: "",
    time: ""
   

 };
}





    componentDidMount() {
     axios
    .get(`solutions/${this.props.solutionEditId}`)
    .then(response => {
        console.log(response.data)
        this.setState({
        name: response.data.solution.name,
        date: response.data.solution.date,
        time: response.data.solution.time
    })
    })
    .catch(error => {
        console.error("Can't get solution",error)
    })
    
        
    }


    updateEvent = () => {
    axios
    .put(`solutions/${this.props.solutionEditId}`,this.state)
    .then()
    .catch(error => {
        console.error("Can't edit solution",error)
    })

    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
       }


    render () {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.updateEvent}>
                    <input
                     onChange={this.handleChange}
                     placeholder="name"
                     value={this.state.name}
                     name="name"
                    />
                    <input
                     onChange={this.handleChange}
                     placeholder="date"
                     value={this.state.date}
                     name="date"
                    />
                     <input
                      onChange={this.handleChange}
                      placeholder="time"
                      value={this.state.time}
                      name="time"
                    />
                    <button>Submit</button>

                </form>
            </div>
        )

    }
}



export default EditEventForm;