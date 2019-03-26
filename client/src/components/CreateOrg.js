import React from 'react'
import { Link } from 'react-router-dom'

function CreateOrg(props) {
  return (
    <div>
      <h1>Create an organization</h1>
      <p>Once you create a group, you can invite members, send announcements, and start conversations</p>
      <form onSubmit={props.onSubmit}>
        <input 
          onChange={props.onChange}
          type="text"
        />
        <input
          onChange={props.onChange}
          type="text"
        />
        <button>Create</button>
      </form>

      {/* JOIN ORGANIZATION */}
      <p>Looking for an organization? <Link>Join an organization</Link></p>
    </div>
  )
}

export default CreateOrg
