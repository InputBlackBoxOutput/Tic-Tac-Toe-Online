// Tic-Tac-Toe
// Code written by Rutuparn Pawar (InputBlackBoxOutput)
// Created on 25 May 2020

// Activate verbose by finding and removing '/// ' 
/////////////////////////////////////////////////////////////////////////////////////////
const bot_ = document.getElementById('bot');
bot_.addEventListener('click', function() {
	bot_.style.cssText = "color: white;";
	human_.style.cssText = "color: rgba(255,255,255,0.5);";

	crossScore_.innerText = "X:0";
	nutScore_.innerText = "O:0";
	botGame = true;
	again_.click();
	console.log("Playing game with AI BOT");
})

const human_ = document.getElementById('human');
human_.addEventListener('click', function() {
	bot_.style.cssText = "color: rgba(255,255,255,0.5);";
	human_.style.cssText = "color: white;";

	crossScore_.innerText = "X:0";
	nutScore_.innerText = "O:0";
	botGame = false;
	again_.click();
	console.log("Playing game with another person");
})

buttonGrid = document.getElementsByClassName('cell');
for(let i=0; i<buttonGrid.length; i++){
	buttonGrid[i].addEventListener('click', function() {
		buttonPressed(i);
	})
}

show_ = document.getElementById('show');

again_ = document.getElementById('again');
again_.hidden = true;
again_.addEventListener('click', function() {
	clearPlayArea();
	currentPlayer = CROSS;
	gameOver = false;
	show_.innerText = "";
	again_.hidden = true;
})

crossScore_ = document.getElementById('cross-score');
nutScore_ = document.getElementById('nut-score');
/////////////////////////////////////////////////////////////////////////////////////////
let gridMap = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
let CROSS = 'X';
let EMPTY = '  '; 
let NUT = 'O';
let currentPlayer = CROSS;
let gameOver = false;
let botGame = true;

let switchCurrentPlayer = function() { if(currentPlayer == CROSS) currentPlayer = NUT; else currentPlayer = CROSS;};

function placeCrossNut(position, player) {
	if(player == NUT && gridMap[position] == EMPTY) {
		buttonGrid[position].src = "img/nut.png";
		gridMap[position] = NUT;
		return true;
	}
	else if(player == CROSS && gridMap[position] == EMPTY) {
		buttonGrid[position].src = "img/cross.png";
		gridMap[position] = CROSS;
		return true;
	}
	else
		return false;
}

function winnerCheck(player) {
	// Check for 3 cross/nut in a column
	for(let i=0; i<3; i++) {
		let win_count = 0;
		for(let x=0+i; x<9; x+=3) {
			if( gridMap[x] ==  player)
				win_count += 1;
		}
		if(win_count == 3)
			return [true, `C${i}`];		
	}		
	
	//Check for 3 cross/nut in a row
	for(let i=0; i<3; i++) {
		let win_count = 0;
		for(let x= i*3; x<(i*3)+3; x++) {
			if( gridMap[x] ==  player)
				win_count += 1;
		}
		if(win_count == 3)
			return [true, `R${i}`];		
	}

	//Check for 3 cross/nut across diagonals
	let win_count = 0;
	if(gridMap[0] == player) win_count +=1;
	if(gridMap[4] == player) win_count +=1;
	if(gridMap[8] == player) win_count +=1;
	if(win_count == 3)
		return [true, 'D1'];

	win_count = 0;
	if(gridMap[2] == player) win_count +=1;
	if(gridMap[4] == player) win_count +=1;
	if(gridMap[6] == player) win_count +=1;
	if(win_count == 3)
		return [true, 'D2'];

	return [false, null]
}

function vacantPositions() {
	let vacantPos =[]
	for(let i=0; i<9; i++) 
		if(gridMap[i] == EMPTY) {
			vacantPos.push(i);
		}		
	return vacantPos;
}

let gameTied = function () { if((vacantPositions()).length == 0)  return true; else return false;}


// Work on while loop : It may cause the loop to run forever!
function playRandomMove() {
	/// console.log('Playing random move');
	if(!gameTied()) {
		vacantPos = vacantPositions();
		move = vacantPos[Math.floor(Math.random()* vacantPos.length)];
		gridMap[move] = NUT;
		buttonGrid[move].src = "img/nut.png";
	}
}

