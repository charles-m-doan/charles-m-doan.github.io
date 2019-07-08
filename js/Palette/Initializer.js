const main = document.getElementsByClassName("main")[0];
console.log(document);

// EXECUTION ----------------------------------------

let allTheColors = sitePalette.getAllColors();
let cssNameList = [];
let hexColorValues = [];
for (let color of allTheColors) {
	cssNameList.push(color[0]);
	hexColorValues.push(color[1]);
}

let paletteGridPane = generatePaletteGridPane();
let newCards = generateColorCards(cssNameList, hexColorValues);
addColorCardsToPaletteGrid(paletteGridPane, newCards);
main.appendChild(paletteGridPane);

let paletteCards = document.getElementsByClassName("palette-card");

let copyCSSVariableNameToClipboard = function() {
	let title = this.getElementsByClassName("palette-card__title")[0];
	let text = title.textContent;
	let promise = navigator.clipboard.writeText(text);
	console.log('"' + text + '" copied to the clipboard.');
};

for (var i = 0; i < paletteCards.length; i++) {
	paletteCards[i].addEventListener(
		"click",
		copyCSSVariableNameToClipboard,
		false
	);
}
