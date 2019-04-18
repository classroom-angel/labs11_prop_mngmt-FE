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
import './BoardMember.css';
import axios from '../../axiosInstance';

const chipStyles = {
  IGNORED: 'amber lighten-3',
  'NEEDS ATTENTION': 'amber darken-4 white-text',
  SCHEDULED: 'amber white-text',
  RESOLVED: 'cyan white-text'
};

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
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      axios
        .get(`organizations/${profile.orgId}/equipment`)
        .then(({ data: { equipment } }) => {
          this.setState({ equipment, equipmentLoaded: true });
        })
        .catch(console.error);

      axios
        .get(`organizations/${profile.orgId}/issues`)
        .then(({ data: { issues } }) => {
          this.setState({ issues, issuesLoaded: true });
        })
        .catch(console.error);
    }
  }

  goToIssue = id => {
    this.props.history.push(`/issue-log`);
  };

  equipSelect(event, id) {
    console.log(event.target);
    this.setState({
      selected: event.target.innerHTML,
      selectedId: id
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
              padding: '20px',
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
                <div
                  className="col s10 offset-s1 l5 collection-div"
                  style={{
                    marginTop: '-10px'
                  }}
                >
                  <Collection className="z-depth-4 test">
                    <ul className="il-header">
                      <li class="collection-header">
                        <h4>All Issues</h4>
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
                          <span style={{ margin: '2px 10px' }}>
                            {issue.date}
                          </span>
                          <Chip
                            className={`${
                              chipStyles[issue.status.toUpperCase()]
                            }`}
                            style={{
                              float: 'right',
                              position: 'relative',
                              top: '-4px'
                            }}
                          >
                            {issue.status.toUpperCase()}
                          </Chip>
                        </CollectionItem>
                      );
                    })}
                  </Collection>
                </div>
              ) : (
                'Loading...'
              )}
              <div
                className="col s10 offset-s1 l7 z-depth-4"
                style={{
                  borderRadius: '5px'
                }}
              >
                <h3>Equipment</h3>

                <Collapsible>
                  {this.state.equipmentLoaded &&
                    this.state.equipment.map(item => (
                      <CollapsibleItem
                        header={item.name}
                        onClick={event => {
                          this.equipSelect(event, item.id);
                        }}
                      >
                        <table style={{ border: '1px dashed lightgray' }}>
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
                        {this.state.selected !== '' &&
                          this.state.issues
                            .filter(issue => {
                              return issue.equipmentId == this.state.selectedId;
                            })
                            .map((issue, index) => {
                              return (
                                <div
                                  className="cyan white-text same-button z-depth-2"
                                  style={{
                                    textAlign: 'left',
                                    width: '40%',

                                    borderRadius: '2px'
                                  }}
                                >
                                  <a
                                    style={{
                                      color: 'white'
                                    }}
                                    href={`/issue-log`}
                                  >
                                    <p style={{ paddingLeft: '3px' }}>
                                      <b>{`Issue ${index + 1}`}</b>:{' '}
                                      {issue.name}
                                    </p>
                                  </a>
                                </div>
                              );
                            })}
                      </CollapsibleItem>
                    ))}
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
