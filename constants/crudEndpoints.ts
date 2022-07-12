import prisma from "lib/glue/prisma"

const crudEndpoints = {
  "entry-logs": { model: prisma.entryLog },
  gratitudes: { model: prisma.gratitude },
  thoughts: { model: prisma.thought },
}

export default crudEndpoints
