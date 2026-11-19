CREATE DATABASE IF NOT EXISTS db_crud;
USE db_crud;

CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL
);

INSERT INTO mahasiswa (nim, nama, jurusan) VALUES
('255150700000001', 'Hakam', 'Teknik Informatika'),
('255150700000002', 'Elviana', 'Sistem Informasi');