<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Pairing Code Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input[type="text"], button {
            padding: 10px;
            font-size: 16px;
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            background-color: #25D366;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #128C7E;
        }
        .result {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WhatsApp Pairing Code Generator</h1>
        <p>Enter your phone number and click "Generate Code" to get a pairing code.</p>
        
        <form id="pairingForm">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" required>
            
            <button type="button" onclick="generatePairingCode()">Generate Code</button>
        </form>
        
        <div id="result" class="result"></div>
    </div>

    <script>
        async function generatePairingCode() {
            const phoneNumber = document.getElementById('phoneNumber').value;

            try {
                const response = await fetch('/generate-pairing-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ phoneNumber })
                });

                if (response.ok) {
                    const data = await response.json();
                    const pairingCode = data.pairingCode;
                    const link = `https://wa.me/${phoneNumber}?text=Your%20pairing%20code%20is%20${pairingCode}`;
                    document.getElementById('result').innerHTML = `
                        <h2>Generated Pairing Code</h2>
                        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                        <p><strong>Pairing Code:</strong> ${pairingCode}</p>
                        <a href="${link}" target="_blank">Open WhatsApp with Pairing Code</a>
                    `;
                } else {
                    document.getElementById('result').innerHTML = 'Error generating pairing code';
                }
            } catch (error) {
                document.getElementById('result').innerHTML = 'Error generating pairing code';
            }
        }
    </script>
</body>
</html>
