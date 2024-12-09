import express from 'express';


const  app = express();

const PORT = process.env.PORT || 3000;
app.use('/', (req, res) => {
    res.json('Hello, Fastddev Food!');
});

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT} on "http://localhost:${PORT}" `);
    console.log(`Server is running on port ${PORT}`);
});





