// INPUT COLOR MAPPING PARAMETERS AT THE BOTTOM OF THIS FILE

class LuminosityGradient {
	constructor(baseColorHex, levels, shadeBuffer, tintBuffer) {
		if (baseColorHex === undefined) {
			baseColorHex = "#808080";
		}
		if (levels === undefined) {
			levels = 5;
		}
		if (shadeBuffer === undefined) {
			shadeBuffer = 1.0 / 100;
		}
		if (tintBuffer === undefined) {
			tintBuffer = 1.0 / 100;
		}
		this.baseColorHex = baseColorHex;
		this.baseColorHue = 0;
		this.baseColorSaturation = 0;
		this.baseColorLightness = 0;
		this.baseColorHSL = "hsl(0,0%,0%)";
		this.tints = [];
		this.shades = [];
		this.levels = levels; //Integer greater than 0 that represents the number of contrast steps from the base color to map.
		this.shadeBuffer = shadeBuffer; //Decimal between 0 and 1 representing as a % of lightness how far the final shade should be from pure black.
		this.tintBuffer = tintBuffer; //Decimal between 0 and 1 representing as a % of lightness how far the final tint should be from pure white.
		this.baseHSLHasBeenMapped = false;
		this.gradientHasBeenMapped = false;
		this.validateConstructorArgs();
	}

	validateConstructorArgs() {
		if (this.levels <= 0) {
			this.levels = 1;
		}
		if (this.shadeBuffer <= 0 || this.shadeBuffer > 1) {
			this.shadeBuffer = 1.0 / 100;
		}
		if (this.tintBuffer <= 0 || this.tintBuffer > 1) {
			this.tintBuffer = 1.0 / 100;
		}
		if (this.baseColorHex.length != 4 && this.baseColorHex.length != 7) {
			this.baseColorHex = "#000";
		}
	}

	setBaseColor(hexColor) {
		if (hexColor.length != 4 && hexColor.length != 7) {
			console.log(
				'Invalid argument for base color "' +
					hexColor +
					'". Color must be specified in hex.'
			);
		} else {
			this.baseColorHex = hexColor;
			this.baseHSLHasBeenMapped = false;
			this.gradientHasBeenMapped = false;
			this.baseColorHue = 0;
			this.baseColorSaturation = 0;
			this.baseColorLightness = 0;
			this.baseColorHSL = "hsl(0,0%,0%)";
			this.tints = [];
			this.shades = [];
		}
	}

	map() {
		this.mapBaseHSL();
		this.mapGradient();
	}

	hasBeenMapped() {
		return this.baseHSLHasBeenMapped && this.gradientHasBeenMapped;
	}

	baseColorIsShade() {
		if (this.baseColorLightness < 0.5) {
			return true;
		} else {
			return false;
		}
	}

	mapBaseHSL() {
		this.baseColorHSL = this.hexToHSL(this.baseColorHex);
		let values = this.hslColorToValues(this.baseColorHSL);
		this.baseColorHue = values[0];
		this.baseColorSaturation = values[1];
		this.baseColorLightness = values[2];
		this.baseHSLHasBeenMapped = true;
	}

	mapGradient() {
		this.mapTints();
		this.mapShades();
		this.gradientHasBeenMapped = true;
	}

	mapTints() {
		this.tints = [];
		let bufferToUse = this.tintBuffer;
		if (1.0 - bufferToUse <= this.baseColorLightness) {
			bufferToUse = 0.0;
		}

		let tintRange = 1 - bufferToUse - this.baseColorLightness;
		let tintIncrement = tintRange / this.levels;

		for (let i = 0; i < this.levels; i++) {
			let newLightness = this.baseColorLightness + (i + 1) * tintIncrement;
			newLightness = Math.min(newLightness, 1.0);
			let newTint = this.hslValuesToHex(
				this.baseColorHue,
				this.baseColorSaturation,
				newLightness
			);
			this.tints.push(newTint);
		}
	}

	mapShades() {
		this.shades = [];
		let bufferToUse = this.shadeBuffer;
		if (0.0 + bufferToUse >= this.baseColorLightness) {
			bufferToUse = 0.0;
		}

		let shadeRange = this.baseColorLightness - bufferToUse;
		let shadeIncrement = shadeRange / this.levels;

		for (let i = 0; i < this.levels; i++) {
			let newLightness = this.baseColorLightness - (i + 1) * shadeIncrement;
			newLightness = Math.max(newLightness, 0.0);
			let newShade = this.hslValuesToHex(
				this.baseColorHue,
				this.baseColorSaturation,
				newLightness
			);
			this.shades.push(newShade);
		}
	}

