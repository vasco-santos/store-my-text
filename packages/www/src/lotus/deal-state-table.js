import { DealStates } from './deal-utils'
import { DataTransferStatuses } from './datatransfer-utils'
import { FilecoinPrecision, sizeString } from './filecoin-utils'

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

export default DealStateTable
