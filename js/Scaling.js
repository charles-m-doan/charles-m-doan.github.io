const root = document.documentElement;
const minFontSizeInPx = 15;
const maxFontSizeInPx = 23;
const fontScalingFactor = maxFontSizeInPx - minFontSizeInPx;
const minWidth = 320;
const maxWidth = 1920;

function adjustRootFontSizeRelativeToViewportWidth() {
	var width = Math.max(root.clientWidth, window.innerWidth || 0);
	var numerator = width - minWidth;
	var denominator = maxWidth - minWidth;
	var proportion = numerator / denominator;
	proportion = Math.max(proportion, 0);
	proportion = Math.min(proportion, 1);
	var baseFontSize = minFontSizeInPx + proportion * fontScalingFactor;
	root.style.setProperty("--base-font-size", baseFontSize + "px");
}

document.getElementsByTagName("body")[0].onload = function() {
	adjustRootFontSizeRelativeToViewportWidth();
};

document.getElementsByTagName("body")[0].onresize = function() {
	adjustRootFontSizeRelativeToViewportWidth();
};
