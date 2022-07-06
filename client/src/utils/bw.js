export function cmd_B() {
	var [x, y, text, command] = [this.x, this.y, this.text, this.command]

	var newX, newY;

	var arr = []

	arr.push(text[y].slice(0, x))
	text[y - 1] && arr.push(text[y - 1])



	const calculatePossibleB = (arr, possibleBeginnings, moveUP) => {
		var seenFirstNonWhite = false
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] !== ' ' & arr[i] !== null) {
				if (!seenFirstNonWhite) {
					possibleBeginnings.push(i)
					seenFirstNonWhite = true
				}
			}
			else {
				seenFirstNonWhite = false
			}
		}
		console.log(possibleBeginnings);
		newX = possibleBeginnings.pop()
		newY = y - moveUP
		return [newX, newY]
	}

	if (arr.length === 1) {
		if (x === 0) {
			newX = 0
			newY = 0
		}
		else {
			[newX, newY] = calculatePossibleB(arr[0], [0], 0)
		}
	}
	else {
		if (arr[0].every(el => el === ' ')) {
			[newX, newY] = calculatePossibleB(arr[1], [0], 1)
		}
		else {
			[newX, newY] = calculatePossibleB(arr[0], [0], 0)

		}
	}
	return {
		newX: newX, newY: newY, newText: text, changeText: false, newMode: "normal"
	}
}

export function cmd_W() {
	var [x, y, text, command] = [this.x, this.y, this.text, this.command]

	var newX, newY;

	var arr = []

	arr.push(text[y].slice(x))
	text[y + 1] && arr.push(text[y + 1])



	const calculatePossibleW = (arr, possibleBeginnings, moveUP) => {
		var seenFirstNonWhite = false
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] !== ' ') {
				if (!seenFirstNonWhite) {
					possibleBeginnings.push(i)
					seenFirstNonWhite = true
				}
			}
			else {
				seenFirstNonWhite = false
			}
		}
		newX = possibleBeginnings.pop()
		newY = y - moveUP
		return [newX, newY]
	}

	console.log(arr);
	if (arr.length === 1) {
		if (x === arr[0].length - 1) {
			console.log("ostatni");
			newX = arr[0].length - 1
			newY = y
		}
		else {
			[newX, newY] = calculatePossibleW(arr[0], [], 0)
		}
	}
	else {
		if (arr[0].every(el => el === ' ')) {
			[newX, newY] = calculatePossibleW(arr[1], [], 1)
		}
		else {
			[newX, newY] = calculatePossibleW(arr[0], [], 0)

		}
	}
	return {
		newX: newX, newY: newY, newText: text, changeText: false, newMode: "insert"
	}
}