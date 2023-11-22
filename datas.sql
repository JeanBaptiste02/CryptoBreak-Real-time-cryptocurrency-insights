-- Table pour stocker les utilisateurs
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    -- OAuth2Token VARCHAR(255), 
    CONSTRAINT UC_Email UNIQUE (Email)
);

-- Table pour stocker la liste des crypto-monnaies consultables
CREATE TABLE Cryptocurrencies (
    CryptoID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Symbol VARCHAR(10) NOT NULL,
    CONSTRAINT UC_Symbol UNIQUE (Symbol)
);

-- Table pour stocker la liste des articles de presse
CREATE TABLE PressArticles (
    ArticleID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Content TEXT,
    PublicationDate DATE NOT NULL,
    Source VARCHAR(255) NOT NULL,
    CONSTRAINT FK_Source FOREIGN KEY (Source) REFERENCES Sources(Source)
);

-- Table pour stocker la liste des sources (RSS feed)
CREATE TABLE Sources (
    SourceID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    FeedURL VARCHAR(255) NOT NULL,
    CONSTRAINT UC_FeedURL UNIQUE (FeedURL)
);

-- Table pour stocker la liste des crypto-monnaies définies par l'administrateur pour chaque utilisateur
CREATE TABLE UserCryptocurrencies (
    UserID INT,
    CryptoID INT,
    PRIMARY KEY (UserID, CryptoID),
    CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_CryptoID FOREIGN KEY (CryptoID) REFERENCES Cryptocurrencies(CryptoID)
);

-- Table pour stocker les préférences de chaque utilisateur
CREATE TABLE UserPreferences (
    UserID INT PRIMARY KEY,
    Keywords TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table pour stocker les préférences globales de l'application
CREATE TABLE AppPreferences (
    AppID SERIAL PRIMARY KEY,
    MaxPopularCourses INT NOT NULL,
    MaxLatestArticles INT NOT NULL
);