function botMove(difficulty) {
	if(!gameTied()) {
		// Current setting: 95% chance of playing best move
		let chance = Math.floor(Math.random() * 20);

		if(chance > 0) {
			let vacantPos = vacantPositions();
			
			// // Check if winning move possible
			for(let i=0; i<vacantPos.length; i++) {
				gridMap[vacantPos[i]] = NUT;

				if(!(winnerCheck(NUT)[0]))
					gridMap[vacantPos[i]] = EMPTY;
				else{
					/// console.log(" Winning move");
					buttonGrid[vacantPos[i]].src = "img/nut.png";
					return;
				}
			}

			// Check if blocking move possible
			for(let i=0; i<vacantPos.length; i++) {
				gridMap[vacantPos[i]] = CROSS;

				if(winnerCheck(CROSS)[0]) {
					/// console.log(" Blocking move");
					gridMap[vacantPos[i]] = NUT;
					buttonGrid[vacantPos[i]].src = "img/nut.png";
					return;
				}
				else
					gridMap[vacantPos[i]] = EMPTY;	
			}	
			playRandomMove();

		}
		else {
			playRandomMove();
		}
	}
	
}

/////////////////////////////////////////////////////////////////////////////////////////
function updateScoreBoard(winner) {
	if(winner == CROSS)
		crossScore_.innerText = "X: " + (parseInt(crossScore_.innerText[crossScore_.innerText.length-1]) + 1);
	else
		nutScore_.innerText = "O: " + (parseInt(nutScore_.innerText[nutScore_.innerText.length-1]) + 1);
}

function clearPlayArea() {
	for(let i=0; i<buttonGrid.length; i++)
		buttonGrid[i].src = "img/blank.png";
		gridMap = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
} 

function showWinner(player, winBy) {
	if(player == 'X') player = 'img/cross_'; else player = 'img/nut_';

	if(winBy[0] == 'C') {
		switch(winBy[1]) {
			case '0': buttonGrid[0].src=`${player}c0.png`; buttonGrid[3].src=`${player}c1.png`; buttonGrid[6].src=`${player}c2.png`; break;
			case '1': buttonGrid[1].src=`${player}c0.png`; buttonGrid[4].src=`${player}c1.png`; buttonGrid[7].src=`${player}c2.png`;break;
			case '2': buttonGrid[2].src=`${player}c0.png`; buttonGrid[5].src=`${player}c1.png`; buttonGrid[8].src=`${player}c2.png`;break;
		}
	}
	else if(winBy[0] == 'R') {
		switch(winBy[1]) {
			case '0': buttonGrid[0].src=`${player}r0.png`; buttonGrid[1].src=`${player}r1.png`; buttonGrid[2].src=`${player}r2.png`; break;
			case '1': buttonGrid[3].src=`${player}r0.png`; buttonGrid[4].src=`${player}r1.png`; buttonGrid[5].src=`${player}r2.png`;break;
			case '2': buttonGrid[6].src=`${player}r0.png`; buttonGrid[7].src=`${player}r1.png`; buttonGrid[8].src=`${player}r2.png`;break;
		}
	}
	else {
		switch(winBy[1]) {
			case '1': buttonGrid[0].src=`${player}d0.png`; buttonGrid[4].src=`${player}d1.png`; buttonGrid[8].src=`${player}d2.png`;break;
			case '2': buttonGrid[2].src=`${player}do0.png`; buttonGrid[4].src=`${player}do1.png`; buttonGrid[6].src=`${player}do2.png`;break;	
		}
	}
}

let show = function(stuff) { show_.innerText = stuff;}



function buttonPressed(position) {
	if(gameOver == false) {
		stat = placeCrossNut(position, currentPlayer);
		if(stat == false) return;

		if(botGame) {
			botMove();
		}

		let winCross = winnerCheck(CROSS);
		let winNut = winnerCheck(NUT);

		if(winCross[0] || winNut[0]) {
			if(winCross[0]) {
				show("Player cross won the game!");
				showWinner(CROSS, winCross[1]);
				updateScoreBoard(CROSS);
			}	
			else {
				show("Player nut won the game!");
				showWinner(NUT, winNut[1]);
				updateScoreBoard(NUT);
			}

			gameOver = true;
			again_.hidden = false;
			return;
		}

		if(!botGame)	
			switchCurrentPlayer();	

		if(gameTied()) {
			show("Looks like there is no winner!");
			gameOver = true;
			again_.hidden = false;
			return;
		}				
	}
}

/////////////////////////////////////////////////////////////////////////////////////////
// EOF
