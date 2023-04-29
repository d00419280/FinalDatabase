import sqlite3
import RandomData
import random

class Database:
    def __init__(self):
        self.connection = sqlite3.connect("Database.db")
        self.cursor = self.connection.cursor()

    def CreateTables(self):
        self.cursor.execute("CREATE TABLE IF NOT EXISTS creators(creatorName TEXT, age INTEGER,degree TEXT)")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS games(gameName TEXT, creatorName TEXT, copiesSold INTEGER,genre TEXT)")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS awards(awardName TEXT, gameName TEXT)")
        print("Successfully Created Tables")
        self.connection.commit()

    def AnnihilateTables(self):
        self.cursor.execute("DROP TABLE creators")
        self.cursor.execute("DROP TABLE games")
        self.cursor.execute("DROP TABLE awards")
        print("Successfully Dropped Tables")
        self.connection.commit()


    def CreateManyCreators(self,numCreators):
        for i in range(numCreators):
            name = RandomData.GenerateCreatorName()
            age = RandomData.GenerateAge()
            degree = RandomData.GenerateDegree()
            res = self.cursor.execute("INSERT INTO creators (creatorName, age, degree)VALUES(?, ?, ?)", (name, age,degree))

            gameName = RandomData.GenerateGameName()
            copiesSold = RandomData.GenerateCopiesSold()
            genre = RandomData.GenerateGenre()
            res = self.cursor.execute("INSERT INTO games (gameName, CreatorName, copiesSold, genre)VALUES(?, ?, ?, ?)", (gameName, name,copiesSold,genre))
            self.connection.commit()
        print(f"Succesfully Created {numCreators} Creators")

    def CreateGames(self,numGames):
        res = self.cursor.execute("SELECT * FROM creators")
        creators = self.cursor.fetchall()
        for i in range(numGames):
            creator = random.choice(creators)
            gameName = RandomData.GenerateGameName()
            copiesSold = RandomData.GenerateCopiesSold()
            genre = RandomData.GenerateGenre()
            res = self.cursor.execute("INSERT INTO games (gameName, creatorName, copiesSold, genre) \
            VALUES(?, ?, ?, ?)", (gameName, creator[0], copiesSold, genre))
    
            self.connection.commit()
        print(f"Succesfully Created {numGames} Games")

    def CreateAwards(self,numAwards):
        res = self.cursor.execute("SELECT * FROM games")
        games = self.cursor.fetchall()
        for i in range(numAwards):
            game = random.choice(games)
            awardName = RandomData.GenerateAwardName()
            res = self.cursor.execute("INSERT INTO awards (awardName, gameName) \
            VALUES(?, ?)", (awardName,game[0]))
    
            self.connection.commit()
        print(f"Succesfully Created {numAwards} Awards")

    def GetAllCreators(self):
        self.cursor.execute("SELECT * FROM creators")
        return self.cursor.fetchall()
    
    def GetAllGames(self):
        self.cursor.execute("SELECT * FROM games")
        return self.cursor.fetchall()
    
    def GetAllAwards(self):
        self.cursor.execute("SELECT * FROM awards")
        return self.cursor.fetchall()
    
    def GetCreators1(self): # Creators who are 20-29 who have sold at least 2 games and won at least one award
        self.cursor.execute("SELECT creators.creatorName as creator, age, degree, awardName as award, games.gameName as game, copiesSold as copies_sold, genre FROM creators JOIN games ON creators.creatorName = games.creatorName JOIN awards ON games.gameName = awards.gameName WHERE age >= 20 and  age <= 29")
        return self.cursor.fetchall()

    def GetAwards1(self): # Awards for the survival genre from creators that do not have a degree
        self.cursor.execute("SELECT awardName, games.gameName, genre, creators.creatorName FROM awards JOIN games ON awards.gameName = games.gameName JOIN creators ON games.creatorName = creators.creatorName WHERE degree = 0 AND genre = 'Survival'")
        return self.cursor.fetchall()

    def GetGames1(self): #Games with a creator who has a degree and at least 2 awards
        self.cursor.execute("SELECT creators.creatorName as creator, games.gameName AS game, Count(*) as awards_given, copiesSold, genre FROM awards JOIN games ON awards.gameName = games.gameName JOIN creators ON games.creatorName = creators.creatorName WHERE degree = 1 GROUP BY creators.creatorName HAVING awards_given > 1 ORDER BY awards_given DESC")
        return self.cursor.fetchall()

db = Database()
db.AnnihilateTables()
db.CreateTables()
db.CreateManyCreators(100)
db.CreateGames(200)
db.CreateAwards(20)
print(db.GetGames1())
