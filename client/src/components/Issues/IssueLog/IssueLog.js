import React from 'react';
import M from 'materialize-css';
import '../Issues.css';
import '../../../App.css';
import Issue from './Issue';
import NewIssue from './NewIssue';
import FilterOptions from './FilterOptions';
import helpers, {
  getIssue,
  postIssue,
  delIssue,
  postImages,
  postTag,
  postComment,
  delComment,
  putIssue
} from '../axiosHelpers';
import { statuses, today } from '../data';
import Visits from './Visits';
import VIModal from '../ViewIssue/ViewIssueModal';

const { getIssues, getTags, getComments } = helpers;

let tags = [];

export default class IssueLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      issuesLoaded: false,
      issueStatus: '',
      orgID: 1,
      editingIssue: false,
      issue: null,
      tag: '',
      tags: [],
      modal: false,
      isVisit: false,
      comment: '',
      comments: [],
      showComments: false,
      filterStatus: 'all',
      filterTag: 'all',
      passes: false,
      images: [],
      eid: 3,
      showCommentsObj: {},
      commentsObj: {},
      showOnlyAdminVisits: false,
      vimIssue: ''
    };
  }

  componentDidMount() {
    getIssues()
      .then(res => {
        this.setState({ issues: res.data.issues, issuesLoaded: true });
        const showCommentsObj = {};
        const commentsObj = {};
        this.state.issues.forEach(issue => {
          showCommentsObj[`issue${issue.id}`] = false;
          commentsObj[`issue${issue.id}`] = '';
        });
        this.setState({ showCommentsObj, commentsObj });
      })
      .catch(console.error);
    getTags()
      .then(res => this.setState({ tags: res.data.tags }))
      .catch(console.error);
    getComments()
      .then(res => this.setState({ comments: res.data.comments }))
      .catch(console.error);
  }

  postIssues = event => {
    event.preventDefault();
    const issueFormData = document.querySelector('.submit-issue');
    postIssue({
      name: issueFormData[0].value,
      notes: issueFormData[1].value,
      status: issueFormData[3].value,
      state: this.state,
      today
    })
      .then(res => {
        const id = res.data.issue.id;
        const images = document.querySelector('#files');
        const files = Array.from(images.files);
        if (files.length !== 0) {
          console.log(files);
          const formData = new FormData();
          files.forEach((file, i) => {
            formData.append(i, file);
          });
          postImages({ id, formData })
            .then(res2 => {
              this.setState(prevState => ({
                ...prevState,
                issueName: '',
                issueNotes: '',
                issues: [res.data.issue, ...prevState.issues],
                images: []
              }));
              console.log('ISSUES', this.state.issues);
            })
            .catch(console.error);
        } else {
          this.setState(prevState => ({
            ...prevState,
            issueName: '',
            issueNotes: '',
            issues: [res.data.issue, ...prevState.issues],
            images: []
          }));
        }
        this.props.history.push('/issue-log');
      })
      .catch(console.error);
  };

  deleteIssue = event => {
    delIssue(event.target.value)
      .then(res => {
        var copy = this.state.issues.filter(function(element) {
          return element.id !== res.data.issue.id;
        });
        this.setState({ issues: copy });
      })
      .catch(console.error);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleDropChange = ({ target }) => {
    this.setState({
      [target.attributes[0].value]: target.attributes[1].value
    });
  };

  toggleEdit = () => {
    this.setState({
      editingIssue: !this.state.editingIssue
    });
  };

  toggleShowComments = id => {
    const showCommentsObj = this.state.showCommentsObj;
    showCommentsObj[`issue${id}`] = !showCommentsObj[`issue${id}`];
    this.setState({ showCommentsObj });
  };

  handleCommentChange = (id, event) => {
    const commentsObj = this.state.commentsObj;
    commentsObj[`issue${id}`] = event.target.value;
    this.setState({ commentsObj });
  };

  fetchIssue = id => {
    getIssue(id)
      .then(res => {
        this.setState({ issue: res.data.issue });
      })
      .catch(console.error);
  };

  handleTagEdit = (id, event) => {
    event.preventDefault();
    const newTag = { name: this.state.tag, issueId: id };
    postTag(newTag)
      .then(response => {
        this.setState({ tags: response.data, tag: '' });
      })
      .catch(err => {
        console.log('Tag Edit Error', err);
      });
  };

  // imgAdder = e => {
  //   console.log(e.target.files);
  //   const files = Array.from(e.target.files);
  //   this.setState({
  //     images: files,
  //     uploading: true
  //   });
  // };

  visitChange = ({ target }) => {
    const { name, checked } = target;
    this.setState({ [name]: checked });
  };

  submitComment = (id, event) => {
    event.preventDefault();
    postComment({
      content: this.state.commentsObj[`issue${id}`],
      userId: 1,
      issueId: event.target[0].attributes[2].value
    })
      .then(res => {
        this.setState({
          comments: [...this.state.comments, res.data.comment],
          comment: ''
        });
      })
      .catch(console.error);
  };

  deleteComment = event => {
    delComment(event)
      .then(res => {
        let copy = this.state.comments.slice().filter(function(comment) {
          return comment.id !== res.data.comment.id;
        });
        this.setState({ comments: copy });
      })
      .catch(console.error);
  };

  // Populates global tags array with whatever new tags are entered
  arrayTags = () => {
    this.state.tags.forEach(tag => {
      if (!tags.includes(tag.name)) tags.push(tag.name);
    });
  };

  toggleDateSort = () => {
    let reversedArray = this.state.issues.reverse();
    this.setState({ issues: reversedArray });
    document.querySelector('#mod-arrow').innerHTML === 'arrow_downward'
      ? (document.querySelector('#mod-arrow').innerHTML = 'arrow_upward')
      : (document.querySelector('#mod-arrow').innerHTML = 'arrow_downward');
  };

  updateIssue = (id, edits) => {
    putIssue(id, edits)
      .then(response => {
        var copy = this.state.issues.filter(issue => {
          return issue.id !== response.data.issue.id;
        });
        this.setState({
          issues: [response.data.issue, ...copy],
          vimIssue: response.data.issue
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    if (this.props.auth.isAuth()) {
      this.arrayTags();

      if (this.state.issuesLoaded) {
        M.AutoInit();

        return (
          <div className="page-container">
            <div className="right-side">
              <ul id="dropdown1" className="dropdown-content">
                <li
                  key={0}
                  onClick={this.handleDropChange}
                  name="filterStatus"
                  value="all"
                >
                  All
                </li>
                {statuses.map((status, index) => {
                  return (
                    <li
                      key={index + 1}
                      onClick={this.handleDropChange}
                      name="filterStatus"
                      value={status}
                    >
                      {status}
                    </li>
                  );
                })}
              </ul>
              <ul className="tabs" style={{ width: '265px' }}>
                <li className="tab tab-mod">
                  <a
                    href="#is-test-1"
                    style={{ fontSize: '15px', color: '#111111' }}
                  >
                    Issue Log
                  </a>
                </li>
                <li className="tab">
                  <a
                    href="#ad-test-1"
                    style={{ fontSize: '15px', color: '#111111' }}
                  >
                    Admin Visits
                  </a>
                </li>
              </ul>
              <div className="start-issue" id="is-test-1">
                <h3 style={{ textAlign: 'center', color: '#333333' }}>
                  Issue Log
                </h3>
                {/* Modal Trigger */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '600px',
                    marginBottom: '25px',
                    float: 'right'
                  }}
                >
                  <button
                    className="btn cyan  same-button"
                    onClick={this.toggleDateSort}
                  >
                    Sort by Date Added
                    <i
                      className="material-icons"
                      style={{ fontSize: '1rem', marginLeft: '5px' }}
                      id="mod-arrow"
                    >
                      arrow_downward
                    </i>
                  </button>
                  <button
                    data-target="modalA"
                    className="btn modal-trigger cyan  same-button"
                  >
                    + New Issue
                  </button>

                  <div id="modalA" className="modal">
                    <div className="modal-content">
                      <NewIssue
                        postIssues={this.postIssues}
                        issueName={this.state.issueName}
                        handleChange={this.handleChange}
                        issueNotes={this.state.issueNotes}
                        visitChange={this.visitChange}
                        uploading={this.state.uploading}
                        imgAdder={this.imgAdder}
                        statuses={statuses}
                        adminSelect=""
                        handleDropChange={this.handleDropChange}
                        dropDownId="issueStatusDropDown"
                      />
                    </div>
                  </div>
                  <button
                    className="dropdown-trigger btn cyan  same-button"
                    data-target="dropdown1"
                  >
                    Status
                  </button>

                  <button
                    className="dropdown-trigger btn cyan  same-button"
                    data-target="dropdown2"
                  >
                    Tags
                  </button>

                  <FilterOptions
                    statuses={statuses}
                    tags={tags}
                    handleDropChange={this.handleDropChange}
                    visitChange={this.state.visitChange}
                  />
                </div>

                <div
                  style={{
                    width: '78%',
                    margin: 'auto'
                  }}
                >
                  <div
                    className="issue-list"
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    {this.state.issues
                      .filter(issue => {
                        return !issue.isVisit;
                      })
                      .filter(issue => {
                        return (
                          issue.status.toLowerCase() ===
                            this.state.filterStatus.toLowerCase() ||
                          this.state.filterStatus === 'all'
                        );
                      })
                      .filter((issue, i, array) => {
                        let filteredTags = this.state.tags.filter(tag => {
                          if (!(this.state.filterTag === 'all')) {
                            return tag.name === this.state.filterTag;
                          }
                          return true;
                        });

                        let tagIds = [];
                        filteredTags.forEach(function(tag) {
                          tagIds.push(tag.issueId);
                        });

                        if (!(this.state.filterTag === 'all')) {
                          return tagIds.includes(issue.id);
                        }
                        return true;
                      })
                      .filter(issue => {
                        if (this.state.showOnlyAdminVisits) {
                          return issue.isVisit;
                        }
                        return true;
                      })
                      .map((issue, index) => {
                        return (
                          <>
                            <Issue
                              {...this.state}
                              key={index}
                              issue={issue}
                              deleteIssue={this.deleteIssue}
                              toggleShowComments={this.toggleShowComments}
                              deleteComment={this.deleteComment}
                              submitComment={this.submitComment}
                              handleCommentChange={this.handleCommentChange}
                              tabsToggle="issue"
                            />
                            <div
                              id={`modal-issue-${issue.id}`}
                              className="modal"
                              style={{ width: '500px', maxHeight: '85%' }}
                            >
                              <VIModal
                                issueId={issue.id}
                                deleteComment={this.deleteComment}
                                updateIssue={this.updateIssue}
                                vimIssue={this.state.vimIssue}
                              />
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div id="ad-test-1">
                <Visits
                  auth={this.props.auth}
                  filterStatus={this.state.filterStatus}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="page-container">
            <div className="right-side">
              <h1>Loading...</h1>
            </div>
          </div>
        );
      }
    } else {
      return <h1>You must be logged in to view this page</h1>;
    }
  }
}
