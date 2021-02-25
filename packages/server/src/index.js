const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), {
  // TODO config options here
  origin: '*' // TODO change
})

fastify.post('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return request.body
})

fastify.listen(8001, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
