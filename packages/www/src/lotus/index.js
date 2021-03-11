import './index.css'
import React from 'react'
import classNames from 'classnames'

import { postData } from '../utils'
import { DealStates } from './deal-utils'
import { DataTransferStatuses } from './datatransfer-utils'
import { FilecoinPrecision, sizeString } from './filecoin-utils'

class Lotus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
      token: '',
      data: undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTokenChange = this.handleTokenChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({
      submitting: true
    })

    // TODO: proper config for server addr
    const serverUrl = new URL(document.location)
    serverUrl.port = 8001
    postData(serverUrl.toString(), {
      token: this.state.token
    }).then((data) => {
      console.log('data', data)
      this.setState({
        submitting: false,
        data
      })
    })
  }

  handleTokenChange (event) {
    this.setState({ token: event.target.value })
  }

  render () {
    const formClass = classNames({
      form: true,
      'form-hidden': this.state.submitting
    })

    const stateTable = this.state.data ? <DealStateTable deals={this.state.data} /> : undefined
    return (
      <div className="container">
        <form className={formClass} onSubmit={this.handleSubmit}>
          <label>
            Token:
            <input className="form-input"
              value={this.state.token}
              onChange={this.handleTokenChange} />
          </label>
          <input className="form-button" type="submit" value="Submit" />
        </form>
        {stateTable}
      </div>
    )
  }
}

function DealStateTable (props) {
  return (
    <table id="dealList">
      <thead>
        <tr>
          <th>Created</th>
          <th>Deal CID</th>
          <th>Deal ID</th>
          <th>Provider</th>
          <th>State</th>
          <th>Piece CID</th>
          <th>Size</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Transfer Status</th>
          <th>Verified</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {props.deals.map((deal, i) => {
          const dealState = DealStates[deal.State]
          const price = (parseInt(deal.PricePerEpoch, 10) * deal.Duration) / FilecoinPrecision
          return (
            <tr key={i} className={dealState}>
              <td>{new Date(deal.CreationTime).toLocaleString()}</td>
              <td><abbr title={deal.ProposalCid['/']}>{deal.ProposalCid['/'].substring(0, 10)}...</abbr></td>
              <td>{deal.DealID}</td>
              <td><a href={`https://filfox.info/en/address/${deal.Provider}`}>{deal.Provider}</a></td>
              <td>{dealState}</td>
              <td><abbr title={deal.PieceCID['/']}>{deal.PieceCID['/'].substring(0, 10)}...</abbr></td>
              <td>{sizeString(deal.Size)}</td>
              <td>{price} FIL</td>
              <td>{deal.Duration}</td>
              <td>{deal.DataTransfer ? DataTransferStatuses[deal.DataTransfer.Status] : ''}</td>
              <td>{deal.Verified ? 'Y' : 'N'}</td>
              <td className="message">{deal.Message}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Lotus
