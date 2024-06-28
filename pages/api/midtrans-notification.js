// pages/api/midtrans-notification.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // Ambil data notifikasi dari body request
      const notificationData = req.body;
  
      // Menyimpan atau memproses data notifikasi sesuai kebutuhan
      console.log('Received notification:', notificationData);
  
      // Kirim respons HTTP 200 untuk konfirmasi penerimaan notifikasi
      res.status(200).json({ message: 'Notification received successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  