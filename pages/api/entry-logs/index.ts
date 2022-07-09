import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/glue/prisma"
import { getSession } from "next-auth/react"
import { withSentry } from "@sentry/nextjs"

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).send({ message: "Unauthorized" })
    return
  }

  switch (req.method) {
    case "GET":
      const tasks = await prisma.task.findMany({
        where: {
          isValidated: true,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: Number(req?.query?.page) * Number(req?.query?.limit),
        take: Number(req?.query?.limit),
      })
      res.send(tasks)
      break

    case "POST":
      const data = session
        ? {
            user: { connect: { email: session?.user?.email } },
          }
        : {}

      const entryLog = await prisma.entryLog.create({
        data,
      })

      res.send(entryLog)
      break

    default:
      res.status(500).send("Invalid http method")
      break
  }
  return res.end()
}

export default withSentry(handle)
