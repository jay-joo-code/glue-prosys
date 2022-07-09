import { EntryLog } from "@prisma/client"

export const getEntryLogString = (entryLog: EntryLog) => {
  const endTimeString = entryLog?.endTime ? `-${entryLog?.endTime}` : ""
  const categoryString = entryLog?.category ? ` ${entryLog?.category}` : ""
  const descString = entryLog?.desc ? ` (${entryLog?.desc})` : ""
  return `${entryLog?.startTime}${endTimeString}${categoryString}${descString}`
}

export const parseEntryLogString = (entryLogString: string) => {
  const [startTime, afterStartTime] = entryLogString?.split("-")
  const [endTime, ...afterEndTimeSubstrings] = afterStartTime
    ? afterStartTime?.split(" ")
    : ["", ""]
  const afterEndTime = afterEndTimeSubstrings?.join(" ")
  const [category, afterCategory] = afterEndTime
    ? afterEndTime?.split("(")
    : ["", ""]
  const [desc] = afterCategory ? afterCategory?.split(")") : [""]

  return {
    startTime,
    endTime,
    category: category?.trim(),
    desc: desc?.trim(),
  }
}
