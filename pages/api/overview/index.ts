import prisma from "lib/glue/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"
import { getWeekDateStrings, timeDiff } from "util/entries"
import { getMonday, getSunday } from "util/glue/dates"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = qs.parse(req?.url?.split("?")[1])

  switch (req.method) {
    case "GET": {
      const date = new Date(query?.date as string)
      const dateStrings = getWeekDateStrings(date)

      const entryLogs = await prisma.entryLog.findMany({
        where: {
          dateString: { in: dateStrings },
        },
      })

      const counter = {}

      entryLogs?.map((entryLog) => {
        const diff = timeDiff(entryLog?.startTime, entryLog?.endTime)
        const category = entryLog?.category?.toLowerCase()?.trim()

        if (category?.length > 0) {
          if (!(category in counter)) {
            counter[category] = diff
          } else {
            const carryOver = Math.floor((counter[category][1] + diff[1]) / 60)
            const mins = (counter[category][1] + diff[1]) % 60
            counter[category] = [
              counter[category][0] + diff[0] + carryOver,
              mins,
            ]
          }
        }
      })

      const entryLogOverview = Object.entries(counter)
        .sort((a, b) => {
          if (b[1][0] === a[1][0]) {
            // if hours the same, sort by minutes
            return b[1][1] - a[1][1]
          }

          return b[1][0] - a[1][0]
        })
        .reduce((acc, [key, val]) => {
          const data = {
            category: key,
            hours: `${val[0]}${val[1] === 0 ? "" : ".5"}`,
          }
          acc.push(data)
          return acc
        }, [])

      res.json({ entryLogOverview })
      break
    }

    default:
      break
  }
  return res.end()
}
