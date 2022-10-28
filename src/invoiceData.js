import DateRange from './DateRange'
import _logo from './logo.svg'
import React from 'react'
import { getEndDate, getInvoiceNumber, getStartDate } from './utils'
import format from 'string-template'
import config from './config'

export const companyLogo = _logo
export const invoicedCompanyName = config.invoicedCompanyName
export const myCompanyName = config.myCompanyName
export const firstInvoiceDate = config.firstInvoiceDate
export const invoiceDate = config.invoiceDate || new Date()
export const invoiceWeeksInterval = parseInt(config.invoiceWeeksInterval, 10)
export const endDate = getEndDate({
  firstInvoiceDate,
  invoiceDate,
  invoiceWeeksInterval,
})
export const startDate = getStartDate({ invoiceWeeksInterval, endDate })
export const invoiceNumber = config.invoiceNumber || getInvoiceNumber({
  endDate,
  firstInvoiceDate,
  invoiceWeeksInterval,
})
export const invoicedCompanyExtraInfo = config.invoicedCompanyExtraInfo
export const myCompanyExtraInfo = config.myCompanyExtraInfo
export const paymentInfo = Object
  .entries(config.paymentInfo)
  .map(([label, value]) => {
    return { label, value }
  })

export const items = config.paymentItems.map((it, i) => {
  return {
    ...it,
    total: it.unitPrice * it.businessDays * 8 * it.quantity - (10 - invoiceNumber % 10)/100,
    title: format(it.title,
      { invoiceRange: DateRange({ startDate, endDate }) }),
  }
})
