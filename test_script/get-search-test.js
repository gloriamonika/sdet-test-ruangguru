const assert = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const page = require('../page/skillacademy-get.js')
const schema = require('../data/skillacademy-schema.json')

const getSearch = {
  describe: 'As a user I want to be able to search the Skill Academy website',
  precondition: 'None',
  testCase: {
    positive: {
      searchQuery: 'I should be able to search the website using a search keyword/query',
      minPrice: 'I should be able to search the website with the minimum price filter',
      maxPrice: 'I should be able to search the website with the maximum price filter',
      displayByPage: 'I should be able to display the desired number of data on the desired page number',
      sortByPrice: 'I should be able to sort the search result in descending order based on the price',
      minDuration: 'I should be able to find results based on the desired minimum duration',
      maxDuration: 'I should be able to find results based on the desired maximum duration',
      combinedFilter: {
        priceRange: 'I should be able to filter the search result based on a range of minimum and maximum price',
        durationLength: 'I should be able to filter the search result based on a range of minimum and maximum class duration',
        sortPriceRange: 'I should be able to filter the search result by price descending based on a range of minimum and maximum price'
      }
    }
  }
}

var query

describe(`@get ${getSearch.describe}`, async () => {
  it(`${getSearch.testCase.positive.searchQuery}`, async () => {
    query = {
      "searchQuery": "webinar"
    }
    const response = await page.getSearch(query)
    assert(response.body.status).to.equal('success')
    assert(response.body).to.jsonSchema(schema)
  })

  it(`${getSearch.testCase.positive.sortByPrice}`, async () => {
    query = {
      "sortBy": "price"
    }
    const response = await page.getSearch(query)
    assert(response.body.status).to.equal('success')
    assert(response.body).to.jsonSchema(schema)
  })

  it(`${getSearch.testCase.positive.minPrice}`, async () => {
    query = {
      "minPrice": 100000
    }
    const response = await page.getSearch(query)
    data_arr = response.body.data.data
    isBigger = true
    for (i = 0; i < data_arr.length; i++ && isBigger) {
      if (data_arr[i].price < 100000) {
        isBigger = false
      }
    }
    if (!isBigger) {
      assert.fail("Returned data does not match the query given, please contact the backend developer!") //fails the test suite if the returned data does not match the query given
    } else {
      assert(response.body.status).to.equal('success')
      assert(response.body).to.jsonSchema(schema)
    }
  })

  it(`${getSearch.testCase.positive.maxPrice}`, async () => {
    query = {
      "maxPrice": 1000000
    }
    const response = await page.getSearch(query)
    data_arr = response.body.data.data
    isSmaller = true
    for (i = 0; i < data_arr.length; i++ && isBigger) {
      if (data_arr[i].price > 1000000) {
        isSmaller = false
      }
    }
    if (!isSmaller) {
      assert.fail("Returned data does not match the query given, please contact the backend developer!")
    } else {
      assert(response.body.status).to.equal('success')
      assert(response.body).to.jsonSchema(schema)
    }
  })

  it(`${getSearch.testCase.positive.displayByPage}`, async () => {
    query = {
      "page": 1,
      "pageSize": 5
    }
    const response = await page.getSearch(query)
    if (response.body.data.data.length < 5 || response.body.data.data.length > 5) {
      assert.fail("Returned data count does not match the page size given, please contact the backend developer!")
    } else {
      assert(response.body.status).to.equal('success')
      assert(response.body).to.jsonSchema(schema)
    }
  })

  it(`${getSearch.testCase.positive.minDuration}`, async () => {
    //idk the duration, is it in mins? hours? days?? sticking with mins duration
    query = {
      "minDuration": 60
    }
    const response = await page.getSearch(query)
    assert(response.body.status).to.equal('success')
    assert(response.body).to.jsonSchema(schema)
  })

  it(`${getSearch.testCase.positive.maxDuration}`, async () => {
    query = {
      "maxDuration": 60
    }
    const response = await page.getSearch(query)
    assert(response.body.status).to.equal('success')
    assert(response.body).to.jsonSchema(schema)
  })

  it(`${getSearch.testCase.positive.combinedFilter.sortPriceRange}`, async () => {
    query = {
      "minPrice": 100000,
      "maxPrice": 1000000,
      "sortBy": "price"
    }
    const response = await page.getSearch(query)
    isMatch = true
    data_arr = response.body.data.data
    for (i = 0; i < data_arr.length; i++ && isBigger) {
      if (data_arr[i].price > 1000000 || data_arr[i].price < 100000) {
        isMatch = false
      }
    }
    if (!isMatch) {
      assert.fail("Returned data does not match the query, please contact the backend developer!")
    } else {
      assert(response.body.status).to.equal('success')
      assert(response.body).to.jsonSchema(schema)
    }
  })

  it(`${getSearch.testCase.positive.combinedFilter.priceRange}`, async () => {
    query = {
      "minPrice": 100000,
      "maxPrice": 1000000
    }
    const response = await page.getSearch(query)
    isMatch = true
    data_arr = response.body.data.data
    for (i = 0; i < data_arr.length; i++ && isBigger) {
      if (data_arr[i].price > 1000000 || data_arr[i].price < 100000) {
        isMatch = false
      }
    }
    if (!isMatch) {
      assert.fail("Returned data does not match the query, please contact the backend developer!")
    } else {
      assert(response.body.status).to.equal('success')
      assert(response.body).to.jsonSchema(schema)
    }
  })

  it(`${getSearch.testCase.positive.combinedFilter.durationLength}`, async () => {
    query = {
      "minDuration": 60,
      "maxDuration": 120
    }

    const response = await page.getSearch(query)
    assert(response.body.status).to.equal('success')
    //assert(response.body).to.jsonSchema(schema)

  })
})