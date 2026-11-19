const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_crud'
});

// READ: menampilkan semua data
app.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM mahasiswa ORDER BY id');
    res.render('index', { data: rows });
});

app.get('/tambah', (req, res) => {
    res.render('form', {
        judul: 'Tambah Mahasiswa',
        aksi: '/tambah',
        mhs: { nim: '', nama: '', jurusan: '' }
    });
});

app.post('/tambah', async (req, res) => {
    const { nim, nama, jurusan } = req.body;
    await db.query(
        'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)',
        [nim, nama, jurusan]
    );
    res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM mahasiswa WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
        return res.status(404).send('Data tidak ditemukan');
    }
    res.render('form', {
        judul: 'Edit Mahasiswa',
        aksi: '/edit/' + req.params.id,
        mhs: rows[0]
    });
});

app.post('/edit/:id', async (req, res) => {
    const { nim, nama, jurusan } = req.body;
    await db.query(
        'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?',
        [nim, nama, jurusan, req.params.id]
    );
    res.redirect('/');
});

app.post('/hapus/:id', async (req, res) => {
    await db.query('DELETE FROM mahasiswa WHERE id = ?', [req.params.id]);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});