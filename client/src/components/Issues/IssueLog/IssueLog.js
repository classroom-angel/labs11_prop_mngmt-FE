import React from 'react';
import M from 'materialize-css';
import Sidebar from '../../Sidebar/Sidebar';
import '../Issues.css';
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
  delComment
} from '../axiosHelpers';
import { statuses, today } from '../data';

const { getIssues, getTags, getComments } = helpers;

let tags = [];

export default class IssueLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      issuesLoaded: false,
      issueName: '',
      issueNotes: '',
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
      commentsObj: {}
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
    postIssue({ state: this.state, today })
      .then(res => {
        const id = res.data.issue.id;
        if (this.state.images === []) {
          const formData = new FormData();
          const files = [...this.state.images];
          console.log(files);
          files.forEach((file, i) => {
            formData.append(i, file);
          });
          console.log(formData);
          postImages({ id, formData })
            .then(res2 => {
              console.log('RES2', res2);
              this.setState(prevState => ({
                ...prevState,
                issueName: '',
                issueNotes: '',
                issues: [...prevState.issues, res.data.issue],
                images: []
              }));
            })
            .catch(console.error);
        } else {
          this.setState(prevState => ({
            ...prevState,
            issueName: '',
            issueNotes: '',
            issues: [...prevState.issues, res.data.issue],
            images: []
          }));
        }
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
    console.log(target.attributes[1].value);
    this.setState({
      [target.attributes[0].value]: target.attributes[1].value
    });
  };

  toggleEdit = () => {
    this.setState({
      editingIssue: !this.state.editingIssue,
      title: this.state.note.title,
      textBody: this.state.note.textBody
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
        console.log('fetched note', res.data);
        this.setState({ issue: res.data.issue });
      })
      .catch(console.error);
  };

  handleTagEdit = (id, event) => {
    event.preventDefault();
    const newTag = { name: this.state.tag, issueId: id };
    postTag(newTag)
      .then(response => {
        console.log('axios response', response.data);
        this.setState({ tags: response.data, tag: '' });
      })
      .catch(err => {
        console.log('Tag Edit Error', err);
      });
  };

  imgAdder = e => {
    const files = Array.from(e.target.files);
    this.setState({
      images: files,
      uploading: true
    });
  };

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

  render() {
    if (this.props.auth.isAuth()) {
      this.arrayTags();

      if (this.state.issuesLoaded) {
        var dd = document.querySelectorAll('.dropdown-trigger'); // Select the dropdown elements
        if (dd) {
          M.Dropdown.init(dd, {});
        }

        var mod = document.querySelectorAll('.modal');
        if (mod) {
          M.Modal.init(mod, {});
        }

        return (
          <div className="page-container">
            <div className="right-side">
              <h1 style={{ textAlign: 'center', color: '#333333' }}>
                Issue Log
              </h1>
              {/* Modal Trigger */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: '500px',
                  marginBottom: '25px',
                  float: 'right'
                }}
              >
                <button
                  data-target="modal1"
                  className="btn modal-trigger cyan darken-4"
                >
                  + New Issue
                </button>

                <div id="modal1" className="modal">
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
                    />
                  </div>
                </div>

                <FilterOptions
                  statuses={statuses}
                  tags={tags}
                  handleDropChange={this.handleDropChange}
                />
              </div>
              <div className="issue-list">
                {this.state.issues.map(issue => (
                  <Issue
                    {...this.state}
                    issue={issue}
                    deleteIssue={this.deleteIssue}
                    toggleShowComments={this.toggleShowComments}
                    deleteComment={this.deleteComment}
                    submitComment={this.submitComment}
                    handleCommentChange={this.handleCommentChange}
                  />
                ))}
                {/*<NewIssue
                  postIssues={this.postIssues}
                  issueName={this.state.issueName}
                  handleChange={this.handleChange}
                  issueNotes={this.state.issueNotes}
                  visitChange={this.visitChange}
                  uploading={this.state.uploading}
                  imgAdder={this.imgAdder}
                  statuses={statuses}
                />*/}
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
    }
  }
}