	// COLOR CONVERSION FUNCTIONS: Copied and/or adapted from CSS-Tricks.com
	// Ref: https://css-tricks.com/converting-color-spaces-in-javascript/

	hslColorToValues(hslColor) {
		let sep = hslColor.indexOf(",") > -1 ? "," : " ";
		hslColor = hslColor
			.substr(4)
			.split(")")[0]
			.split(sep);

		let hue = hslColor[0] * 1,
			saturation = hslColor[1].substr(0, hslColor[1].length - 1) / 100,
			lightness = hslColor[2].substr(0, hslColor[2].length - 1) / 100;

		return [hue, saturation, lightness];
	}

	hexToHSL(hexColor) {
		// Convert hex to RGB first
		let r = 0,
			g = 0,
			b = 0;
		if (hexColor.length == 4) {
			r = "0x" + hexColor[1] + hexColor[1];
			g = "0x" + hexColor[2] + hexColor[2];
			b = "0x" + hexColor[3] + hexColor[3];
		} else if (hexColor.length == 7) {
			r = "0x" + hexColor[1] + hexColor[2];
			g = "0x" + hexColor[3] + hexColor[4];
			b = "0x" + hexColor[5] + hexColor[6];
		}
		// Then to HSL
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return "hsl(" + h + "," + s + "%," + l + "%)";
	}

	hslValuesToHex(h, s, l) {
		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}
		// Having obtained RGB, convert channels to hex
		r = Math.round((r + m) * 255).toString(16);
		g = Math.round((g + m) * 255).toString(16);
		b = Math.round((b + m) * 255).toString(16);

		// Prepend 0s, if necessary
		if (r.length == 1) r = "0" + r;
		if (g.length == 1) g = "0" + g;
		if (b.length == 1) b = "0" + b;

		return "#" + r + g + b;
	}
}

class PaletteGradient {
	constructor(designation, luminosityGradient) {
		if (designation === undefined) {
			designation = "neutral";
		}
		if (luminosityGradient === undefined) {
			luminosityGradient = new LuminosityGradient();
		}
		this.designation = designation;
		this.baseName = "--" + designation;
		this.luminosityGradient = luminosityGradient;

		this.weakContrasts = [];
		this.weakContrastNames = [];

		this.strongContrasts = [];
		this.strongContrastNames = [];
	}

	getBaseColorName() {
		return this.baseName;
	}

	getBaseColorHex() {
		return this.luminosityGradient.baseColorHex;
	}

	map() {
		let weakContrasts = this.getWeakContrasts();
		this.weakContrasts = weakContrasts[1];
		this.weakContrastNames = weakContrasts[0];

		let strongContrasts = this.getStrongContrasts();
		this.strongContrasts = strongContrasts[1];
		this.strongContrastNames = strongContrasts[0];
	}

	getWeakContrasts() {
		if (!this.luminosityGradient.hasBeenMapped()) {
			this.luminosityGradient.map();
		}
		let names = [];
		let weakContrasts = [];
		let weakContrastsRefined = [];
		let maxWeakContrast;
		if (this.luminosityGradient.baseColorIsShade()) {
			weakContrasts = this.luminosityGradient.shades;
			maxWeakContrast = "#000000";
		} else {
			weakContrasts = this.luminosityGradient.tints;
			maxWeakContrast = "#ffffff";
		}
		for (let i = 0; i < weakContrasts.length; i++) {
			let isMaxWeakContrast = weakContrasts[i] == maxWeakContrast;
			if (!isMaxWeakContrast) {
				weakContrastsRefined.push(weakContrasts[i]);
			}
		}
		for (let i = 0; i < weakContrastsRefined.length; i++) {
			names.push("--" + this.designation + "---" + (i + 1));
		}
		names.push("--" + this.designation + "---max");
		weakContrastsRefined.push(maxWeakContrast);
		return [names, weakContrastsRefined];
	}

