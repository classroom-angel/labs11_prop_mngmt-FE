import { React,Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axiosInstance';

export default class CreateOrg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      orgCity: "",
      orgCountry: ""
    }
  }

  change = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  submit = async (e) => {
    e.preventDefault();

    const org = await axios.post('/createorg', {...this.state, expectedHours: 0});
    this.props.shareState({organizationName: this.state.orgName}, (ste) => {
      this.setState({
        orgName: "",
        orgCity: "",
        orgCountry: ""
      });
      this.props.history.push("/authload")
    })
  }

  render() {
    return (
      <div>
        <h1>Create an organization</h1>
        <p>Once you create a school, you can invite members, send notifications, and start conversations</p>
        <form onSubmit={this.submit}>
          <input required
          onChange={this.change}
          type="text" placeholder="Organization name..." name="orgName" value={this.state.orgName}
          />
          <input required
          onChange={this.change}
          type="text"  placeholder="Organization city..." name="orgCity" value={this.state.orgCity}
          />
          <input required
          onChange={this.change}
          type="text"  placeholder="Organization country" name="orgCountry" value={this.state.orgCountry}
          />
          <button type="submit">Create</button>
        </form>

        {/* JOIN ORGANIZATION */}
        <p>Looking for an organization? <Link>Join an organization</Link></p>
      </div>
    )
  }
  }
