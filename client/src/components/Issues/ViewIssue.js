import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../../App.css';
import './Issues.css';
import axios from '../../axiosInstance';
import { NavLink } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

const statuses = ['Needs Attention', 'Resolved', 'Scheduled', 'Ignored'];

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;
class ViewIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issuesLoaded: false,
      issueName: '',
      issueNotes: '',
      issueStatus: '',
      orgID: 1,
      editingIssue: false,
      issue: null,
      nameEdits: '',
      noteEdits: '',
      tag: '',
      tags: [],
      modal: false,
      comments: [],
      comment: '',
      showComments: false,
      imageIds: []
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.fetchIssue = this.fetchIssue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTagEdit = this.handleTagEdit.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.toggleShowComments = this.toggleShowComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this.fetchIssue(this.props.match.params.id);
    axios
      .get('tags')
      .then(res => {
        this.setState({
          tags: res.data.tags
        });
        axios
          .get(`issues/${this.props.match.params.id}/images`)
          .then(res => {
            let images = res.data.images;
            const imageIds = images.map(image => {
              return image.path.slice(0, -4);
            });
            console.log(imageIds);
            this.setState({
              imageIds
            });
          })
          .catch(err => console.log('CRAP!!!'));
      })
      .catch(err => console.log(err));

    axios
      .get('comments')
      .then(res => this.setState({ comments: res.data.comments }))
      .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleEdit() {
    this.setState({
      editingIssue: !this.state.editingIssue,
      nameEdits: this.state.issue.name,
      noteEdits: this.state.issue.notes
    });
  }

  fetchIssue(id) {
    axios
      .get(`issues/${id}`)
      .then(res => {
        this.setState({ issue: res.data.issue });
      })
      .catch(err => {
        console.log(err);
      });
    // this.setState({issueStatus: this.state.issue.status})s
  }

  handleEdit(id) {
    const newEdits = {};
    // if (this.state.tag.length > 0){
    //   newEdits.tags = this.state.note.tags;
    //   newEdits.tags.push(this.state.tag);
    // }
    if (this.state.nameEdits.length > 0) newEdits.name = this.state.nameEdits;
    if (this.state.noteEdits.length > 0) newEdits.notes = this.state.noteEdits;
    newEdits.status = this.state.issueStatus;
    newEdits.date = today;
    axios
      .put(`issues/${id}`, newEdits)
      .then(response => {
        this.setState({ issue: response.data.issue, editingIssue: false });
      })
      .catch(err => {
        console.log('Edit Error:', err);
      });
  }

  handleTagEdit(id) {
    const newTag = { name: this.state.tag, issueId: id, organizationId: 1 };
    console.log(newTag);
    axios
      .post(`tags`, newTag)
      .then(response => {
        this.setState({
          tags: [
            ...this.state.tags,
            {
              ...response.data.tag,
              issueId: response.data.issueJoinTag.issueId
            }
          ],
          tag: ''
        });
      })
      .catch(err => {
        console.log('Tag Edit Error', err);
      });
  }

  handleTagSubmit(e) {
    e.preventDefault();
    this.handleTagEdit(this.state.issue.id);
  }

  deleteTag(event) {
    let newArray = this.state.tags.slice();
    axios
      .delete(`tags/${event.target.getAttribute('id')}`)
      .then(response => {
        let deleteId = response.data.tag.id;
        newArray = newArray.filter(function(tag) {
          return tag.id !== deleteId;
        });
        this.setState({ tags: newArray });
      })
      .catch(err => {
        console.log('Tag Edit Error', err);
      });
  }

  submitComment(event) {
    event.preventDefault();
    axios
      .post('comments', {
        content: this.state.comment,
        userId: 1,
        issueId: event.target[0].attributes[2].value
      })
      .then(res => {
        this.setState({
          comments: [...this.state.comments, res.data.comment],
          comment: ''
        });
      })
      .catch(err => console.error(err));
  }

  deleteComment(event) {
    axios
      .delete(`comments/${event.target.getAttribute('issue_id')}`)
      .then(res => {
        let copy = this.state.comments.slice().filter(function(comment) {
          return comment.id !== res.data.comment.id;
        });
        this.setState({ comments: copy });
      })
      .catch(err => console.error(err));
  }

  toggleShowComments() {
    this.setState({ showComments: !this.state.showComments });
  }

  render() {
    if (this.props.auth.isAuth()) {
      return (
        <div className="page-container">
          <Sidebar />
          <div className="right-side">
            {this.state.issue ? (
              <div
                style={{
                  width: '50%',
                  margin: 'auto'
                }}
              >
                <h1 style={{ textAlign: 'center' }}>Issue</h1>
                <div key={this.state.issue.id}>
                  <p>
                    Name:{' '}
                    {this.state.editingIssue ? (
                      <input
                        name="nameEdits"
                        className="issue-input"
                        value={this.state.nameEdits}
                        onChange={this.handleChange}
                        style={{ width: '300px', margin: 'auto' }}
                      />
                    ) : (
                      this.state.issue.name
                    )}
                  </p>
                  <p>
                    Notes:{' '}
                    {this.state.editingIssue ? (
                      <input
                        name="noteEdits"
                        className="issue-input"
                        value={this.state.noteEdits}
                        onChange={this.handleChange}
                        style={{ width: '300px', margin: 'auto' }}
                      />
                    ) : (
                      this.state.issue.notes
                    )}
                  </p>
                  <p>
                    Status:{' '}
                    {this.state.editingIssue ? (
                      <select name="issueStatus" onChange={this.handleChange}>
                        <option value="">Status...</option>
                        {statuses.map((status, index) => {
                          return (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      this.state.issue.status
                    )}
                  </p>
                  <p>Date: {this.state.issue.date}</p>
                  <p>Org. Id: {this.state.issue.organizationId}</p>
                  {this.state.imageIds.map(id => {
                    return (
                      <Image cloudName="dzeio0al7" publicId={id}>
                        <Transformation
                          width="200"
                          height="200"
                          crop="fill"
                          gravity="auto"
                        />
                      </Image>
                    );
                  })}
                  <div className="tag-container">
                    {this.state.tags
                      .filter(tag => {
                        return tag.issueId === this.state.issue.id;
                      })
                      .map((tag, index) => {
                        return (
                          <div key={tag.id} className="tag">
                            {tag.name}
                            <span
                              className="close"
                              id={tag.id}
                              index={index}
                              onClick={this.deleteTag}
                            />
                          </div>
                        );
                      })}
                    <form className="tagForm" onSubmit={this.handleTagSubmit}>
                      <input
                        className="mainInput"
                        type="text"
                        placeholder="add tag"
                        name="tag"
                        onChange={this.handleChange}
                        value={this.state.tag}
                        style={{ width: '100px', margin: 'auto' }}
                      />
                    </form>
                  </div>
                  <div>
                    {this.state.comments
                      .filter(comment => {
                        return comment.issueId === this.state.issue.id;
                      })
                      .map(comment => {
                        return (
                          <div key={comment.id}>
                            - {comment.content}
                            <span
                              onClick={this.deleteComment}
                              className="delete-button"
                              issue_id={comment.id}
                            >
                              {' '}
                              x
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  <form onSubmit={this.submitComment}>
                    <input
                      name="comment"
                      placeholder="add comment"
                      value={this.state.comment}
                      issue_id={this.state.issue.id}
                      onChange={this.handleChange}
                    />
                  </form>

                  <button
                    onClick={this.deleteIssue}
                    value={this.state.issue.id}
                    sytle={{ backgroundColor: 'firebrick', color: 'orange' }}
                  >
                    Delete Issue
                  </button>
                  <button
                    onClick={this.toggleEdit}
                    value={this.state.issue.id}
                    sytle={{ backgroundColor: 'firebrick', color: 'orange' }}
                  >
                    Edit Issue
                  </button>
                  {this.state.editingIssue ? (
                    <button
                      onClick={() => {
                        this.handleEdit(this.props.match.params.id);
                      }}
                      className="view-issue-button"
                    >
                      Save
                    </button>
                  ) : null}
                  <NavLink to="/issue-log">Back to Issues</NavLink>
                </div>
              </div>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      );
    } else {
      return <h1>Whoops, you must be logged in to view this Issue</h1>;
    }
  }
}

export default ViewIssue;
