const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.static('public'));

const getMeals = () => {
    const dataPath = path.join(__dirname, './data/data.json');

    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        const parsedData = JSON.parse(data);

        return parsedData;
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

app.get('/meals', (req, res) => {
    const meals = getMeals();
    res.send(meals);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});