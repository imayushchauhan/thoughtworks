
class BattleShipBLManager {
    constructor() {
        this.alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    }
    
    async startBattleShipGame(request) {
        try {
            request = request.split("\n");
            if(request.length < 5)
                throw "check input request";

            let battleArea = this.getBattleArea(request);
            let ships = this.getShips(request);

            let playerOneBattleArea = this.getBattleAreaWithShips(battleArea, ships, 3);
            let playerTwoBattleArea = this.getBattleAreaWithShips(battleArea, ships, 4);
            
            let playerOneMissiles = this.getMissiles(ships.length, request, 0);
            let playerTwoMissiles = this.getMissiles(ships.length, request, 1);

            return this.playBattleShipGame(playerOneBattleArea, playerTwoBattleArea, playerOneMissiles, playerTwoMissiles);            
        } 
        catch(ex) {
            return ex;
        }
    }
    

    getBattleArea(request) {
        if(request[0] === '')
            throw "check battle area dimensions in input request";   

        let battleAreaDimension = request[0].split(" ");        
        if(battleAreaDimension.length != 2 || battleAreaDimension[0] === '' || battleAreaDimension[1] === '')
            throw "check battle area dimensions in input request"; 
        
        let width = parseInt(battleAreaDimension[0]);
        if(width <= 0)
            throw "width of battle area should be greater than zero";

        let height = parseInt(this.alphabets.indexOf(battleAreaDimension[1]) + 1);
        if(height <= 0)
            throw "height of battle area should be greater than zero"
        
        let battleArea = {};
        for(let i = 0;i < height;i++){
            for(let j = 0;j < width;j++){ 
                let key = this.alphabets[i] + (j + 1);                       
                battleArea[key] = 0;
            }
        }   

        return battleArea;
    }

    getShips(request){
        if(request[1] === '' || parseInt(request[1]) <= 0)
            throw "check number of ships in input request";

        let ships = [];
        for(let i = 0;i < parseInt(request[1]);i++) {
            let ship = request[i + 2];
            let shipDetail = ship.split(" ");
            if(shipDetail.length != 5 || !(shipDetail[0] === "P" || shipDetail[0] === "Q"))
                throw "check number of ships and ship details in input request";
            
            ships.push(ship);
        }

        return ships;
    }

    getMissiles(numberOfShips, request, index){
        if(request[numberOfShips + 2 + index] === '' || request[numberOfShips + 2 + index].split(" ").length === 0)
            throw "check target locations of missiles";      

        return request[numberOfShips + 2 + index].split(" ");    
    }

    getBattleAreaWithShips(battleArea, ships, index) {                                       
        let battleAreaWithShips = Object.assign({}, battleArea);    
        for(let shipIndex = 0;shipIndex < ships.length;shipIndex++) {
            let ship = ships[shipIndex].split(" ");
            if(parseInt(ship[1]) <= 0 || parseInt(ship[2]) <= 0)
                throw "check size of ships in input request";

            for(let i = 0;i < parseInt(ship[1]);i++) {
                let key = ship[index].charAt(0) + (parseInt(ship[index].charAt(1)) + i);
                if(!(key in battleAreaWithShips))
                    throw "check size and position of ships in input request";

                battleAreaWithShips[key] = 1;
                if(ship[0] === "Q")
                    battleAreaWithShips[key] = 2;
            }

            for(let i = 1;i < parseInt(ship[2]);i++) {
                let key = this.alphabets[this.alphabets.indexOf(ship[index].charAt(0)) + i] + ship[index].charAt(1);
                if(!(key in battleAreaWithShips))
                    throw "check size and position of ships in input request";

                battleAreaWithShips[key] = 1;
                if(ship[0] === "Q")
                    battleAreaWithShips[key] = 2;
            }
        }
        
        return battleAreaWithShips;    
    }

    playBattleShipGame(playerOneBattleArea, playerTwoBattleArea, playerOneMissiles, playerTwoMissiles) {
        let result = "";
        let chance = "player-one";
        for(let i = 0,j=0;i < playerOneMissiles.length,j < playerTwoMissiles.length;) {                       
            
            if(chance === "player-one"){
                if(playerOneMissiles[i]) {
                    let shootResponse = this.shootMissile(playerOneMissiles[i], playerTwoBattleArea);
                    result = result + "Player-1 fires a missile with target " + playerOneMissiles[i] + " which got "+ shootResponse + "\n";
                    if(shootResponse === 'hit'){
                        let winner = this.checkIfPlayerWins(playerTwoBattleArea);
                        if(winner){
                            result = result + "Player-1 won the battle";
                            return result;
                        }
                    }
                    chance = this.getCurrentChance(shootResponse, "player-one");
                    i++;
                }
                else{
                    result = result + "Player-1 has no more missiles left to launch" + "\n";
                    chance = this.getCurrentChance('', "player-one");;
                }
            }

            if(chance === "player-two") {
                if(playerTwoMissiles[j]) {
                    let shootResponse = this.shootMissile(playerTwoMissiles[j], playerOneBattleArea);
                    result = result + "Player-2 fires a missile with target " + playerTwoMissiles[j] + " which got "+ shootResponse + "\n";
                    if(shootResponse === 'hit'){
                        let winner = this.checkIfPlayerWins(playerOneBattleArea);
                        if(winner){
                            result = result + "Player-2 won the battle";
                            return result;
                        }
                    }
                    chance = this.getCurrentChance(shootResponse, "player-two");
                    j++;
                }
                else {
                    result = result + "Player-2 has no more missiles left to launch" + "\n"; 
                    chance = this.getCurrentChance('', "player-two");
                }
            }
        }   

        result = result + "player-1 and player-2 match tied";
        return result;
    }

    shootMissile(missile, battleArea) {        
        if(missile in battleArea) {
            if(battleArea[missile] > 0) {
                battleArea[missile] = battleArea[missile] - 1; 
                return "hit";
            }
        }

        return "miss";
    }

    getCurrentChance(shootResponse, currentChance) {        
        if(shootResponse === "hit")
            return currentChance;
        else {
            if(currentChance === "player-one")
                return "player-two";
            else
                return "player-one";
        }
    }

    checkIfPlayerWins(battleArea) { 
        let win = true;       
        for(let key in battleArea){
            if(battleArea[key] > 0){
                win = false;
            }
        }

        return win;
    }
}

module.exports = BattleShipBLManager;