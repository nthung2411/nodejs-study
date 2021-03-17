const express = require('express');
const app = express();
app.use(express.json())

const courses = [
    { id: 1, name: 'Course A' },
    { id: 2, name: 'Course B' },
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {// 404
        res.status(404).send('The course does not exist');
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
});

app.get('/api/courses/:year/:month', (req, res) => {
    const params = req.params;
    const query = req.query;
    res.send({ ...params, ...query });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));