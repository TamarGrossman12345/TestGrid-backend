import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// טעינת משתני סביבה מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר לפרונטנד שלך (שיושב על פורט אחר) לדבר עם השרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body של בקשות POST

// נתיב בדיקה בסיסי (Route)
app.get('/', (req: Request, res: Response) => {
  res.send('TestGrid API is running successfully! 🚀');
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});