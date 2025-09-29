create database if not exists todolist_db;
use todolist_db;

create table if not exists todos (
id int auto_increment primary key,
task varchar(2500) not null,
status enum('on progres','complete') not null default 'on progres',
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp on update current_timestamp
);
