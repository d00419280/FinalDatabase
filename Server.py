from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from urllib.parse import parse_qs
import json
from Database import Database


class MyRequestHandler(BaseHTTPRequestHandler):

    def handleListCreators(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetAllCreators()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleListCreators1(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetCreators1()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleListGames(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetAllGames()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleListGames1(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetGames1()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleListAwards(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetAllAwards()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))

    def handleListAwards1(self):
        #send status code
        self.send_response(200)
        self.send_header("Content-Type","application/json")
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        #write to "wfile" response body
        db = Database()
        allRecords = db.GetAwards1()
        self.wfile.write(bytes(json.dumps(allRecords),"utf-8"))


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

        if collection_name == 'VGDB':
            if member_id == 'Creators':
                self.handleListCreators()
            elif member_id == 'Games':
                self.handleListGames()
            elif member_id == 'Awards':
                self.handleListAwards()
            elif member_id == 'Creators1':
                self.handleListCreators1()
            elif member_id == 'Games1':
                self.handleListGames1()
            elif member_id == 'Awards1':
                self.handleListAwards1()
        else:
            #simple 404 response
            self.handleNotFound()

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Content-Type","text/plain")
        self.end_headers()
        self.wfile.write(bytes("Path not found","utf-8"))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Access-Control-Allow-Methods","GET,OPTIONS") #self.send_header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
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