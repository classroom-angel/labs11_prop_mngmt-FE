import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import { Button, CardPanel, Row, Col } from 'react-materialize';
import './testimonial.css';

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: []
    };
  }

  componentDidMount() {
    console.log('hi hi!');
    axios
      .get('testimonials')
      .then(response => {
        console.log(response.data);
        this.setState(function() {
          return { testimonials: [...response.data.testimonials] };
        });
      })
      .catch(error => {
        console.error('Cannot get testimonials', error);
      });
  }

  render() {
    return (
      <div className="testimonials">
        <div
        className="addbtn"
        >
          <Link to="/AddTestimonial">
            <Button
              className="amber"
              waves="light"
            >
              Tell us what you think!
            </Button>
          </Link>
        </div>

        <Row
          className="valign-wrapper container"
          style={{ flexWrap: 'wrap', marginTop: '30px' }}
        >
          {this.state.testimonials.map(testimonial => {
            return (
              <Col className="s12 m10 l5" style={{ margin: '0' }}>
                <CardPanel className="cyan panel">
                  <span className="white-text ">
                    <p style={{ fontSize: '22px' }}>
                      <i>"{testimonial.text}"</i>
                    </p>
                    <p>
                      <b>
                        -{testimonial.name}, {testimonial.role}
                      </b>
                    </p>
                  </span>
                </CardPanel>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Testimonials;
