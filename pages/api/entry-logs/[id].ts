import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "lib/glue/prisma"
import { withSentry } from "@sentry/nextjs"

// TODO: abstract out common handlers
// should be done after creating multiple real applications though
// not possible to predict all use cases
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).send({ message: "Unauthorized" })
    return
  }

  if (!req?.query?.id) {
    res.status(401).send({ message: "Invalid request: No id specified" })
    return
  }

  switch (req.method) {
    // case "GET": {
    //   const result = await prisma.entryLog.findMany({
    //     where: { dateString: req?.query?.dateString as string },
    //   })
    //   res.json(result)
    //   break
    // }

    case "PUT": {
      console.log("REQUEST ")
      const userData = session
        ? {
            user: { connect: { email: session?.user?.email } },
          }
        : {}

      const data = { ...req?.body, isValidated: !!session, ...userData }
      delete data.id
      delete data.createdAt
      delete data.updatedAt
      delete data.userId

      const result = await prisma.entryLog.update({
        where: { id: Number(req?.query?.id) },
        data,
      })

      res.json(result)
      break
    }

    // case "DELETE": {
    //   const result = await prisma.task.delete({
    //     where: { id: Number(req?.query?.id) },
    //   })
    //   res.json(result)
    //   break
    // }

    default:
      res.status(500).send("Invalid http method")
      break
  }
  return res.end()
}

export default withSentry(handle)
