function generatePaletteGridPane() {
	let elementTree = document.createDocumentFragment();

	let container = document.createElement("div");
	container.classList.add("palette-grid");

	let title = document.createElement("h3");
	title.appendChild(document.createTextNode("Color Palette Grid"));
	title.classList.add("palette-grid__title");

	let grid = document.createElement("div");
	grid.classList.add("palette-grid__grid");
	grid.id = "palette-grid__grid";

	// container.appendChild(title);
	container.appendChild(grid);

	elementTree.appendChild(container);

	return elementTree;
	//main.appendChild(elementTree);
}

function generateColorCard(cssName, colorValue) {
	let card = document.createElement("div");
	card.classList.add("palette-card");

	let title = document.createElement("h4");
	title.appendChild(document.createTextNode(cssName));
	title.classList.add("palette-card__title");

	let colorBox = document.createElement("div");
	colorBox.classList.add("palette-card__color-box");
	colorBox.style.backgroundColor = colorValue;

	let caption = document.createElement("h5");
	caption.appendChild(document.createTextNode(colorValue));
	caption.classList.add("palette-card__caption");

	card.appendChild(title);
	card.appendChild(colorBox);
	card.appendChild(caption);
	return card;
}

function generateColorCards(cssNames, colorValues) {
	let cards = [];
	let finalIndex = Math.min(cssNames.length, colorValues.length);
	for (i = 0; i < finalIndex; i++) {
		cards[i] = generateColorCard(cssNames[i], colorValues[i]);
	}
	return cards;
}

function addColorCardsToPaletteGrid(gridTree, cards) {
	let grid = gridTree.querySelector("#palette-grid__grid");
	for (i = 0; i < cards.length; i++) {
		grid.appendChild(cards[i]);
	}
}
