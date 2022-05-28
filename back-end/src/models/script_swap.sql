DROP DATABASE [IF EXISTS] swap;

CREATE DATABASE swap;

USE swap;

/* TABELA USERS*/

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users (id, name, email, address, profile_picture) 
VALUES ('1', 'UserTest', 'test@test.com.br', '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd');

/* TABELA TRANSACTIONS*/

CREATE TABLE IF NOT EXISTS transactions(
    txHash VARCHAR(100) NOT NULL,
    fromAddress VARCHAR(100) NOT NULL,
    toAddress VARCHAR(100) NOT NULL,
    amount DOUBLE,
    timestamp VARCHAR(100)
);

INSERT INTO transactions(txHash, fromAddress, toAddress, amount, timestamp)
VALUES ('0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', 45, '2021-06-12T18:56:58.629Z');

