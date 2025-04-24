import { addDays, addWeeks, differenceInWeeks, isFirstDayOfMonth, setDate, lastDayOfMonth } from 'date-fns'

export function getEndDateOld({ firstInvoiceDate, invoiceDate, invoiceWeeksInterval }) {
  return addWeeks(firstInvoiceDate, Math.round(differenceInWeeks(invoiceDate, firstInvoiceDate) / invoiceWeeksInterval) * invoiceWeeksInterval)
}

export function getEndDate({ startDate }) {
  if (isFirstDayOfMonth(startDate))
    return setDate(startDate, 15)
  else 
    return lastDayOfMonth(startDate)
}

export function getStartDate({ invoiceWeeksInterval, endDate }) {
  return addDays(endDate, -(invoiceWeeksInterval * 7 - 1))
}

export function getInvoiceNumber({ endDate, firstInvoiceDate, invoiceWeeksInterval }) {
  return differenceInWeeks(endDate, firstInvoiceDate) / invoiceWeeksInterval + 1
}