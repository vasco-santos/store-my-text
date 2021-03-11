const { LotusRPC } = require('@filecoin-shipyard/lotus-client-rpc')
const { mainnet } = require('@filecoin-shipyard/lotus-client-schema')
const { NodejsProvider } = require('@filecoin-shipyard/lotus-client-provider-nodejs')

// TODO: Use deployed lotus
const endpointUrl = process.env.ENDPOINT || 'wss://api.chain.love/rpc/v0'
const port = parseInt(process.env.PORT, 10) || 8001
const host = process.env.HOST || 'localhost'

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), {
  // TODO config options here
  origin: '*' // TODO change
})

fastify.post('/lotus', async (request, reply) => {
  const provider = new NodejsProvider(endpointUrl, { token: request.body.token })
  const client = new LotusRPC(provider, { schema: mainnet.fullNode })

  const deals = await client.clientListDeals()

  reply.type('application/json').code(200)
  return deals
})

fastify.post('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return request.body
})

fastify.listen({ port, host }, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
