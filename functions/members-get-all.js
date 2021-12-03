/* code from functions/todos-read-all.js */
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (_event, _context, callback) => {
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Members"))),
        q.Lambda(x => q.Get(x)),
      ),
    )
    .then(response => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data.map(x => x.data.name)),
      })
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
