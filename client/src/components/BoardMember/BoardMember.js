import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Modal, Collection, CollectionItem } from 'react-materialize';
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
      selected: "",
      selectedId: 1
    };
    this.equipSelect = this.equipSelect.bind(this);
  }

  componentDidMount() {
    const prof = JSON.parse(localStorage.getItem('profile'));
    axios
      .get('equipment')
      .then(res => {
        const equipment = res.data.equipment.filter(thing => thing.organizationId === prof.orgId);
        this.setState({ equipment: equipment, equipmentLoaded: true })}
      )
      .catch(err => console.error(err));

    axios
      .get('issues')
      .then(res => {
        const issues = res.data.issues.filter(issue => issue.organizationId === prof.orgId);
        this.setState({ issues: issues, issuesLoaded: true })
      }
      )
      .catch(err => console.error(err));
  }

  goToIssue = (id) => {
    this.props.history.push(`/issue/${id}`)
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
        <div>
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
          <h2 style={{ textAlign: 'left' }}>{profile.organizationName}</h2>
          <div className="divider"></div>
          <div className="row">
            <div className="col s12" style={{ marginTop: '20px' }}>
              <div
                className="col s10 offset-s1 l4 red lighten-3"
                style={{
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              >
                <h2 style={{ textAlign: 'left' }}>Issue Log</h2>
                <div className="divider"></div>

                <div style={{ overflow: 'auto', height: '500px' }}>
                  {this.state.issuesLoaded
                    ?
                    <Collection>
                    {this.state.issues.map(issue => {
                        return (
                          <CollectionItem href='#!' key={issue.id} onClick={e => {this.goToIssue(issue.id)}} >
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
                          </CollectionItem>
                        );
                      })}
                      </Collection>
                    : 'Loading...'}
                </div>
              </div>
              <div
                className="col s10 offset-s1 l7 offset-l1 cyan darken-2 white-text"
                style={{
                  borderRadius: '10px',
                }}
              >
                <div className="dev-condiiton" style={{ display: 'flex', width: '100%', height: '500px', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      borderLeft: '1px solid gray',
                      textAlign: 'center',
                      width: '15%',
                      overflow: 'auto'
                    }}
                  >
                    Equipment
                    <div className="divider"></div>

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
                      borderLeft: '1px solid gray',
                      textAlign: 'center',
                      width: '15%',
                      overflow: 'auto'
                    }}
                  >
                    Open Issues
                    <div className="divider"></div>

                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(function(item) {
                          return <p>{item.damaged}</p>;
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    style={{
                      borderLeft: '1px solid gray',
                      textAlign: 'center',
                      width: '15%',
                      overflow: 'auto'
                    }}
                  >
                    Working
                    <div className="divider"></div>

                    {this.state.equipmentLoaded
                      ? this.state.equipment.map(function(item) {
                          return <p>{item.working}</p>;
                        })
                      : 'Loading...'}
                  </div>
                  <div
                    style={{
                      borderLeft: '1px solid gray',
                      textAlign: 'center',
                      width: '15%',
                      overflow: 'auto'
                    }}
                  >
                    Total
                    <div className="divider"></div>

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
                      borderLeft: '1px solid gray',
                      overflow: 'auto',
                      width: '25%'
                    }}
                  >Equipment Details
                  <div className="divider"></div>

                    {this.state.selected !== "" && <><p style={{ borderBottom: '1px solid' }}>
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
                      : 'Loading....'} </>}
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
