import Express from 'express'

const api = Express.Router()

api.get('/', (req, res) => {
  res.json({message: 'success!'})
})

export default api
