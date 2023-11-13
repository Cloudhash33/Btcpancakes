const express = require('express');
const thorswapRoutes = require('./routes/thorswap');
const pancakeswapRoutes = require('./routes/pancakeswap');

const app = express();
app.use(express.json());

app.use('/thorswap', thorswapRoutes);
app.use('/pancakeswap', pancakeswapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
