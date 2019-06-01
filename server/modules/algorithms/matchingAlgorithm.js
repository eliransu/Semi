const Graph = require("graph-data-structure");
const UserModel = require('../../database/models/UserModel')
const graph = Graph()

const runMatching = async (user) => {
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

  const matches = []
  matchingArray.forEach(node => {
    graph.addNode(node.username)
  })

  matchingArray.forEach(source => {
    matchingArray.forEach(destention => {
      if (source.username !== destention.username) {
        if (source.edgeIn === destention.edgeOut) {
          graph.addEdge(destention.username, source.username)
          matches.push({
            giver: destention.username,
            taker: source.username,
            product: destention.edgeOut
          })
        }
      }
    })
  })
  const result = graph.cycleDetection([user])
  const cycle = result && result.reverse()
  let matchFlag = false
  for (let i = 0; i < cycle.length - 1; i++) {
    if (!matches.some(match => match.giver === cycle[i] && match.taker === cycle[i + 1])) {
      return
    }
    matchFlag = true
  }
  if (matchFlag) {
    return matches
  }
}

module.exports = { runMatching }
