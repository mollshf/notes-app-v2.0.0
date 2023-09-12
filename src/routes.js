const {
  addNote,
  getAllNotes,
  getNotesById,
  editNotesById,
  deleteNotesById,
  myHome,
  pageNotFound,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNote,
  },
  {
    method: 'GET',
    path: '/',
    handler: myHome,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotes,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotesById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesById,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: pageNotFound,
  },
];

module.exports = routes;
