
USE [grocery_booking]
GO

DROP TABLE IF EXISTS [dbo].[order_items]
GO

CREATE TABLE [dbo].[order_items](
	[id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[orderId] [int] NOT NULL,
	[groceryId] [int] NOT NULL,
	[quantity] [int] NOT NULL
)
GO

ALTER TABLE [dbo].[order_items]  WITH CHECK ADD FOREIGN KEY([groceryId])
REFERENCES [dbo].[groceries] ([id])
GO

ALTER TABLE [dbo].[order_items]  WITH CHECK ADD FOREIGN KEY([orderId])
REFERENCES [dbo].[orders] ([id])
GO
