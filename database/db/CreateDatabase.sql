use lala;

create table users(
  id_usr INT PRIMARY KEY AUTO_INCREMENT,
  name_usr VARCHAR(200) NOT NULL,
  email_usr VARCHAR(200) NOT NULL,
  password_usr VARCHAR(200) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
); 