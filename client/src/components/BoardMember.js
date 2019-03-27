import React from 'react'
import Sidebar from './Sidebar'
import '../App.css'

function BoardMemberHub() {
    return (
        <div className="page-container">
            {/* <h1>Board member homepage</h1> */}
            {/* <div> */}
                <Sidebar/>
                <div className="right-side">
                    <h1>Board member homepage stuff</h1>
                </div>
            {/* </div> */}
        </div>
    )
}

export default BoardMemberHub
