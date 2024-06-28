import { admin } from '../firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notificationData = req.body;

    try {
      const database = admin.database();
      const notificationsRef = database.ref('notifications');
      const newNotificationRef = notificationsRef.push();

      await newNotificationRef.set({
        ...notificationData,
        timestamp: admin.database.ServerValue.TIMESTAMP
      });

      console.log('Notification data saved successfully');
      res.status(200).json({ message: 'Notification received and saved successfully' });
    } catch (error) {
      console.error('Error saving notification data:', error);
      res.status(500).json({ error: 'Failed to save notification data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
