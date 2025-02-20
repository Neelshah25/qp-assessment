USE [grocery_booking]
GO

DROP TABLE IF EXISTS [dbo].[groceries]
GO

CREATE TABLE [dbo].[groceries](
	[id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[quantity] [int] NOT NULL,
	[isDeleted] BIT DEFAULT 0
)
GO