const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const winston = require('winston'); // Logging library

const app = express();
app.use(express.json());
app.use(helmet());

const logger = winston.createLogger({
    // Winston configuration
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

const THORSWAP_API_URL = 'https://api.thorswap.com';

app.post('/swap', 
    body('fromChain').isString(),
    body('toChain').isString(),
    body('amount').isNumeric(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation error', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        const swapDetails = req.body;

        try {
            const response = await axios.post(`${THORSWAP_API_URL}/swap`, swapDetails);
            res.json({ success: true, txHash: response.data.txHash });
        } catch (error) {
            logger.error('ThorSwap API error', error);
            res.status(500).send('Error occurred during the swap');
        }
    }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
