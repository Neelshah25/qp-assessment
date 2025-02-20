
USE [grocery_booking]
GO

DROP TABLE IF EXISTS [dbo].[orders]
GO

CREATE TABLE [dbo].[orders](
	[id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[created_at] [datetime] NULL
)
GO

ALTER TABLE [dbo].[orders] ADD  DEFAULT (getdate()) FOR [created_at]
GO