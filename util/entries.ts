import { EntryLog } from "@prisma/client"
import { getMonday } from "./glue/dates"
import dateAndTime from "date-and-time"

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

export const getDateString = (date: Date) => {
  return dateAndTime.format(date, "YYYY-MM-DD")
}

export const getWeekDateStrings = (date: Date) => {
  const monday = getMonday(date)
  const res = [getDateString(monday)]

  for (let increment = 1; increment < 7; increment++) {
    const newDate = new Date()
    newDate.setDate(monday.getDate() + increment)
    res.push(getDateString(newDate))
  }

  return res
}

export function timeDiff(time1, time2) {
  var hour1 = time1.substring(0, 2)
  var hour2 = time2.substring(0, 2)
  var min1 = time1.substring(2, 4)
  var min2 = time2.substring(2, 4)

  var diff_hour = hour2 - hour1
  var diff_min = min2 - min1
  if (diff_hour < 0) {
    diff_hour += 24
  }
  if (diff_min < 0) {
    diff_min += 60
    diff_hour--
  } else if (diff_min >= 60) {
    diff_min -= 60
    diff_hour++
  }
  return [diff_hour, diff_min]
}
