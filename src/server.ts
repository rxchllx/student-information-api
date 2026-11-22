import 'dotenv/config';
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
 
const app = express();
 
// Read JSON sent by Postman
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('Student API is running. Try /students');
});
 
// Send student requests to the student router
app.use('/students', studentRoutes);
 
app.listen(3000, () => {
  console.log('Practice API: http://localhost:3000');
});