# mesenjer-webhook
Mesenjer
![imag](https://github.com/SubAgen-Workplace-App/mesenjer-webhook/blob/master/Screenshot_2020-06-14-03-30-09.jpg)

----

[Contribution guidelines for this project](https://github.com/SubAgen-Workplace-App/mesenjer-webhook/blob/master/Index.js)

----



>Platform Messenger
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
Kode ini membuat server HTTP yang menampung permintaan di port default, maupun di port 1337 apabila tidak ada port default. Di panduan ini, kami menggunakan Express, sebuah a framework HTTP yang populer dan ringan, tetapi Anda dapat menggunakan framework apa pun yang Anda sukai untuk membuat webhook Anda.

3Tambahkan endpoint webhook Anda
Tambahkan kode berikut ke index.js:
// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
  let body = req.body;
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

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
'use strict';// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
Kode ini membuat server HTTP yang menampung permintaan di port default, maupun di port 1337 apabila tidak ada port default. Di panduan ini, kami menggunakan Express, sebuah a framework HTTP yang populer dan ringan, tetapi Anda dapat menggunakan framework apa pun yang Anda sukai untuk membuat webhook Anda.
3Tambahkan endpoint webhook Anda
Tambahkan kode berikut ke index.js:
// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {// Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {// Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event); }); // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED'); } else {// Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }});Kode ini membuat endpoint /webhook yang menerima permintaan POST, memastikan bahwa permintaan tersebut merupakan peristiwa webhook, lalu memasukkan pesannya. Endpoint ini adalah tempat Platform Messenger mengirimkan semua peristiwa webhook.

Perhatikan bahwa endpoint ini menghasilkan tanggapan 200OK, yang memberi tahu Platform Messenger bahwa peristiwa telah diterima dan tidak perlu dikirimkan ulang. Biasanya Anda tidak akan mengirimkan tanggapan ini hingga Anda telah selesai memproses peristiwa.

4Tambahkan verifikasi webhook
Tambahkan kode berikut ke index.js:// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {// Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>" // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];// Checks if a token and mode is in the query string of the request
  if (mode && token) {// Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
 // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);messenger-webhook
