import React from 'react'
import { Link } from 'react-router-dom'

function JoinOrg(props) {
    return (
        <div className="onboarding-component">
            <h1>What's the name of your organization?</h1>
            
            {/* SEARCH BAR */}
            <form>
                {/* Magnifying glass */}
                <input 
                    onChange={props.onChange}
                    type="text"
                    placeholder="search"
                />
                {/* Microphone */}
            </form>
            
            {/* BODY */}
            {/* Organization list */}
            {/* Vertical scroll bar */}

            {/* CREATE ORGANIZATION */}
            <p>Don't see your organization? <Link >Add yours here</Link></p>
        </div>
    )
}

export default JoinOrg
