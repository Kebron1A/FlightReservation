const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dao = require('./DAO');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/flights', async (req, res) => {
    try {
        const flights = await dao.query('SELECT * FROM flights');
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/book-flight', async (req, res) => {
    const { fromLocation, toLocation, fromState, toState, preferredDays, price } = req.body;

    try {
        const result = await dao.query(
            'INSERT INTO bookings (from_location, to_location, from_state, to_state, preferred_days, price) VALUES (?, ?, ?, ?, ?, ?)',
            [fromLocation, toLocation, fromState, toState, preferredDays, price]
        );

        res.status(201).json({ message: 'Flight booked successfully!', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

