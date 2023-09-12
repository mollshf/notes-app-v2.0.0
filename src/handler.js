// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const fs = require('fs');
// const notes = require('../db/notes');

// const { loadData, addData, findData } = require('../db/notes');
const notes = require('./notes');

const addNote = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);
  // addData(newNote);

  // const notes = loadData();
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di perbarui',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal di tambahkan',
  });
  response.code(500);
  return response;
};

const myHome = (request, h) => {
  const indexHtml = fs.readFileSync('./html/index.html', 'utf-8');
  return h.response(indexHtml);
};

const getAllNotes = () => (
  {
    status: 'success',
    data: {
      notes,
    },
  });

const getNotesById = (request, h) => {
  const { id } = request.params;

  // const notes = findData(id);
  const note = notes.filter((data) => data.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNotesById = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'data berhasil di ubah',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal memperbarui catatan, id tidak di temukan',
  });
  response.code(404);
  return response;
};

const deleteNotesById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di hapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'catatan gagal di hapus, id tidak di kenal',
  });
  response.code(404);
  return response;
};

const pageNotFound = (request, h) => {
  const notFoundHtml = fs.readFileSync('./html/404.html', 'utf-8');
  return h.response(notFoundHtml);
};

module.exports = {
  addNote,
  getAllNotes,
  getNotesById,
  editNotesById,
  deleteNotesById,
  myHome,
  pageNotFound};
