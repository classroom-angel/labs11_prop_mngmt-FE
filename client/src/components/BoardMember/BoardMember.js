import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {
  Button,
  Modal,
  Collection,
  CollectionItem,
  Collapsible,
  CollapsibleItem,
  Chip
} from 'react-materialize';
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
      selected: '',
      selectedId: 1
    };
    this.equipSelect = this.equipSelect.bind(this);
  }

  componentDidMount() {
    const prof = JSON.parse(localStorage.getItem('profile'));
    axios
      .get('equipment')
      .then(res => {
        const equipment = res.data.equipment.filter(
          thing => thing.organizationId === prof.orgId
        );
        this.setState({ equipment: equipment, equipmentLoaded: true });
      })
      .catch(err => console.error(err));

    axios
      .get('issues')
      .then(res => {
        const issues = res.data.issues.filter(
          issue => issue.organizationId === prof.orgId
        );
        this.setState({ issues: issues, issuesLoaded: true });
      })
      .catch(err => console.error(err));
  }

  goToIssue = id => {
    this.props.history.push(`/issue/${id}`);
  };

  equipSelect(event) {
    console.log(event.target);
    this.setState({
      selected: event.target.innerHTML,
      selectedId: event.target.value
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
          <h2
            style={{
              height: '60px',
              textAlign: 'left',
              margin: '-7px 0 0 45px'
            }}
          >
            {profile.organizationName}
          </h2>
          <div className="divider" />
          <div className="row">
            <div className="col s12" style={{ marginTop: '20px' }}>
              {this.state.issuesLoaded ? (
                <Collection className="z-depth-4">
                  <ul className="il-header">
                    <li class="collection-header">
                      <h4>Issue Log</h4>
                    </li>
                  </ul>
                  {this.state.issues.map(issue => {
                    return (
                      <CollectionItem
                        style={{ textAlign: 'left', color: 'black' }}
                        href="#!"
                        key={issue.id}
                        onClick={e => {
                          this.goToIssue(issue.id);
                        }}
                      >
                        <span style={{ margin: '2px 10px' }}>
                          {' '}
                          {issue.name}
                        </span>
                        <span style={{ margin: '2px 10px' }}>{issue.date}</span>
                        <Chip style={{ float: 'right' }}>
                          {issue.status.toUpperCase()}
                        </Chip>
                      </CollectionItem>
                    );
                  })}
                </Collection>
              ) : (
                'Loading...'
              )}
              {/* </div> */}
              {/* </div> */}
              <div
                className="col s10 offset-s1 l7 z-depth-4"
                style={{
                  borderRadius: '10px'
                }}
              >
                {/*// <div
                //   className="dev-condition"
                //   style={{
                //     display: 'flex',
                //     width: '100%',
                //     height: '500px',
                //     justifyContent: 'space-between'
                //   }}
                // >
                //   <div
                //     style={{
                //       borderLeft: '1px solid gray',
                //       textAlign: 'center',
                //       width: '15%',
                //       overflow: 'auto'
                //     }}
                //   >
                //     Equipment
                //     <div className="divider" />
                //     {this.state.equipmentLoaded
                //       ? this.state.equipment.map(item => {
                //           return (
                //             <p onClick={this.equipSelect} value={item.id}>
                //               {item.name}
                //             </p>
                //           );
                //         })
                //       : 'Loading...'}
                //   </div>
                //   <div
                //     style={{
                //       borderLeft: '1px solid gray',
                //       textAlign: 'center',
                //       width: '15%',
                //       overflow: 'auto'
                //     }}
                //   >
                //     Open Issues
                //     <div className="divider" />
                //     {this.state.equipmentLoaded
                //       ? this.state.equipment.map(function(item) {
                //           return <p>{item.damaged}</p>;
                //         })
                //       : 'Loading...'}
                //   </div>
                //   <div
                //     style={{
                //       borderLeft: '1px solid gray',
                //       textAlign: 'center',
                //       width: '15%',
                //       overflow: 'auto'
                //     }}
                //   >
                //     Working
                //     <div className="divider" />
                //     {this.state.equipmentLoaded
                //       ? this.state.equipment.map(function(item) {
                //           return <p>{item.working}</p>;
                //         })
                //       : 'Loading...'}
                //   </div>
                //   <div
                //     style={{
                //       borderLeft: '1px solid gray',
                //       textAlign: 'center',
                //       width: '15%',
                //       overflow: 'auto'
                //     }}
                //   >
                //     Total
                //     <div className="divider" />
                //     {this.state.equipmentLoaded
                //       ? this.state.equipment.map(function(item) {
                //           return <p>{item.working + item.damaged}</p>;
                //         })
                //       : 'Loading...'}
                //   </div>
                //   <div
                //     className="dev-description"
                //     style={{
                //       display: 'inline-block',
                //       borderLeft: '1px solid gray',
                //       overflow: 'auto',
                //       width: '25%'
                //     }}
                //   >
                //     Equipment Details
                //     <div className="divider" />
                //     {this.state.selected !== '' && (
                //       <>
                //         <p style={{ borderBottom: '1px solid' }}>
                //           {this.state.selected}
                //         </p>
                //         {this.state.issuesLoaded
                //           ? this.state.issues
                //               .filter(issue => {
                //                 return (
                //                   issue.equipmentId == this.state.selectedId
                //                 );
                //               })
                //               .map((issue, index) => {
                //                 return (
                //                   <div>
                //                     <p>{`Issue ${index + 1}`}</p>
                //                     <p>Descriptions: {issue.name}</p>
                //                   </div>
                //                 );
                //               })
                //           : 'Loading....'}{' '}
                //       </>
                //     )}
                //   </div>
                // </div>*/}
                <Collapsible>
                  {this.state.equipmentLoaded
                  && this.state.equipment.map(item =>
                        <CollapsibleItem header={item.name} value={item.id} onClick={this.equipSelect}>
                          <table>
                            <tr>
                              <th>Open Issues</th>
                              <th>Working</th>
                              <th>Total</th>
                            </tr>
                            <tr>
                              <td>{item.damaged}</td>
                              <td>{item.working}</td>
                              <td>{item.working + item.damaged}</td>
                            </tr>
                          </table>
                          {this.state.selected !== "" && this.state.issues
                                        .filter(issue => {
                                          return (
                                            issue.equipmentId == this.state.selectedId
                                          );
                                        })
                                        .map((issue, index) => {
                                          return (
                                            <div>
                                              <p>{`Issue ${index + 1}`}</p>
                                              <p>Descriptions: {issue.name}</p>
                                            </div>
                                          );
                                        })}
                        </CollapsibleItem>
                    )}
                  {/*<CollapsibleItem header="Better safe than sorry. That's my motto." icon="filter_drama">
                  Better safe than sorry. That's my motto.
                  </CollapsibleItem>
                  <CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon="place">
                  Yeah, you do seem to have a little 'shit creek' action going.
                  </CollapsibleItem>
                  <CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon="whatshot">
                  You know, FYI, you can buy a paddle. Did you not plan for this contingency?
                  </CollapsibleItem>*/}
                </Collapsible>
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
