'use server'

import type { Reimbursement } from '@prisma/client'

import { reimbursementService } from '@/app/services/reimbursement.service'

export async function DashboarRdManager() {
  const approved = await reimbursementService.getApprovedReimbustmen()
  const pending = await reimbursementService.getPendingReimbustmen()
  const rejected = await reimbursementService.getRejectedReimbustmen()

  const totalReimbustmen = approved.length + pending.length + rejected.length

  console.log({ approved, pending, rejected, totalReimbustmen })

  // Fungsi untuk menghasilkan data series berdasarkan price
  const series = generateSeries(approved, pending, rejected)

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
    totalReimbustmen,
    series,
    seriesPerMonth
  })

  return {
    approved,
    pending,
    rejected,
    totalReimbustmen,
    series,
    seriesPerMonth
  }
}

const generateSeries = (approved: Reimbursement[], pending: Reimbursement[], rejected: Reimbursement[]) => {
  let total = 0

  // Gabungkan semua data dan urutkan berdasarkan tanggal
  const allData = [...approved, ...pending, ...rejected].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return [
    {
      data: allData.map(item => {
        total += item.price || 0 // Akumulasi total price

        return total
      })
    }
  ]
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
