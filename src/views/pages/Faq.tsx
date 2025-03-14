'use client'

const Faq = () => {
  function toggleAnswer(id: string) {
    const answer = document.getElementById(id);

    if (answer) {
      answer.classList.toggle("hidden");
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions (FAQ)</h2>

      {[
        { id: "faq1", question: "Bagaimana proses pengajuan reimbursement di ReimTrack?", answer: "Pengajuan reimbursement dilakukan secara online melalui sistem. Karyawan mengisi formulir klaim, mengunggah bukti pengeluaran, dan sistem akan meneruskan klaim ke bagian keuangan untuk verifikasi dan persetujuan." },
        { id: "faq2", question: "Bagaimana cara melacak status klaim reimbursement?", answer: "Setelah mengajukan klaim, pengguna dapat melacak statusnya melalui dashboard ReimTrack. Sistem akan menampilkan status klaim apakah masih dalam proses, telah disetujui, atau ditolak." },
        { id: "faq3", question: "Apa keuntungan menggunakan sistem reimbursement berbasis web?", answer: "Keuntungan utama termasuk efisiensi proses, transparansi dalam pelacakan status klaim, mengurangi risiko kehilangan dokumen fisik, dan meningkatkan akurasi data." },
        { id: "faq4", question: "Apakah sistem ini mendukung unggah bukti digital?", answer: "Ya, ReimTrack memungkinkan karyawan untuk mengunggah bukti pengeluaran dalam bentuk digital seperti foto nota atau faktur untuk mempermudah verifikasi klaim." },
        { id: "faq5", question: "Bagaimana sistem ini membantu meningkatkan transparansi dalam reimbursement?", answer: "ReimTrack menyediakan fitur notifikasi otomatis dan laporan real-time yang memungkinkan karyawan untuk mengetahui perkembangan klaim mereka tanpa harus menanyakan langsung ke bagian keuangan." }
      ].map((item) => (
        <div key={item.id} className="mb-4 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 cursor-pointer" onClick={() => toggleAnswer(item.id)}>
            {item.question}
          </h3>
          <p id={item.id} className="text-gray-600 hidden">{item.answer}</p>
        </div>
      ))}
    </div>



  )
}

export default Faq
