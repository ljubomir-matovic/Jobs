require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const cors = require('cors');

app.use(cors({
    origin:'*'//['http://localhost:3000']
}))
app.use(bodyParser.json());

app.disable('x-powered-by');
//routes
const authRouter = require('./routes/auth');
app.use('/api/v1/auth', authRouter);

const jobsRouter = require('./routes/jobs');
app.use('/api/v1/jobs', jobsRouter);

//app.get('/', (req, res) => res.send('Hello World!'))
const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port} ...`));
    }
    catch (err) {
        console.log('Start error');
    }
};
start();
