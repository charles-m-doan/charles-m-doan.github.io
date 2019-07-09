// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/WebsiteColorMapping.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// INPUT COLOR MAPPING PARAMETERS AT THE BOTTOM OF THIS FILE
var LuminosityGradient =
/*#__PURE__*/
function () {
  function LuminosityGradient(baseColorHex, levels, shadeBuffer, tintBuffer) {
    _classCallCheck(this, LuminosityGradient);

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

  _createClass(LuminosityGradient, [{
    key: "validateConstructorArgs",
    value: function validateConstructorArgs() {
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
  }, {
    key: "setBaseColor",
    value: function setBaseColor(hexColor) {
      if (hexColor.length != 4 && hexColor.length != 7) {
        console.log('Invalid argument for base color "' + hexColor + '". Color must be specified in hex.');
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
  }, {
    key: "map",
    value: function map() {
      this.mapBaseHSL();
      this.mapGradient();
    }
  }, {
    key: "hasBeenMapped",
    value: function hasBeenMapped() {
      return this.baseHSLHasBeenMapped && this.gradientHasBeenMapped;
    }
  }, {
    key: "baseColorIsShade",
    value: function baseColorIsShade() {
      if (this.baseColorLightness < 0.5) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "mapBaseHSL",
    value: function mapBaseHSL() {
      this.baseColorHSL = this.hexToHSL(this.baseColorHex);
      var values = this.hslColorToValues(this.baseColorHSL);
      this.baseColorHue = values[0];
      this.baseColorSaturation = values[1];
      this.baseColorLightness = values[2];
      this.baseHSLHasBeenMapped = true;
    }
  }, {
    key: "mapGradient",
    value: function mapGradient() {
      this.mapTints();
      this.mapShades();
      this.gradientHasBeenMapped = true;
    }
  }, {
    key: "mapTints",
    value: function mapTints() {
      this.tints = [];
      var bufferToUse = this.tintBuffer;

      if (1.0 - bufferToUse <= this.baseColorLightness) {
        bufferToUse = 0.0;
      }

      var tintRange = 1 - bufferToUse - this.baseColorLightness;
      var tintIncrement = tintRange / this.levels;

      for (var i = 0; i < this.levels; i++) {
        var newLightness = this.baseColorLightness + (i + 1) * tintIncrement;
        newLightness = Math.min(newLightness, 1.0);
        var newTint = this.hslValuesToHex(this.baseColorHue, this.baseColorSaturation, newLightness);
        this.tints.push(newTint);
      }
    }
  }, {
    key: "mapShades",
    value: function mapShades() {
      this.shades = [];
      var bufferToUse = this.shadeBuffer;

      if (0.0 + bufferToUse >= this.baseColorLightness) {
        bufferToUse = 0.0;
      }

      var shadeRange = this.baseColorLightness - bufferToUse;
      var shadeIncrement = shadeRange / this.levels;

      for (var i = 0; i < this.levels; i++) {
        var newLightness = this.baseColorLightness - (i + 1) * shadeIncrement;
        newLightness = Math.max(newLightness, 0.0);
        var newShade = this.hslValuesToHex(this.baseColorHue, this.baseColorSaturation, newLightness);
        this.shades.push(newShade);
      }
    } // COLOR CONVERSION FUNCTIONS: Copied and/or adapted from CSS-Tricks.com
    // Ref: https://css-tricks.com/converting-color-spaces-in-javascript/

  }, {
    key: "hslColorToValues",
    value: function hslColorToValues(hslColor) {
      var sep = hslColor.indexOf(",") > -1 ? "," : " ";
      hslColor = hslColor.substr(4).split(")")[0].split(sep);
      var hue = hslColor[0] * 1,
          saturation = hslColor[1].substr(0, hslColor[1].length - 1) / 100,
          lightness = hslColor[2].substr(0, hslColor[2].length - 1) / 100;
      return [hue, saturation, lightness];
    }
  }, {
    key: "hexToHSL",
    value: function hexToHSL(hexColor) {
      // Convert hex to RGB first
      var r = 0,
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
      } // Then to HSL


      r /= 255;
      g /= 255;
      b /= 255;
      var cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;
      if (delta == 0) h = 0;else if (cmax == r) h = (g - b) / delta % 6;else if (cmax == g) h = (b - r) / delta + 2;else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      return "hsl(" + h + "," + s + "%," + l + "%)";
    }
  }, {
    key: "hslValuesToHex",
    value: function hslValuesToHex(h, s, l) {
      var c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs(h / 60 % 2 - 1)),
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
      } // Having obtained RGB, convert channels to hex


      r = Math.round((r + m) * 255).toString(16);
      g = Math.round((g + m) * 255).toString(16);
      b = Math.round((b + m) * 255).toString(16); // Prepend 0s, if necessary

      if (r.length == 1) r = "0" + r;
      if (g.length == 1) g = "0" + g;
      if (b.length == 1) b = "0" + b;
      return "#" + r + g + b;
    }
  }]);

  return LuminosityGradient;
}();

var PaletteGradient =
/*#__PURE__*/
function () {
  function PaletteGradient(designation, luminosityGradient) {
    _classCallCheck(this, PaletteGradient);

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

  _createClass(PaletteGradient, [{
    key: "getBaseColorName",
    value: function getBaseColorName() {
      return this.baseName;
    }
  }, {
    key: "getBaseColorHex",
    value: function getBaseColorHex() {
      return this.luminosityGradient.baseColorHex;
    }
  }, {
    key: "map",
    value: function map() {
      var weakContrasts = this.getWeakContrasts();
      this.weakContrasts = weakContrasts[1];
      this.weakContrastNames = weakContrasts[0];
      var strongContrasts = this.getStrongContrasts();
      this.strongContrasts = strongContrasts[1];
      this.strongContrastNames = strongContrasts[0];
    }
  }, {
    key: "getWeakContrasts",
    value: function getWeakContrasts() {
      if (!this.luminosityGradient.hasBeenMapped()) {
        this.luminosityGradient.map();
      }

      var names = [];
      var weakContrasts = [];
      var weakContrastsRefined = [];
      var maxWeakContrast;

      if (this.luminosityGradient.baseColorIsShade()) {
        weakContrasts = this.luminosityGradient.shades;
        maxWeakContrast = "#000000";
      } else {
        weakContrasts = this.luminosityGradient.tints;
        maxWeakContrast = "#ffffff";
      }

      for (var i = 0; i < weakContrasts.length; i++) {
        var isMaxWeakContrast = weakContrasts[i] == maxWeakContrast;

        if (!isMaxWeakContrast) {
          weakContrastsRefined.push(weakContrasts[i]);
        }
      }

      for (var _i = 0; _i < weakContrastsRefined.length; _i++) {
        names.push("--" + this.designation + "---" + (_i + 1));
      }

      names.push("--" + this.designation + "---max");
      weakContrastsRefined.push(maxWeakContrast);
      return [names, weakContrastsRefined];
    }
  }, {
    key: "getStrongContrasts",
    value: function getStrongContrasts() {
      if (!this.luminosityGradient.hasBeenMapped()) {
        this.luminosityGradient.map();
      }

      var names = [];
      var strongContrasts = [];
      var strongContrastsRefined = [];
      var maxStrongContrast;

      if (this.luminosityGradient.baseColorIsShade()) {
        strongContrasts = this.luminosityGradient.tints;
        maxStrongContrast = "#ffffff";
      } else {
        strongContrasts = this.luminosityGradient.shades;
        maxStrongContrast = "#000000";
      }

      for (var i = 0; i < strongContrasts.length; i++) {
        var isMaxStrongContrast = strongContrasts[i] == maxStrongContrast;

        if (!isMaxStrongContrast) {
          strongContrastsRefined.push(strongContrasts[i]);
        }
      }

      for (var _i2 = 0; _i2 < strongContrastsRefined.length; _i2++) {
        names.push("--" + this.designation + "-" + (_i2 + 1));
      }

      names.push("--" + this.designation + "-max");
      strongContrastsRefined.push(maxStrongContrast);
      return [names, strongContrastsRefined];
    }
  }]);

  return PaletteGradient;
}();

var SitePalette =
/*#__PURE__*/
function () {
  function SitePalette(baseColorsMap, levels, shadeBuffer, tintBuffer) {
    _classCallCheck(this, SitePalette);

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

  _createClass(SitePalette, [{
    key: "generatePalette",
    value: function generatePalette() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.baseColorsMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;
          var baseColorName = entry[0];
          var baseColorHex = entry[1];
          var luminosityGradient = new LuminosityGradient(baseColorHex, this.levels, this.shadeBuffer, this.tintBuffer);
          var paletteGradient = new PaletteGradient(baseColorName, luminosityGradient);
          paletteGradient.map();
          this.paletteGradients.set(baseColorName, paletteGradient);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "mapPaletteToRoot",
    value: function mapPaletteToRoot() {
      var rootStyle = document.documentElement.style;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.paletteGradients.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var entry = _step2.value;
          var baseColorName = entry.getBaseColorName();
          var baseColorHex = entry.getBaseColorHex();
          rootStyle.setProperty(baseColorName, baseColorHex);
          var strongContrastNames = entry.strongContrastNames;
          var strongContrasts = entry.strongContrasts;

          for (var i = 0; i < strongContrastNames.length; i++) {
            rootStyle.setProperty(strongContrastNames[i], strongContrasts[i]);
          }

          var weakContrastNames = entry.weakContrastNames;
          var weakContrasts = entry.weakContrasts;

          for (var _i3 = 0; _i3 < weakContrastNames.length; _i3++) {
            rootStyle.setProperty(weakContrastNames[_i3], weakContrasts[_i3]);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "getAllColors",
    value: function getAllColors() {
      var allColors = new Map();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.paletteGradients.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var entry = _step3.value;
          var baseColorName = entry.getBaseColorName();
          var baseColorHex = entry.getBaseColorHex();
          allColors.set(baseColorName, baseColorHex);
          var strongContrastNames = entry.strongContrastNames;
          var strongContrasts = entry.strongContrasts;

          for (var i = 0; i < strongContrastNames.length; i++) {
            allColors.set(strongContrastNames[i], strongContrasts[i]);
          }

          var weakContrastNames = entry.weakContrastNames;
          var weakContrasts = entry.weakContrasts;

          for (var _i4 = 0; _i4 < weakContrastNames.length; _i4++) {
            allColors.set(weakContrastNames[_i4], weakContrasts[_i4]);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return allColors;
    }
  }]);

  return SitePalette;
}(); // COLOR MAPPING PARAMETERS -------------------------------------------------------------


var levels = 8; // How many contrast steps away from the base color do you want mapped? (applies to both tints and shades)

var shadeBuffer = 0.1; //How far (percentage-wise) do you want the darkest shades to be from pure black?

var tintBuffer = 0.1; //How far (percentage-wise) do you want the lightest tints to be from pure white?

var baseColorsMap = new Map();
baseColorsMap.set("primary", "#192d49");
baseColorsMap.set("secondary", "#468189");
baseColorsMap.set("compliment", "#f6edd6");
baseColorsMap.set("neutral", "#808080"); // baseColorsMap.set("primary", "#b3c8e5");
// baseColorsMap.set("secondary", "#78b2ba");
// baseColorsMap.set("compliment", "#3f320d");
// baseColorsMap.set("neutral", "#808080");

var sitePalette = new SitePalette(baseColorsMap, levels, shadeBuffer, tintBuffer);
sitePalette.mapPaletteToRoot();
},{}],"../../../Users/cmatt/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62596" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/cmatt/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/WebsiteColorMapping.js"], null)
//# sourceMappingURL=/WebsiteColorMapping.2c2c2183.js.map