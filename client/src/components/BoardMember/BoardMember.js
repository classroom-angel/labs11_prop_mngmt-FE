import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Modal } from 'react-materialize';
import '../../App.css';
// import './BoardMember.css'
import axios from '../../axiosInstance';

export default class BoardMemberHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: [],
      equipmentLoaded: false,
      attendance: [],
      attendanceLoaded: false,
      issuesLoaded: false,
      issues: [],
      selected: 'Knives',
      selectedId: 1
    };
    this.equipSelect = this.equipSelect.bind(this);
  }

  componentDidMount() {
    axios
      .get('equipment')
      .then(res =>
        this.setState({ equipment: res.data.equipment, equipmentLoaded: true })
      )
      .catch(err => console.error(err));

    axios
      .get('issues')
      .then(res =>
        this.setState({ issues: res.data.issues, issuesLoaded: true })
      )
      .catch(err => console.error(err));
  }

  equipSelect(event) {
    this.setState({
      selected: event.target.innerHTML,
      selectedId: event.target.attributes[0].value
    });
  }

  render() {
    if (this.props.auth.isAuth()) {
      const profile = JSON.parse(localStorage.getItem('profile'));
      return (
        <div className="page-container">
          {profile.role !== 'Board member' && (
            <Modal id="modal1" open>
              Sorry! You don't have access to this area :)
            </Modal>
          )}
          <Sidebar />
          {/*<ul id="slide-out" className="sidenav">
            <li><a href="#!">First Sidebar Link</a></li>
            <li><a href="#!">Second Sidebar Link</a></li>
          </ul>
          <a href="#!" className="sidenav-trigger show-on-large cyan darken-2 btn" data-target="slide-out" waves="light">sidenav</a>*/}
          <div className="right-side">
            <h1 style={{ textAlign: 'left' }}>{profile.organizationName}</h1>
            <div className="hud-box" style={{ display: 'flex' }}>
              <div
                className="bm-issues"
                style={{
                  display: 'inline-block',
                  margin: '20px 1%',
                  width: '35%',
                  border: '5px solid firebrick',
                  borderRadius: '10px'
                }}
              >
                <h2 style={{ textAlign: 'left' }}>Issue Log</h2>

                <div style={{ overflow: 'scroll', height: '500px' }}>
                  {this.state.issuesLoaded
                    ? this.state.issues.map(function(issue) {
                        return (
                          <p key={issue.id}>
                            <span style={{ margin: '2px 10px' }}>
                              {' '}
                              {issue.name}
                            </span>
                            <span style={{ margin: '2px 10px' }}>
                              {issue.date}
                            </span>
                            <span style={{ margin: '2px 10px' }}>
                              {issue.status.toUpperCase()}
                            </span>
                          </p>
                        );
                      })
                    : 'Loading...'}
                </div>
              </div>
              <div
                className="bm-devices"
                style={{
                  display: 'inline-block',
                  border: '5px dotted blue',
                  borderRadius: '10px',
                  height: '500px',
                  width: '60%'
                }}
              >
                <div className="dev-condiiton" style={{ display: 'flex' }}>
                  <div
                    style={{
                      border: '1px solid',
                      textAlign: 'center',
                      width: '80px',
                      overflow: 'scroll'
                    }}
                  >
                    Equipment
                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(item => {
                          return (
                            <p onClick={this.equipSelect} value={item.id}>
                              {item.name}
                            </p>
                          );
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    style={{
                      border: '1px solid',
                      textAlign: 'center',
                      width: '80px',
                      overflow: 'scroll'
                    }}
                  >
                    Open Issues
                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(function(item) {
                          return <p>{item.damaged}</p>;
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    style={{
                      border: '1px solid',
                      textAlign: 'center',
                      width: '80px',
                      overflow: 'scroll'
                    }}
                  >
                    Working
                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(function(item) {
                          return <p>{item.working}</p>;
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    style={{
                      border: '1px solid',
                      textAlign: 'center',
                      width: '80px',
                      overflow: 'scroll'
                    }}
                  >
                    Total
                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(function(item) {
                          return <p>{item.working + item.damaged}</p>;
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    className="dev-description"
                    style={{
                      display: 'inline-block',
                      border: '2px solid',
                      overflow: 'scroll'
                    }}
                  >
                    <p style={{ borderBottom: '1px solid' }}>
                      {this.state.selected}
                    </p>
                    {this.state.issuesLoaded
                      ? this.state.issues
                          .filter(issue => {
                            return issue.equipmentId == this.state.selectedId;
                          })
                          .map((issue, index) => {
                            return (
                              <div>
                                <p>{`Issue ${index + 1}`}</p>
                                <p>Descriptions: {issue.name}</p>
                              </div>
                            );
                          })
                      : 'Loading....'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <h1>Whoops, you must be logged in to view the Board Member Homepage</h1>
      );
    }
  }
}
