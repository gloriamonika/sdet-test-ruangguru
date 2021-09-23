const supertest = require('supertest')
require('dotenv').config()

const api = supertest(process.env.API_GET)

const getSearch = (query) =>
api.get('/search')
.set('accept','text/html')
.query(query)

module.exports={
  getSearch
}