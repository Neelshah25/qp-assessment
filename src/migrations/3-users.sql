USE [grocery_booking]
GO

DROP TABLE IF EXISTS [dbo].[users]
GO

CREATE TABLE [dbo].[users] (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user'))
);