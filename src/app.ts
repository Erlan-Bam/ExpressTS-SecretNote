const express = require("express");
const app = express();
import { port } from './config';
import sequelize from './database';
import { Note } from './models/noteModel'
import noteRoutes from './router/noteRouter';

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});