const express = require('express');
const cors = require('cors');
require('dotenv').config();

const opportunityRoutes = require('./routes/opportunities');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Research Opportunity Portal API is running 🚀' });
});

app.use('/api/opportunities', opportunityRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});