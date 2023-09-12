const fs = require('fs');

// membuat folder jika tidak ada folder
const pathFolder = './db';
if (!fs.existsSync(pathFolder)) {
  fs.mkdirSync(pathFolder);
}

// membuat file jika tidak terdapat file pada folder yang sudah di buat
const filePath = `${pathFolder}/data.json`;
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 4), 'utf-8');
}

const loadData = () => {
  const buffer = fs.readFileSync(filePath, 'utf-8');
  const datas = JSON.parse(buffer);
  return datas;
};

const saveDatas = (datas) => {
  fs.writeFileSync(filePath, JSON.stringify(datas, null, 4));
};

const addData = (data) => {
  const datas = loadData();
  datas.push(data);
  saveDatas(datas);
};

const findData = (id) => {
  const datas = loadData();
  const data = datas.filter((item) => item.id === id)[0];
  return data;
};

module.exports = {
  loadData,
  saveDatas,
  addData,
  findData,
};
