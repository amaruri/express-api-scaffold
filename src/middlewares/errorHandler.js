module.exports = function (err, req, res, next) {
  const { output } = err
  if (output) {
    const { payload } = output
    return res.status(payload.statusCode).send(payload.message)
  }
  console.log(err)
  return res.status(500).send(err.message)
}
