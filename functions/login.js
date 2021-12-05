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
      q.Map(
        q.Filter(
          q.Paginate(q.Match(q.Index("passwords_by_year"), currentYear)),
          q.Lambda(x => q.Equals(data, q.Select(["data", "code"], q.Get(x)))),
        ),
        q.Lambda(x => q.Select(["data", "member"], q.Get(x))),
      ),
    )
    .then(response => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data[0]),
      })
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
