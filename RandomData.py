import random
creatorNames = [
    "Liam","Noah","Oliver","William","Elijah",
              "James","Benjamin","Lucas","Mason","Ethan",
              "Alexander","Henry","Jacob","Michael","Daniel",
              "Logan","Jackson","Sebastion","Jack","Aiden","Owen",
              "Samuel","Matthew","Joseph","Mateo","David","John",
              "Wyatt","Carter","Julian","Luke","Grayson","Isaac",
              "Jayden","Theodore","Gabriel","Anthony","Dylan","Leo",
              "Lincoln","Jaxon","Asher","Christopher","Josiah",
              "Andrew","Thomas","Joshua","Ezra","Hudson","Charles",
              "Olivia","Emma","Ava","Sophia","Isabella","Charlotte",
                "Amelia","Mia","Harper","Evelyn","Abigail","Emily",
                "Ella","Elizabeth","Camila","Luna","Sofia","Avery",
                "Mila","Aria","Scarlett","Penelope","Layla","Chloe",
                "Victoria","Madison","Eleanor","Grace","Nora","Riley",
                "Zoey","Hannah","Hazel","Lily","Ellie","Violet","Lillian",
                "Zoe","Stella","Aurora","Natalie","Emilia","Everly",
                "Leah","Aubrey","Willow","Addison","Lucy","Audrey",
                "Bella"
]
creatorLastNames = [
    'Barlowe','Caddel','Hart','Katz','Laurier','Madden','Elrod','Whitlock',
    'Solace','Levine','Thatcher','Raven','Bardot','St. James','Hansley','West',
    'Madison','Marley','Ellis','Hope','Cassidy','Lopez','Jenkins','Poverly','Mckenna',
    'Gonzales','Keller','Stoll','Collymore','Adler','Hayes','Ford','Beckett'
]

subGameNames = ['Evo','Cloud','Dragon','Fuse','Dread','Mad','Geo','Air','War','Bio'
                'Block','Alpha','Fire','Fusion','Ever','Dead','Dream','Anti',
                'Ember','Cyber','Castle','Grim','Ultra','Alter','Delta','Battle','Arch',
                'Omega','Mega',]
foreGameNames = ['gene','lust','rain','shot','hunt','core','shock','dude','works',
                 'fire','flight','land','mind','back','storm','dude','craft','rush'
                 'doom','reign','life','point','phobia','blade','light','side','rage'
                 'blaze',"rune",'craft']
awardNames = [
    'Pioneer Award','Lifetime Achievment','Ambassador Award','Game of the Year',
    'Audience Award','Best Audio','Best Design','Best Debut',
    'Innovation Award','Best Narrative','Social Impact Award','Best technology',
    'Best Visual Art','Best Game within its Genre','Best Characters','Best Path Finding',
]
genre = ['Sandbox','Real-time strategy','First person shooter','Role-playing'
         'Simulation','Sports','Puzzle','Party games','Action','Adventure',
         'Survival','Horror','Platformer','Visual novel','War','Casual','Medival']


def GenerateCopiesSold():
    return random.randint(10000,15000000)
def GenerateDegree():
    return random.choice([True,False])
def GenerateAge():
    return random.randint(15,65)
def GenerateCreatorName():
    return random.choice(creatorNames) + ' ' + random.choice(creatorLastNames)
def GenerateGameName():
    return random.choice(subGameNames + foreGameNames)
def GenerateAwardName():
    return random.choice(awardNames)
def GenerateGenre():
    return random.choice(genre)


#Need to make sure that we have queries to just list either the creator game or award