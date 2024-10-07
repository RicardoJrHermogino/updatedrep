// src/pages/api/tasks.js
import openDb from '../../lib/db'; // Assuming you have your db connection set up in lib/db.js

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { userId, taskID, task, date, time, location, lat, lon, weatherRestrictions, details, requiredTemperature, idealHumidity } = req.body;

    try {
      await db.run('INSERT INTO tasks (userId, taskID, task, date, time, location, lat, lon, weatherRestrictions, details, requiredTemperature, idealHumidity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [userId, taskID, task, date, time, location, lat, lon, JSON.stringify(weatherRestrictions), details, JSON.stringify(requiredTemperature), JSON.stringify(idealHumidity)]);
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: 'Failed to create task' }); 
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
