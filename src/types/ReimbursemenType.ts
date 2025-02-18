export type StatusReimbus = 'PENDING' | 'APPROVED' | 'REJECTED' // Sesuaikan jika ada status lain

export type User = {
  fullName: string
  role: string
  contact: number
}

export type ReimbursmentResponType = {
  id: string
  slug: number
  title: string | null
  description: string
  notes: string | null
  price: number
  invoiceImage: string
  status: StatusReimbus
  date: string // Bisa diubah ke Date jika ingin parsing otomatis
  userId: string
  createdAt: Date
  updatedAt: Date
  user: User
}
