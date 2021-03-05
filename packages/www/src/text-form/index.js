import './index.css';
import React from 'react';
import classNames from 'classnames'

import { postData } from '../utils'

class TextForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      submitting: false,
      email: '',
      text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();

    this.setState({
      submitting: true
    });

    // TODO: proper config for server addr
    postData('http://127.0.0.1:8001/', {
      text: this.state.text,
      email: this.state.email
    }).then((data) => {
      console.log('data', data)
      this.setState({
        text: '',
        email: '',
        submitting: false
      })
    })
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render () {
    const formClass = classNames({
      form: true,
      'form-hidden': this.state.submitting
    })

    return (
      <div className="form-container">
        <form className={formClass} onSubmit={this.handleSubmit}>
          <label>
            Text:
          <textarea className="form-text" rows="7" cols="10"
              value={this.state.text}
              onChange={this.handleTextChange} />
          </label>
          <label>
            E-mail:
          <input className="form-input" type="email"
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </label>
          <input className="form-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TextForm;
