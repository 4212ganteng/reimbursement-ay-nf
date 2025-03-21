import type { Reimbursement as PrismaReimbursement, User } from '@prisma/client'
import * as XLSX from 'xlsx'

interface Reimbursement extends PrismaReimbursement {
  user?: Pick<User, 'fullName'> // Hanya mengambil fullName dari user
}

export const ExportToExcel = (reimbusData: Reimbursement[]) => {
  console.log(`ada data nya coy ${reimbusData}`)

  if (!reimbusData || reimbusData.length === 0) {
    console.warn('Data reimbursement kosong, tidak ada yang diekspor.')

    return
  }

  const formatedData = reimbusData?.map(item => ({
    Reimbust: item.description,
    Price: item.price,
    user: item.user?.fullName,
    status: item.status,
    date: item.date
  }))

  const ws = XLSX.utils.json_to_sheet(formatedData)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, 'Reimbursement.xlsx')
}
