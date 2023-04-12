import sqlite3
import RandomData
import random

class Database:
    def __init__(self):
        self.connection = sqlite3.connect("Database.db")
        self.cursor = self.connection.cursor()

    def CreateTables(self):
        self.cursor.execute("CREATE TABLE creators(creatorName, age,degree)")
        self.cursor.execute("CREATE TABLE games(gameName, creatorName, copiesSold,genre)")
        self.cursor.execute("CREATE TABLE awards(awardName, gameName)")
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

    def CreateAwards(self,numAwards):
        res = self.cursor.execute("SELECT * FROM games")
        games = self.cursor.fetchall()
        for i in range(numAwards):
            game = random.choice(games)
            awardName = RandomData.GenerateAwardName()
            res = self.cursor.execute("INSERT INTO awards (awardName, gameName) \
            VALUES(?, ?)", (awardName,game[0]))
    
            self.connection.commit()

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
        self.cursor.execute("SELECT * FROM creators WHERE age >= 20 AND age <= 29")
        #NOT DONE
        return self.cursor.fetchall()

    def GetAwards1(self): # Awards for the survival genre from creators that do not have a degree
        pass

    def GetGames1(self): #Games with a creator who has a degree and at least 2 awards
        pass