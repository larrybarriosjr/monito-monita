import type { VercelRequest, VercelResponse } from "@vercel/node"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_ADMIN_KEY || "",
})

export default function (_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")

  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Members"))),
        q.Lambda(x => q.Select(["data", "name"], q.Get(x))),
      ),
    )
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(error))
}
