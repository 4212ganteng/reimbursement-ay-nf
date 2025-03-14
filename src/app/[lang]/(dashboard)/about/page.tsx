export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About ReimTrack</h1>
        <p className="text-gray-600">
          ReimTrack adalah sistem manajemen reimbursement berbasis web yang dirancang untuk mempermudah pengelolaan dan
          pencatatan klaim secara efisien.
        </p>
        <p className="mt-4 text-gray-500">
          Dibuat dengan ❤ oleh{" "}
          <span className="text-blue-600 font-semibold">Ayu Nur Fadillah - Project Skripsi</span> - 2025.
        </p>
        <p className="mt-4">
          Kunjungi:
          <a href="https://msha.ke/cetrofarm/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
            Landing Page Cetrofarm
          </a> |
          <a href="https://www.instagram.com/cetrofarm.id/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
            Instagram Cetrofarm
          </a>
        </p>
      </div>

    </div>

  )
}
