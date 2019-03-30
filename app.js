const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');

app.use(express.json);
app.use(express.urlencoded({extended:false}));

app.use('/api',userRouter);

app.listen(8080);