'use server'

import type { Reimbursement } from '@prisma/client'

import { reimbursementService } from '@/app/services/reimbursement.service'
import { UserService } from '@/app/services/user.service'

export async function DashboarRdManager() {
  const approved = await reimbursementService.getApprovedReimbustmen()
  const pending = await reimbursementService.getPendingReimbustmen()
  const rejected = await reimbursementService.getRejectedReimbustmen()
  const users = await UserService.getAllUsers()

  // count by status
  const countPending = pending.length
  const countRejected = rejected.length
  const countApproved = approved.length
  const countAllReimbustmen = approved.length + pending.length + rejected.length

  // total price
  const totPricePending = calculateTotPrice(pending)
  const totPriceRejected = calculateTotPrice(rejected)
  const totPriceApproved = calculateTotPrice(approved)
  const totPriceAll = totPricePending + totPriceRejected + totPriceApproved

  // percent
  const pendingPercent = (countPending / countAllReimbustmen) * 100
  const approvedPercent = (countApproved / countAllReimbustmen) * 100
  const rejectedPercent = (countRejected / countAllReimbustmen) * 100

  // Fungsi untuk menghasilkan data series berdasarkan price
  const seriesLine = [{ data: [countPending, countRejected, countApproved, countAllReimbustmen] }]

  // Hitung total approved & rejected per bulan
  const approvedData = groupByMonth(approved)
  const rejectedData = groupByMonth(rejected)

  // Data akhir dalam format yang diminta
  const seriesPerMonth = [
    { name: 'Approved', data: approvedData },
    { name: 'Rejected', data: rejectedData }
  ]

  console.log({
    approved,
    pending,
    rejected,
    countAllReimbustmen,
    seriesLine,
    seriesPerMonth,
    totUser: users.length,
    pendingPercent,
    approvedPercent,
    rejectedPercent,
    countPending,
    countRejected,
    countApproved,
    totPricePending,
    totPriceRejected,
    totPriceApproved
  })

  return {
    approved,
    pending,
    rejected,
    countAllReimbustmen,
    seriesLine,
    seriesPerMonth,
    totUser: users.length,
    pendingPercent,
    approvedPercent,
    rejectedPercent,
    countPending,
    countRejected,
    countApproved,
    totPricePending,
    totPriceRejected,
    totPriceApproved,
    totPriceAll
  }
}

// Fungsi untuk mengelompokkan data berdasarkan bulan
const groupByMonth = (data: Reimbursement[]): number[] => {
  const result: number[] = Array(12).fill(0) // Inisialisasi array 12 bulan dengan 0

  data.forEach(item => {
    const monthIndex = new Date(item.date).getMonth() // Ambil bulan (0 = Jan, 11 = Dec)

    result[monthIndex] += item.price || 0 // Tambahkan total price
  })

  return result
}

const calculateTotPrice = (dataWithStatus: any[]): number => {
  return dataWithStatus.reduce((acc: number, item: { price: number }) => acc + item.price, 0)
}
