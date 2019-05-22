const Graph = require("graph-data-structure");
const UserModel = require('../../database/models/UserModel')
const jwt = require('jwt-simple')
const graph = Graph()

const runMatching = async () => {
  const users = await UserModel.find({}).select({
    "username": 1, "products_to_give": 1,
    "products_to_take": 1
  })
  const matchingArray = []
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].products_to_give.length; j++) {
      for (let k = 0; k < users[i].products_to_take.length; k++) {
        matchingArray.push({
          username: users[i].username,
          edgeIn: users[i].products_to_take[k],
          edgeOut: users[i].products_to_give[j]
        })
      }
    }
  }
  // console.log(matchingArray)

  matchingArray.forEach(node => {
    graph.addNode(node.username)
  })

  matchingArray.forEach(source => {
    matchingArray.forEach(destention => {
      if (source.username !== destention.username) {
        if (source.edgeIn === destention.edgeOut) {
          console.log('add edge')
          graph.addEdge(destention.username, source.username)
        }
      }
    })
  })

  console.log(graph.nodes())

}

module.exports = { runMatching }
