import prisma from "lib/glue/prisma"

const crudEndpoints = {
  "entry-logs": { model: prisma.entryLog },
  gratitudes: { model: prisma.gratitude },
}

export default crudEndpoints