	getStrongContrasts() {
		if (!this.luminosityGradient.hasBeenMapped()) {
			this.luminosityGradient.map();
		}
		let names = [];
		let strongContrasts = [];
		let strongContrastsRefined = [];
		let maxStrongContrast;
		if (this.luminosityGradient.baseColorIsShade()) {
			strongContrasts = this.luminosityGradient.tints;
			maxStrongContrast = "#ffffff";
		} else {
			strongContrasts = this.luminosityGradient.shades;
			maxStrongContrast = "#000000";
		}
		for (let i = 0; i < strongContrasts.length; i++) {
			let isMaxStrongContrast = strongContrasts[i] == maxStrongContrast;
			if (!isMaxStrongContrast) {
				strongContrastsRefined.push(strongContrasts[i]);
			}
		}
		for (let i = 0; i < strongContrastsRefined.length; i++) {
			names.push("--" + this.designation + "-" + (i + 1));
		}
		names.push("--" + this.designation + "-max");
		strongContrastsRefined.push(maxStrongContrast);
		return [names, strongContrastsRefined];
	}
}

class SitePalette {
	constructor(baseColorsMap, levels, shadeBuffer, tintBuffer) {
		if (baseColorsMap === undefined) {
			baseColorsMap = new Map();
			baseColorsMap.set("primary", "#192d49");
			baseColorsMap.set("secondary", "#468189");
			baseColorsMap.set("compliment", "#f6edd6");
		}
		if (levels === undefined) {
			levels = 5;
		}
		if (shadeBuffer === undefined) {
			shadeBuffer = 1.0 / 100;
		}
		if (tintBuffer === undefined) {
			tintBuffer = 1.0 / 100;
		}
		this.baseColorsMap = baseColorsMap;
		this.levels = levels;
		this.shadeBuffer = shadeBuffer;
		this.tintBuffer = tintBuffer;
		this.paletteGradients = new Map();
		this.generatePalette();
	}

	generatePalette() {
		for (let entry of this.baseColorsMap) {
			let baseColorName = entry[0];
			let baseColorHex = entry[1];

			let luminosityGradient = new LuminosityGradient(
				baseColorHex,
				this.levels,
				this.shadeBuffer,
				this.tintBuffer
			);
			let paletteGradient = new PaletteGradient(
				baseColorName,
				luminosityGradient
			);
			paletteGradient.map();
			this.paletteGradients.set(baseColorName, paletteGradient);
		}
	}

	mapPaletteToRoot() {
		const rootStyle = document.documentElement.style;

		for (let entry of this.paletteGradients.values()) {
			let baseColorName = entry.getBaseColorName();
			let baseColorHex = entry.getBaseColorHex();
			rootStyle.setProperty(baseColorName, baseColorHex);

			let strongContrastNames = entry.strongContrastNames;
			let strongContrasts = entry.strongContrasts;
			for (let i = 0; i < strongContrastNames.length; i++) {
				rootStyle.setProperty(strongContrastNames[i], strongContrasts[i]);
			}

			let weakContrastNames = entry.weakContrastNames;
			let weakContrasts = entry.weakContrasts;
			for (let i = 0; i < weakContrastNames.length; i++) {
				rootStyle.setProperty(weakContrastNames[i], weakContrasts[i]);
			}
		}
	}

	getAllColors() {
		let allColors = new Map();
		for (let entry of this.paletteGradients.values()) {
			let baseColorName = entry.getBaseColorName();
			let baseColorHex = entry.getBaseColorHex();
			allColors.set(baseColorName, baseColorHex);

			let strongContrastNames = entry.strongContrastNames;
			let strongContrasts = entry.strongContrasts;
			for (let i = 0; i < strongContrastNames.length; i++) {
				allColors.set(strongContrastNames[i], strongContrasts[i]);
			}

			let weakContrastNames = entry.weakContrastNames;
			let weakContrasts = entry.weakContrasts;
			for (let i = 0; i < weakContrastNames.length; i++) {
				allColors.set(weakContrastNames[i], weakContrasts[i]);
			}
		}
		return allColors;
	}
}

// COLOR MAPPING PARAMETERS -------------------------------------------------------------
let levels = 8; // How many contrast steps away from the base color do you want mapped? (applies to both tints and shades)
let shadeBuffer = 0.1; //How far (percentage-wise) do you want the darkest shades to be from pure black?
let tintBuffer = 0.1; //How far (percentage-wise) do you want the lightest tints to be from pure white?
let baseColorsMap = new Map();
baseColorsMap.set("primary", "#192d49");
baseColorsMap.set("secondary", "#468189");
baseColorsMap.set("compliment", "#f6edd6");
baseColorsMap.set("neutral", "#808080");

let sitePalette = new SitePalette(
	baseColorsMap,
	levels,
	shadeBuffer,
	tintBuffer
);
sitePalette.mapPaletteToRoot();
