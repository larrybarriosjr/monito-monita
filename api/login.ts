import type { VercelRequest, VercelResponse } from "@vercel/node"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_ADMIN_KEY || "",
})

export default function (req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")

  const data = JSON.parse(req.body)
  const currentYear = new Date().getFullYear().toString()
  return client
    .query(
      q.Select(
        ["data", "member"],
        q.Get(q.Match(q.Index("passwords_by_year_and_code"), [currentYear, data])),
      ),
    )
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(error))
}
