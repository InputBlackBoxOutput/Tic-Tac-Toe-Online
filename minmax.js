/*Code of Minmax here*/

var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

var HUMAN = -1;
var COMP = +1;

function transferGridToBoard() {
	let pos = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(gridMap[pos] == 'X')
				board[i][j] = -1;
			else if(gridMap[pos] == 'O')
				board[i][j] = 1
			else
				board[i][j] = 0

			pos++;
		}
	}
	// console.log(board);
}


function evalute(state) {
	var score = 0;

	if (gameOverState(state, COMP))
		score = +1;
	else if (gameOverState(state, HUMAN))
		score = -1;
	else
		score = 0;

	return score;
}

function gameOverState(state, player) {
	var win_state = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (var i = 0; i < 8; i++) {
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}


function emptyCells(state) {
	var cells = [];
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (state[x][y] == 0)
				cells.push([x, y]);
		}
	}

	return cells;
}

function validMove(x, y) {
	var empties = emptyCells(board);
	try {
		if (board[x][y] == 0)
			return true;
		else
			return false;
	} catch (e) {
		return false;
	}
}

function setMove(x, y, player) {
	if (validMove(x, y)) {
		board[x][y] = player;
		return true;
	}
	else
		return false;
}

// //////////////////////////////////////////////////////////////////////////////////////////////
function minmax(state, depth, player) {
	let best;

	if (player == COMP) {
		best = [-1, -1, -1000];
	}
	else {
		best = [-1, -1, +1000];
	}

	if (depth == 0 || (gameOverState(state, HUMAN) || gameOverState(state, COMP))) {
		var score = evalute(state);
		return [-1, -1, score];

	}

	emptyCells(state).forEach(
		function (cell) {
			var x = cell[0];
			var y = cell[1];
			state[x][y] = player;
			
			var score = minmax(state, depth - 1, -player);
			state[x][y] = 0;
			score[0] = x;
			score[1] = y;

			if (player == COMP) {
				if (score[2] > best[2])
					best = score;
			}
			else {
				if (score[2] < best[2])
					best = score;
			}
	});

	return best;
}

//////////////////////////////////////////////////////////////////////////////////////////////