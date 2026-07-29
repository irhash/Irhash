export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  readMinutes: number;
  publishedAt: string; // ISO
  cover: string; // absolute URL
  excerpt: string;
  // Simple content blocks
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string }
  >;
};

const IMG = {
  kanopi:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70",
  material:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=70",
  hitung:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=70",
  renovasi:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=70",
  kaca: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=70",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jenis-kanopi-terbaik-rumah-modern-2026",
    title: "7 Jenis Kanopi Terbaik untuk Rumah Modern 2026",
    description:
      "Panduan lengkap jenis kanopi terbaik 2026 — Alderon, Spandek, Polycarbonate, Kaca Tempered, Solarflat & Twinlite. Lengkap kelebihan, kekurangan, dan harga per meter.",
    keywords:
      "jenis kanopi, kanopi terbaik, kanopi rumah modern, kanopi alderon, kanopi kaca, harga kanopi 2026",
    category: "Kanopi",
    readMinutes: 7,
    publishedAt: "2026-06-10",
    cover: IMG.kanopi,
    excerpt:
      "Bingung pilih kanopi untuk rumah? Berikut 7 jenis kanopi paling populer di 2026 lengkap dengan pertimbangan budget dan estetika.",
    content: [
      {
        type: "p",
        text: "Memilih jenis kanopi yang tepat akan sangat memengaruhi kenyamanan, estetika, hingga nilai jual rumah Anda. Berikut 7 jenis kanopi terbaik yang banyak dipilih pemilik rumah modern di Indonesia sepanjang 2026.",
      },
      { type: "h2", text: "1. Kanopi Alderon Double Layer" },
      {
        type: "p",
        text: "Alderon menjadi favorit karena kemampuan meredam panas dan suara hujan yang jauh lebih baik dibanding spandek biasa. Cocok untuk carport dan teras rumah minimalis.",
      },
      { type: "h2", text: "2. Kanopi Spandek Pasir" },
      {
        type: "p",
        text: "Opsi paling ekonomis. Ringan, kuat, dan pemasangan cepat. Ideal untuk area servis atau budget terbatas mulai Rp 500.000/m².",
      },
      { type: "h2", text: "3. Kanopi Kaca Tempered 8mm" },
      {
        type: "p",
        text: "Memberi kesan mewah dan modern. Cahaya matahari masuk maksimal, cocok untuk area taman kering atau minimalis Jepang.",
      },
      { type: "h2", text: "4. Kanopi Polycarbonate / Twinlite" },
      {
        type: "p",
        text: "Tembus cahaya, ringan, dan tahan UV. Twinlite Grecca versi double layer memberi perlindungan panas lebih baik.",
      },
      { type: "h2", text: "5. Kanopi Solarflat Lengkung" },
      {
        type: "p",
        text: "Kombinasi estetika lengkung dan atap solarflat 3mm transparan. Populer untuk cafe dan rumah minimalis premium.",
      },
      { type: "h2", text: "6. Kanopi Cordoba + ACP" },
      {
        type: "p",
        text: "Rangka cordoba yang kokoh dilengkapi plafon ACP putih memberi kesan bersih dan mewah dari sisi bawah kanopi.",
      },
      { type: "h2", text: "7. Skylight Sliding" },
      {
        type: "p",
        text: "Atap buka-tutup dengan katrol / motor otomatis. Cocok untuk taman dalam rumah agar tetap dapat sirkulasi udara.",
      },
      { type: "h2", text: "Tips Memilih Kanopi" },
      {
        type: "ul",
        items: [
          "Tentukan fungsi utama: carport, teras, taman, atau area jemur.",
          "Sesuaikan material dengan iklim & arah matahari.",
          "Pastikan rangka hollow galvanis minimal 40×60 mm.",
          "Selalu minta RAB tertulis + garansi pengerjaan.",
        ],
      },
    ],
  },
  {
    slug: "alderon-vs-polycarbonate-vs-spandek",
    title: "Alderon vs Polycarbonate vs Spandek: Mana yang Terbaik?",
    description:
      "Perbandingan lengkap Alderon, Polycarbonate, dan Spandek dari sisi harga, ketahanan, peredam panas & suara. Panduan memilih atap kanopi terbaik untuk rumah Anda.",
    keywords:
      "alderon vs polycarbonate, alderon vs spandek, atap kanopi terbaik, perbandingan atap kanopi",
    category: "Perbandingan Material",
    readMinutes: 6,
    publishedAt: "2026-06-18",
    cover: IMG.material,
    excerpt:
      "Sedang bingung memilih antara Alderon, Polycarbonate, atau Spandek untuk kanopi rumah? Ini perbandingan detailnya.",
    content: [
      {
        type: "p",
        text: "Tiga material atap kanopi paling umum di Indonesia adalah Alderon, Polycarbonate (termasuk Twinlite), dan Spandek. Masing-masing punya karakter berbeda.",
      },
      { type: "h2", text: "1. Spandek Pasir" },
      {
        type: "ul",
        items: [
          "Harga: paling murah, mulai Rp 500.000/m² terpasang.",
          "Kelebihan: ringan, cepat pasang, kuat menahan hujan.",
          "Kekurangan: berisik saat hujan, panas menyerap ke dalam rumah.",
        ],
      },
      { type: "h2", text: "2. Polycarbonate / Twinlite" },
      {
        type: "ul",
        items: [
          "Harga: mulai Rp 1.200.000/m² (Twinlite Grecca double).",
          "Kelebihan: tembus cahaya, ringan, tahan UV.",
          "Kekurangan: rentan kusam & jamur setelah 3–5 tahun tanpa perawatan.",
        ],
      },
      { type: "h2", text: "3. Alderon" },
      {
        type: "ul",
        items: [
          "Harga: Single mulai Rp 600.000, Double Rp 750.000/m².",
          "Kelebihan: peredam panas & suara terbaik di kelasnya, garansi panjang.",
          "Kekurangan: tidak tembus cahaya (kecuali versi transparan).",
        ],
      },
      { type: "h2", text: "Rekomendasi Living Space Pro" },
      {
        type: "p",
        text: "Untuk carport & teras rumah modern, kami merekomendasikan Alderon Double Layer karena kenyamanan jangka panjangnya. Untuk taman kering atau area yang butuh cahaya, gunakan Polycarbonate Twinlite atau Kaca Tempered.",
      },
    ],
  },
  {
    slug: "cara-menghitung-biaya-kanopi-per-meter",
    title: "Cara Menghitung Biaya Pembuatan Kanopi Per Meter (2026)",
    description:
      "Rumus praktis menghitung biaya kanopi per meter: luas × harga material + hollow. Contoh perhitungan carport 4×3 meter Alderon lengkap dengan RAB.",
    keywords: "biaya kanopi per meter, cara hitung kanopi, harga kanopi 2026, rab kanopi",
    category: "Tips & Harga",
    readMinutes: 5,
    publishedAt: "2026-06-25",
    cover: IMG.hitung,
    excerpt:
      "Panduan sederhana menghitung sendiri estimasi biaya kanopi rumah Anda sebelum survei kontraktor.",
    content: [
      { type: "h2", text: "Rumus Dasar" },
      {
        type: "quote",
        text: "Total Biaya = Panjang × Lebar × Harga Material per m²",
      },
      {
        type: "p",
        text: "Harga per meter sudah mencakup rangka hollow galvanis, atap, talang, dan pengerjaan. Berikut acuan harga katalog Living Space Pro 2026:",
      },
      {
        type: "ul",
        items: [
          "Spandek Pasir — Rp 500.000/m²",
          "Alderon Single Layer — Rp 600.000/m²",
          "Alderon Double Layer — Rp 750.000/m²",
          "Cordoba + Alderon Double — Rp 850.000/m²",
          "Polycarbonate Twinlite Grecca — Rp 1.200.000/m²",
          "Kaca Tempered 8mm — Rp 1.500.000/m²",
        ],
      },
      { type: "h2", text: "Contoh: Carport 4×3 meter" },
      {
        type: "p",
        text: "Luas = 4 × 3 = 12 m². Menggunakan Alderon Double Layer: 12 × Rp 750.000 = Rp 9.000.000. Sudah termasuk hollow 40×60, subframe, profile 40×40, talang, dan pipa besi 2 inch.",
      },
      { type: "h2", text: "Faktor yang Bisa Menambah Biaya" },
      {
        type: "ul",
        items: [
          "Bentuk lengkung atau tiang tambahan (100×100).",
          "Plafon ACP / PVC / kisi WPC.",
          "Ketinggian di atas standar (mengubah kebutuhan tiang IWF).",
          "Aksesori sliding katrol / motor otomatis.",
        ],
      },
      {
        type: "p",
        text: "Gunakan AI Kalkulator Kanopi kami untuk mendapatkan estimasi otomatis + saran material sesuai budget Anda.",
      },
    ],
  },
  {
    slug: "tips-renovasi-rumah-minimalis-hemat-biaya",
    title: "10 Tips Renovasi Rumah Minimalis Agar Hemat Biaya",
    description:
      "Panduan renovasi rumah minimalis hemat biaya: dari perencanaan RAB, prioritas pekerjaan, pemilihan material lokal, hingga waktu terbaik memulai renovasi.",
    keywords: "renovasi rumah, renovasi minimalis, tips hemat renovasi, biaya renovasi rumah",
    category: "Renovasi",
    readMinutes: 6,
    publishedAt: "2026-07-02",
    cover: IMG.renovasi,
    excerpt:
      "Renovasi rumah tak harus menguras tabungan. Simak 10 tips praktis agar rumah baru Anda tetap kece dan sesuai budget.",
    content: [
      { type: "h2", text: "1. Buat RAB Detail Sebelum Mulai" },
      {
        type: "p",
        text: "RAB tertulis mencegah biaya membengkak. Pisahkan pos material, upah tukang, dan biaya tak terduga (idealnya 10% cadangan).",
      },
      { type: "h2", text: "2. Prioritaskan Struktur & Kebocoran" },
      {
        type: "p",
        text: "Perbaiki dulu bagian yang berhubungan dengan keamanan & air: atap, kanopi, saluran, dan struktur.",
      },
      { type: "h2", text: "3. Manfaatkan Material Lokal" },
      {
        type: "p",
        text: "Batu alam lokal & kayu lokal sering 30–50% lebih murah tanpa mengorbankan estetika minimalis.",
      },
      { type: "h2", text: "4. Cat Ulang, Bukan Ganti Total" },
      {
        type: "p",
        text: "Cat warna netral (putih, off-white, greige) instant meng-upgrade tampilan tanpa renovasi berat.",
      },
      { type: "h2", text: "5. Fokus pada Fasad" },
      {
        type: "p",
        text: "Ganti kanopi, pintu, dan cat fasad memberikan dampak visual paling besar per rupiah yang dikeluarkan.",
      },
      { type: "h2", text: "6. Pilih Kontraktor Bersertifikat" },
      {
        type: "p",
        text: "Cek portofolio nyata (bukan hanya foto). Kontraktor berpengalaman justru sering lebih hemat karena minim revisi.",
      },
      { type: "h2", text: "7. Renovasi di Musim Kemarau" },
      {
        type: "p",
        text: "Pengerjaan lebih cepat, tidak terganggu hujan, dan material tidak mudah rusak.",
      },
      { type: "h2", text: "8. Gunakan Lampu LED" },
      {
        type: "p",
        text: "Investasi awal sedikit lebih mahal, tapi hemat 70% listrik jangka panjang.",
      },
      { type: "h2", text: "9. Furnitur Multifungsi" },
      {
        type: "p",
        text: "Kabinet build-in dengan storage tersembunyi mengurangi kebutuhan beli furnitur tambahan.",
      },
      { type: "h2", text: "10. Minta 2–3 Penawaran" },
      { type: "p", text: "Bandingkan detail material & garansi — bukan hanya harga terendah." },
    ],
  },
  {
    slug: "kanopi-kaca-tempered-kelebihan-kekurangan-harga",
    title: "Kanopi Kaca Tempered: Kelebihan, Kekurangan & Harga 2026",
    description:
      "Semua tentang kanopi kaca tempered 8mm: kelebihan estetika, kekurangan biaya perawatan, ketebalan yang aman, dan harga terpasang per meter 2026.",
    keywords: "kanopi kaca tempered, harga kanopi kaca, kaca tempered 8mm, kanopi kaca minimalis",
    category: "Kanopi",
    readMinutes: 5,
    publishedAt: "2026-07-10",
    cover: IMG.kaca,
    excerpt:
      "Kanopi kaca tempered memberi kesan mewah, tapi apakah cocok untuk rumah Anda? Ini analisis lengkap sebelum Anda memutuskan.",
    content: [
      { type: "h2", text: "Apa Itu Kaca Tempered?" },
      {
        type: "p",
        text: "Kaca tempered adalah kaca yang dipanaskan hingga 700°C lalu didinginkan cepat, membuatnya 4–5x lebih kuat dari kaca biasa. Bila pecah, hancur jadi butiran kecil — jauh lebih aman.",
      },
      { type: "h2", text: "Kelebihan" },
      {
        type: "ul",
        items: [
          "Estetika premium — cocok untuk rumah modern & mewah.",
          "Cahaya alami masuk maksimal, hemat listrik siang hari.",
          "Tahan benturan & suhu ekstrem.",
          "Nilai jual rumah meningkat.",
        ],
      },
      { type: "h2", text: "Kekurangan" },
      {
        type: "ul",
        items: [
          "Harga lebih tinggi: mulai Rp 1.500.000/m² terpasang.",
          "Butuh rangka lebih kokoh (hollow 50×100 atau IWF).",
          "Perlu dibersihkan rutin agar tetap bening.",
          "Panas matahari tetap terasa (perlu solar film).",
        ],
      },
      { type: "h2", text: "Ketebalan yang Direkomendasikan" },
      {
        type: "p",
        text: "Untuk kanopi rumah, 8 mm sudah cukup aman. Untuk bentang lebih dari 3 meter, pertimbangkan 10–12 mm atau kaca laminated.",
      },
      { type: "h2", text: "Cocok untuk Siapa?" },
      {
        type: "p",
        text: "Pemilik rumah yang mengutamakan estetika, punya budget di atas Rp 15 juta untuk carport ukuran standar, dan menyukai konsep minimalis modern / Jepang.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
