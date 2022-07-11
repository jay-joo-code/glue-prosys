import prisma from "lib/glue/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = qs.parse(req?.url?.split("?")[1])

  if (!req?.query?.id) {
    res.status(401).send({ message: "Invalid request: No id specified" })
    return
  }

  switch (req.method) {
    case "GET": {
      query?.date
      // get all this week's entry logs
      const entryLogs = await prisma.entryLog.findMany({})

      /*
// sum up the hours by categories
{
  social: 4,
  webdev: 2
}

// reformat into a sorted array
[
  {
    category: 'social',
    hours: 6
  },
]
*/

      res.json({})
      break
    }

    default:
      break
  }
  return res.end()
}
