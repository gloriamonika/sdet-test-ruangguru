const assert=require('chai').expect

const page = require('../page/skillacademy-get.js')

const getSearch = {
  describe:'As a user I want to be able to search the Skill Academy website',
  precondition:'None',
  testCase:{
    positive:{
      searchQuery:'I should be able to search the website using a search keyword/query',
      minPrice:'I should be able to search the website with the minimum price filter',
      maxPrice:'I should be able to search the website with the maximum price filter',
      displayByPage:'I should be able to display the desired number of data on the desired page number',
      sortByPrice:'I should be able to sort the search result in descending order based on the price',
    }
  }
}