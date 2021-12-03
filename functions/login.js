import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, _context, callback) => {
  const data = JSON.parse(event.body)
  return client
    .query(q.Get(q.Match(q.Index("password_by_name"), data)))
    .then(response => {
      console.log(response.data)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
