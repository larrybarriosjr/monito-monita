import type { VercelRequest, VercelResponse } from "@vercel/node"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_ADMIN_KEY || "",
})

export default function (req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")

  const { name, wishlist } = JSON.parse(req.body)
  const currentYear = new Date().getFullYear().toString()
  return client
    .query(
      q.Select(
        ["data", "wishlist"],
        q.Update(
          q.Select(["ref"], q.Get(q.Match(q.Index("wishlists_by_year_and_member"), [currentYear, name]))),
          { data: { wishlist } },
        ),
      ),
    )
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(error))
}
