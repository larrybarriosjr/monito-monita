import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, _context, callback) => {
  const data = JSON.parse(event.body)
  const currentYear = new Date().getFullYear().toString()
  return client
    .query(
      q.Select(
        ["data", "wishlist"],
        q.Get(q.Match(q.Index("wishlists_by_year_and_member"), [currentYear, data])),
      ),
    )
    .then(response => {
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
