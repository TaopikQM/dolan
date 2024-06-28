import { admin } from '../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notificationData = req.body;

    try {
      const database = admin.database();
      const notificationsRef = database.ref('notifications');

      // Gunakan order_id sebagai kunci data
      const orderId = notificationData.order_id;
      const notificationRef = notificationsRef.child(orderId);

      // Cek apakah data sudah ada
      const snapshot = await notificationRef.once('value');
      if (snapshot.exists()) {
        // Jika data sudah ada, lakukan update
        await notificationRef.update({
          ...notificationData,
          timestamp: admin.database.ServerValue.TIMESTAMP
        });
        console.log(`Notification data for order_id ${orderId} updated successfully`);
      } else {
        // Jika data belum ada, buat data baru
        await notificationRef.set({
          ...notificationData,
          timestamp: admin.database.ServerValue.TIMESTAMP
        });
        console.log(`Notification data for order_id ${orderId} saved successfully`);
      }

      res.status(200).json({ message: 'Notification received and processed successfully' });
    } catch (error) {
      console.error('Error saving notification data:', error);
      res.status(500).json({ error: 'Failed to save notification data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
