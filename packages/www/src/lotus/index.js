import './index.css'
import React from 'react'
import Select from 'react-select'
import classNames from 'classnames'

import { postData } from '../utils'
import DealStateTable from './deal-state-table'

const options = [
  { value: 'list-deals', label: 'List Deals' },
  { value: 'list-miners', label: 'List Miners' },
  { value: 'list-imports', label: 'List Imports' }
]

class Lotus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
      token: '',
      data: undefined,
      dataRoute: undefined,
      route: options[0].value
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.handleTokenChange = this.handleTokenChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({
      submitting: true
    })

    // TODO: proper config for server addr
    const serverUrl = new URL(`${document.location.origin}/${this.state.route}`)
    serverUrl.port = 8001
    postData(serverUrl.toString(), {
      token: this.state.token
    }).then((data) => {
      console.log('data', data)
      this.setState({
        submitting: false,
        dataRoute: this.state.route,
        data
      })
    })
  }

  handleRouteChange (selected) {
    this.setState({ route: selected.value })
  }

  handleTokenChange (event) {
    this.setState({ token: event.target.value })
  }

  _renderData () {
    if (!(this.state.data && this.state.dataRoute)) {
      return undefined
    }
    switch (this.state.dataRoute) {
      case 'list-deals':
        return <DealStateTable deals={this.state.data} />
      default:
        return undefined
    }
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
              value={this.state.token}
              onChange={this.handleTokenChange} />
          </label>
          <Select
            value={ this.state.route }
            onChange={ this.handleRouteChange }
            options={ options }
          />
          <input className="form-button" type="submit" value="Submit" />
        </form>
        {this._renderData()}
      </div>
    )
  }
}

export default Lotus
