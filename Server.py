from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from urllib.parse import parse_qs
import json
#from dummydb import DummyDB
from videoGameDB import VideoGamesDB


class MyRequestHandler(BaseHTTPRequestHandler):

    def handleListVideoGames(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()

        #write to "wfile" response body
        db = VideoGamesDB()
        allRecords = db.getAllVideoGames()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleRetrieveVideoGame(self,videoGameId):
        db = VideoGamesDB()
        oneVideoGame = db.getOneVideoGame(videoGameId)
        #maybe this needs some help
        if oneVideoGame:
            #send status code
            self.send_response(200)
            self.send_header("Content-Type","application/json")
            self.send_header("Access-Control-Allow-Origin","*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(oneVideoGame),"utf-8"))
        else:
            self.handleNotFound()

    def do_PUT(self):
        path_parts = self.path.split("/")
        if len(path_parts) > 2:
            collection_name = path_parts[1]
            member_id = path_parts[2]
        else:
            collection_name = path_parts[1]
            member_id = None

        if collection_name == 'FavoriteVideoGames':
            if member_id == None:
                self.handleNotFound()
            else:
                self.handleUpdateVideoGame(member_id)
        else:
            #simple 404 response
            self.handleNotFound()

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Content-Type","text/plain")
        self.end_headers()
        self.wfile.write(bytes("Path not found","utf-8"))

    #handle any GET request
    def do_GET(self):
        print("The request path is:",self.path)

        path_parts = self.path.split("/")
        if len(path_parts) > 2:
            collection_name = path_parts[1]
            member_id = path_parts[2]
        else:
            collection_name = path_parts[1]
            member_id = None

        if collection_name == 'FavoriteVideoGames':
            if member_id == None:
                self.handleListVideoGames()
            else:
                self.handleRetrieveVideoGame(member_id)
        else:
            #simple 404 response
            self.handleNotFound()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers","Content-Type")
        self.end_headers()

        
class ThreadedHTTPServer(ThreadingMixIn,HTTPServer):
    pass

def run():
    listen = ('127.0.0.1',8080)
    server = ThreadedHTTPServer(listen,MyRequestHandler)

    print("Server Running")
    server.serve_forever()
run()