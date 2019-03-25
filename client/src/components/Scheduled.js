import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'

function Scheduled(props) {
    console.log(props.solutions)
    if (props.solutionsLoaded) {
        return (
            <div className="page-container">
                <Sidebar />
                <div>
                        <h1 style={{textAlign: 'center', border: '2px solid green'}}>Scheduled Issues</h1>
                        <ul>
                            {props.solutions.map(solution => {
                                return (
                                    <div key={solution.id}>
                                      <h1>Name: {solution.name}</h1>
                                      <h2>Notes: {solution.notes}</h2>
                                      <h3>Status: {solution.status}</h3>
                                      <h4>Date: {solution.date}</h4>
                                      <h4>Time: {solution.time}</h4>
                                      <h5>Org. Id: {solution.organization_id}</h5>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                
            </div>
        )
    } else {
        return (
            <div className="page-container">
              <Sidebar />
              <div>
                  <h1>Loading...</h1>
              </div>
            </div>
        )
    }
    
    
}

export default Scheduled
