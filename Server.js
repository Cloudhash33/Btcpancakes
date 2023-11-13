const express = require('express');
const app = express();
const thorswapRoute = require('./routes/thorswap');
const pancakeswapRoute = require('./routes/pancakeswap');

app.use(express.json());
app.use('/thorswap', thorswapRoute);
app.use('/pancakeswap', pancakeswapRoute);

// ... rest of your server setup
