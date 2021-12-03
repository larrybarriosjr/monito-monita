import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, _context, callback) => {
  const { name, wishlist } = JSON.parse(event.body)
  return client
    .query(
      q.Update(q.Select(["ref"], q.Get(q.Match(q.Index("members_by_name"), name))), { data: { wishlist } }),
    )
    .then(response => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data.wishlist),
      })
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
