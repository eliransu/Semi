const httpResponse = (status, data, func) => {
  if (status < 300) {
    if (!data) {
      return ({ status })
    } else {
      return ({ status, data })
    }
  } else {
    return ({ status, data, function: func })
  }
}

module.exports = { httpResponse }