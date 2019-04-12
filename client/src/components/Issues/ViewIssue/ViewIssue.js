import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import '../Issues.css';
import { NavLink } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import Comments from '../Comments';
import IssueBtn from './IssueBtn';
import helpers, {
  getIssue,
  putIssue,
  delIssue,
  postTag,
  delTag,
  postComment,
  delComment,
  getImages
} from '../axiosHelpers';
import { statuses, today } from '../data';

const { getTags, getComments } = helpers;

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
  }

  componentDidMount() {
    this.fetchIssue(this.props.match.params.id);
    getTags()
      .then(res => {
        this.setState({
          tags: res.data.tags
        });
        getImages(this.props.match.params.id)
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
          .catch(err => console.log(err.data));
      })
      .catch(console.log);

    getComments()
      .then(res => this.setState({ comments: res.data.comments }))
      .catch(console.log);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleEdit = () => {
    this.setState({
      editingIssue: !this.state.editingIssue,
      nameEdits: this.state.issue.name,
      noteEdits: this.state.issue.notes
    });
  };

  fetchIssue = id => {
    getIssue(id)
      .then(res => {
        this.setState({ issue: res.data.issue });
      })
      .catch(console.log);
    // this.setState({issueStatus: this.state.issue.status})s
  };

  handleEdit = id => {
    const newEdits = {};
    // if (this.state.tag.length > 0){
    //   newEdits.tags = this.state.note.tags;
    //   newEdits.tags.push(this.state.tag);
    // }
    if (this.state.nameEdits.length > 0) newEdits.name = this.state.nameEdits;
    if (this.state.noteEdits.length > 0) newEdits.notes = this.state.noteEdits;
    newEdits.status = this.state.issueStatus;
    newEdits.date = today;
    putIssue(id, newEdits)
      .then(response => {
        this.setState({ issue: response.data.issue, editingIssue: false });
      })
      .catch(err => {
        console.log('Edit Error:', err);
      });
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

  handleTagEdit = id => {
    const newTag = { name: this.state.tag, issueId: id, organizationId: 1 };
    console.log(newTag);
    postTag(newTag)
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
  };

  handleTagSubmit = e => {
    e.preventDefault();
    this.handleTagEdit(this.state.issue.id);
  };

  deleteTag = event => {
    delTag(event.target.getAttribute('id'))
      .then(response => {
        let deleteId = response.data.tag.id;
        this.setState(prevState => ({
          tags: prevState.tags.filter(tag => tag.id !== deleteId)
        }));
      })
      .catch(err => {
        console.log('Tag Edit Error', err);
      });
  };

  submitComment = event => {
    event.preventDefault();
    postComment({
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
      .catch(console.error);
  };

  deleteComment = event => {
    delComment(event.target.getAttribute('id'))
      .then(res => {
        let copy = this.state.comments.slice().filter(function(comment) {
          return comment.id !== res.data.comment.id;
        });
        this.setState({ comments: copy });
      })
      .catch(console.error);
  };

  toggleShowComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    if (this.props.auth.isAuth()) {
      return (
        <div className="page-container">
          <Sidebar />
          <div className="right-side">
            {this.state.issue ? (
              <div>
                <h1 style={{ textAlign: 'center', border: '2px solid gray' }}>
                  Issue
                </h1>
                <div key={this.state.issue.id}>
                  <h1>
                    Name:{' '}
                    {this.state.editingIssue ? (
                      <input
                        name="nameEdits"
                        className="issue-input"
                        value={this.state.nameEdits}
                        onChange={this.handleChange}
                      />
                    ) : (
                      this.state.issue.name
                    )}
                  </h1>
                  <h2>
                    Notes:{' '}
                    {this.state.editingIssue ? (
                      <input
                        name="noteEdits"
                        className="issue-input"
                        value={this.state.noteEdits}
                        onChange={this.handleChange}
                      />
                    ) : (
                      this.state.issue.notes
                    )}
                  </h2>
                  <h3>
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
                  </h3>
                  <h4>Date: {this.state.issue.date}</h4>
                  <h5>Org. Id: {this.state.issue.organizationId}</h5>
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
                      />
                    </form>
                  </div>
                  <Comments
                    comments={this.state.comments}
                    issueId={this.state.issue.id}
                    deleteComment={this.deleteComment}
                  />
                  <form onSubmit={this.submitComment}>
                    <input
                      name="comment"
                      placeholder="add comment"
                      value={this.state.comment}
                      issue_id={this.state.issue.id}
                      onChange={this.handleChange}
                    />
                  </form>

                  <IssueBtn
                    onClick={this.deleteIssue}
                    issueId={this.state.issue.id}
                    action="Delete"
                  />
                  <IssueBtn
                    onClick={this.toggleEdit}
                    issueId={this.state.issue.id}
                    action="Edit"
                  />
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
