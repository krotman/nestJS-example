# NestJS postgres/mongodb example

DDL:
```
create database example;
create user example with encrypted password 'localpass';
grant all privileges on database example to example ;
create schema example;
grant all privileges on schema example to example ;
```

Run with 
```
./start
```