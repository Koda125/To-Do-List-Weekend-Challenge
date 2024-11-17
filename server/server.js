const express = require('express');
const app = express();

const todos = require('./routes/todos.router.js');

let PORT = process.env.PORT || 5001;

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}
todos [
  {
    whatToDO: 'Walk the dog',
    done: 'No'
  },
  {
    whatToDo: 'Fold clean clothes',
    done: 'yes'
  }
]

app.use(express.static('./server/public'));
app.use(express.json());

app.use('/todos', todos);

app.get('/todos', (req, res) => {
  console.log( `in /todos GET`)
  res.send(todos)
})
app.post('/todos', (req, res) => {
  console.log('In /todos POST')
  todos.push(req.body)
  res.sendStatus(201)
})



app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
