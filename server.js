const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle code generation
app.post('/generate-pairing-code', (req, res) => {
    const { phoneNumber } = req.body;

    // Run the Python script
    exec(`python3 generate_code.py ${phoneNumber}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: 'Error generating pairing code' });
            return;
        }
        res.status(200).json({ pairingCode: stdout.trim() });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
