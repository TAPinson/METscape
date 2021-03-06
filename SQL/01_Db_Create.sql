USE [master]
GO
IF db_id('METscape') IS NULL
  CREATE DATABASE [METscape]
GO
USE [METscape]
GO

DROP TABLE IF EXISTS [Friendship];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [UserProfile];

CREATE TABLE [Post] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [MetId] integer NOT NULL,
  [DateCreated] datetime NOT NULL, 
  [UserProfileId] integer NOT NULL,
  -- [Title] nvarchar(255) NOT NULL,
  [Content] nvarchar(255) NOT NULL  
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [PostId] integer NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,
  [DateCreated] datetime NOT NULL   
)
GO

CREATE TABLE [Friendship] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [InitiatorId] integer NOT NULL,
  [ApproverId] integer NOT NULL,
  [IsApproved] bit NOT NULL
)
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO
ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Friendship] ADD FOREIGN KEY ([InitiatorId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Friendship] ADD FOREIGN KEY ([ApproverId]) REFERENCES [UserProfile] ([Id])
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (1, 'Super','Admin', 'OGAdmin', 'admin@email.com', 'vZC6MejOUtdXBg4e6n8M3anTKmH3');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (2, 'Tim','Taylor', 'Toolman', 'tim@email.com', 'vCvRa2MeSpO8X5wbZFLIxKga30k2');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (3, 'Wilson','Wilson', 'Neighbor', 'fenceguy@email.com', 'HAQ3ihlgU6c7gNPN8y0oeC6oAhB3');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (5, 'Brad','Taylor', 'SoccerGuy132', 'soccerguy132@email.com', 'W5WF6WEas9NGHzTnUa8RyZ9LWso2');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (6, 'Randy','Taylor', 'Pinnochio', 'pinnochio@email.com', 'rAMSrWCo4wZior6ozNiMjxI5ZqA3');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (7, 'Mark','Taylor', 'GothKid187', 'gothkid187@email.com', 'tVvg14susVREpaNIlDOp94sqvPV2');

INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [UserName], [Email], [FirebaseUserId])
VALUES 
  (9, 'Jill','Taylor', 'HotMomma', 'jill@email.com', '59jsvfRLCAQseclqyQfrN2svvAi2');



SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Post] ON
INSERT INTO [Post]
  ([Id], [MetId], [Content], [UserProfileId], [DateCreated])
VALUES
  (1, 436050, 'This truly is just amazing! I am so impressed!', 1, '06-22-2020'),
  (2, 436051, 'Can you believe how CLEVER this artist was? He is my favorite', 2, '06-23-2020'),
  (3, 436052, 'If I could have any piece from the musem to hang on my wall, this would be it', 1, '06-29-2020'),
  (4, 436053, 'This seems extraordinarily complex! How do you suppose they made this?',2, '06-29-2020'),
  (5, 436054, 'Of all of the things I saw today, THIS is the coolest of all!', 2, '04-20-2020');
SET IDENTITY_INSERT [Post] OFF

SET IDENTITY_INSERT [Comment] ON
INSERT INTO [Comment]
  ([Id], [UserProfileId], [PostId], [Content], [DateCreated])
VALUES
  (1, 2, 1, 'Can you believe they did this with only the primitive tools they had for this back then?!', '06-23-2020');
SET IDENTITY_INSERT [Comment] OFF