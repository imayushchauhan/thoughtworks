# thoughtworks

Prerequisite:-
1. Install latest version of node on your machine
2. Install latest version of postman on your machine

How to run application:-
1. Go to root directory of the solution
2. Run npm install
3. Run npm start
4. Open postman and run start-battle-ship-game api
5. Start BattleShip Game Api is used to start the battleship game with different request:-
   ApiUrl: 
    localhost:3000/start-battle-ship-game
   Method: 
    Post
   Body Type: 
    Text
   Body: 
    5 E
    2
    Q 1 1 A1 B2
    P 2 1 D4 C3
    A1 B2 B2 B3
    A1 B2 B3 A1 D1 E1 D4 D4 D5 D5  
   Response:
    Player-1 fires a missile with target A1 which got miss
    Player-2 fires a missile with target A1 which got hit
    Player-2 fires a missile with target B2 which got miss
    Player-1 fires a missile with target B2 which got hit
    Player-1 fires a missile with target B2 which got hit
    Player-1 fires a missile with target B3 which got miss
    Player-2 fires a missile with target B3 which got miss
    Player-1 has no more missiles left to launch
    Player-2 fires a missile with target A1 which got hit
    Player-2 fires a missile with target D1 which got miss
    Player-1 has no more missiles left to launch
    Player-2 fires a missile with target E1 which got miss
    Player-1 has no more missiles left to launch
    Player-2 fires a missile with target D4 which got hit
    Player-2 fires a missile with target D4 which got miss
    Player-1 has no more missiles left to launch
    Player-2 fires a missile with target D5 which got hit
    Player-2 won the battle