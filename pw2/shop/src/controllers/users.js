// Exercício 01
import { v4 as uuidv4 } from 'uuid';

const users = [];

const index = (req, res) => {
  res.send(users);
}

const create = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  return res.status(201).json();
}

const read = (req, res) => {
  const { id, } = req.params;
  const user = users.filter(user => user.id === id);

  res.send(user);
}

const update = (req, res) => {
  const { 
    id, 
    name, 
    email,
  } = req.body;

  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return res.status(404).json();
  }

  if (name) {
    users[index].name = name;
  }
  if (email) {
    users[index].email = email;
  }

  res.send(users[index]);
}

const remove = (req, res) => {
  const { id } = req.params;
  const user = users.filter(user => user.id === id);
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1);

  res.send(user);
}

export default { index, create, read, update, remove };
