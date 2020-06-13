

Platform Messenger
Pendahuluan
Memulai
Penyiapan Webhook
Penyiapan Aplikasi
Panduan Memulai
Kit Desain Platform
Bot Sampel
Pengiriman Pesan
Webhook
Webview
Penemuan & Interaksi Kembali
ID & Profil
Pemrosesan Bahasa Alami (Natural Language Processing)
Analytics & Feedback
Ajukan Bot Anda!
Pedoman Kebijakan & Penggunaan
Referensi
Sumber Daya Bermanfaat
PERTANYAAN UMUM
Catatan Perubahan
Di Halaman Ini
Menyiapkan Webhook Anda
Webhook Anda adalah inti dari pengalaman Messenger Anda. Di sinilah kode Anda berada, dan di sinilah Anda akan menerima, memproses, dan mengirimkan pesan.

Di dalam panduan ini, Anda akan mempelajari cara menyiapkan webhook sederhana yang mendukung langkah-langkah verifikasi webhook yang diwajibkan Platform Messenger, serta cara menerima peristiwa webhook.

Untuk informasi selengkapnya tentang persyaratan dan peristiwa webhook, lihat Webhook.

Persyaratan
Agar dapat mengikuti panduan penyiapan webhook Anda, Anda hanya perlu memiliki komputer yang menginstal Node.js.

Untuk menjalankan webhook yang dapat menerima peristiwa webhook dari Platform Messenger, kode Anda harus di-hosting di server HTTPS publik yang memenuhi persyaratan berikut:

Dukungan HTTPS, Sertifikat yang ditandatangani sendiri tidak didukung
Sertifikat SSL yang valid
Port terbuka yang menerima permintaan GET dan POST
Langkah-langkah Penyiapan
Platform Messenger Bersifat Agnostik Bahasa
Untuk mengikuti panduan ini, Anda perlu menginstal Node.js, tetapi Anda dapat menulis webhook Anda dalam bahasa server yang paling Anda sukai.

Sebelum Anda memulai, pastikan server Anda memenuhi semua persyaratan yang tercantum di atas.

1Buat proyek Node.js baru
Jalankan yang berikut ini di baris perintah untuk membuat file dan dependensi yang diperlukan:
mkdir messenger-webhook // Creates a project directory cd messenger-webhook // Navigates to the new directory touch index.js // Creates empty index.js file. npm init // Creates package.json. Accept default for all questions. npm install express body-parser --save // Installs the express.js http server framework module, // and then adds them to the dependencies section of package.json file.
Jika semua berjalan lancar, maka direktori messenger-webhook Anda akan terlihat seperti ini:
index.js node_modules package.json
2Buat server HTTP
Tambahkan kode berikut ke index.js:
'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
