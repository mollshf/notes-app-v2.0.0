const arr = [
  {
    nama: 'rizki',
    kelas: 3,
    jurusan: 'teknik informatika',
    id: 883,
    nilai: 99,
    lulus: true,
  },
  {
    nama: 'rizki maulana',
    kelas: 3,
    jurusan: 'teknik informatika',
  },
  {
    nama: 'nasya maulana',
    kelas: 3,
    jurusan: 'teknik informatika',
  },
];
const id = 883;
const index = arr.findIndex((n) => n.id === id);
console.log(index);
arr[index] = {
  ...arr[index],
  nama: 'minna'
};

console.log(arr[index]);
console.log(arr)