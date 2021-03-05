import './index.css';
import React from 'react';
import classNames from 'classnames';

import { postData } from '../utils'

class Lotus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      token: '',
      data: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();

    this.setState({
      submitting: true
    });

    // TODO: proper config for server addr
    postData('http://127.0.0.1:8001/lotus', {
      token: this.state.token
    }).then((data) => {
      console.log('data', data)
      this.setState({
        submitting: false
      })
    })
  }

  handleTokenChange (event) {
    this.setState({ token: event.target.value });
  }

  render () {
    const formClass = classNames({
      form: true,
      'form-hidden': this.state.submitting
    })

    return (
      <div className="container">
        <form className={formClass} onSubmit={this.handleSubmit}>
          <label>
            Token:
            <input className="form-input"
              value={this.state.tiken}
              onChange={this.handleTokenChange} />
          </label>
          <input className="form-button" type="submit" value="Submit" />
        </form>
        <div>{this.state.data}</div>
      </div>
    )
  }
}

export default Lotus;
