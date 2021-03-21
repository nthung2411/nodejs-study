const Joi = require('joi');
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
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // lookup the course
    // if not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {// 404
        res.status(404).send('The course does not exist');
    }

    // validate
    // if invalid, return 400
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(3).max(30).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    // return updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const index = courses.findIndex(course => course.id === parseInt(req.params.id));
    if (index === -1) {// 404
        res.status(404).send('The course does not exist');
    }
    const course = courses[index];
    courses.splice(index, 1);
    res.send(course);
});

app.get('/api/courses/:year/:month', (req, res) => {
    const params = req.params;
    const query = req.query;
    res.send({ ...params, ...query });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));