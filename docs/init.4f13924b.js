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
})({"lA8h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeModal = exports.togglePoopBag = exports.modScene = exports.modFox = void 0;

const modFox = function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};

exports.modFox = modFox;

const modScene = function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};

exports.modScene = modScene;

const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

exports.togglePoopBag = togglePoopBag;

const writeModal = function writeModal(text = "") {
  document.querySelector(".modal").innerHTML = `<div class="modal-inner">${text}</div>`;
};

exports.writeModal = writeModal;
},{}],"iJA9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextPoopTime = exports.getNextDieTime = exports.getNextHungerTime = exports.NIGHT_LENGTH = exports.DAY_LENGTH = exports.RAIN_CHANCE = exports.SCENES = exports.TICK_RATE = exports.ICONS = void 0;
const ICONS = ["fish", "poop", "weather"];
exports.ICONS = ICONS;
const TICK_RATE = 3000;
exports.TICK_RATE = TICK_RATE;
const SCENES = ["day", "rain"];
exports.SCENES = SCENES;
const RAIN_CHANCE = 0.2;
exports.RAIN_CHANCE = RAIN_CHANCE;
const DAY_LENGTH = 60;
exports.DAY_LENGTH = DAY_LENGTH;
const NIGHT_LENGTH = 4;
exports.NIGHT_LENGTH = NIGHT_LENGTH;

const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 5 + clock;

exports.getNextHungerTime = getNextHungerTime;

const getNextDieTime = clock => Math.floor(Math.random() * 2) + 3 + clock;

exports.getNextDieTime = getNextDieTime;

const getNextPoopTime = clock => Math.floor(Math.random() * 3) + 4 + clock;

exports.getNextPoopTime = getNextPoopTime;
},{}],"Oo4C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.handleUserAction = void 0;

var _ui = require("./ui");

var _constants = require("./constants");

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  poopTime: -1,

  tick() {
    this.clock++;

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }

    return this.clock;
  },

  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    (0, _ui.modFox)("egg");
    (0, _ui.modScene)("day");
    (0, _ui.writeModal)();
  },

  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    (0, _ui.modFox)("idling");
    this.scene = Math.random() > _constants.RAIN_CHANCE ? 0 : 1;
    (0, _ui.modScene)(_constants.SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + _constants.DAY_LENGTH;
    this.hungryTime = (0, _constants.getNextHungerTime)(this.clock);
  },

  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  },

  sleep() {
    this.state = "SLEEP";
    (0, _ui.modFox)("sleep");
    (0, _ui.modScene)("night");
    this.wakeTime = this.clock + _constants.NIGHT_LENGTH;
    this.clearTimes();
    this.wakeTime = this.clock + _constants.NIGHT_LENGTH;
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = (0, _constants.getNextDieTime)(this.clock);
    this.hungryTime = -1;
    (0, _ui.modFox)("hungry");
  },

  feed() {
    // can only feed when hungry
    if (this.current !== "HUNGRY") {
      return;
    }

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = (0, _constants.getNextPoopTime)(this.clock);
    (0, _ui.modFox)("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },

  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = (0, _constants.getNextDieTime)(this.clock);
    (0, _ui.modFox)("pooping");
  },

  startCelebrating() {
    this.current = "CELEBRATING";
    (0, _ui.modFox)("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },

  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    (0, _ui.togglePoopBag)(false);
  },

  determineFoxState() {
    if (this.current === 'IDLING') {
      if (_constants.SCENES[this.scene] === "rain") {
        (0, _ui.modFox)("rain");
      } else {
        (0, _ui.modFox)("idling");
      }
    }
  },

  die() {
    this.current = "DEAD";
    (0, _ui.modScene)("dead");
    (0, _ui.modFox)("dead");
    this.clearTimes();
    (0, _ui.writeModal)("The fox died :( <br/> Press the middle button to start");
  },

  handleUserAction(icon) {
    // can't do actions while in these states
    if (["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)) {
      // do nothing
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    } // execute the currently selected action


    switch (icon) {
      case "weather":
        this.changeWeather();
        break;

      case "poop":
        this.cleanUpPoop();
        break;

      case "fish":
        this.feed();
        break;
    }
  },

  changeWeather() {
    this.scene = (1 + this.scene) % _constants.SCENES.length;
    (0, _ui.modScene)(_constants.SCENES[this.scene]);
    this.determineFoxState();
  },

  cleanUpPoop() {
    if (this.current === "POOPING") {
      this.dieTime = -1;
      (0, _ui.togglePoopBag)(true);
      this.startCelebrating();
      this.hungryTime = (0, _constants.getNextHungerTime)(this.clock);
    }
  }

};
const handleUserAction = gameState.handleUserAction.bind(gameState);
exports.handleUserAction = handleUserAction;
var _default = gameState;
exports.default = _default;
},{"./ui":"lA8h","./constants":"iJA9"}],"Vgpl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initButtons;

var _constants = require("./constants");

const toggleHighlighted = (icon, show) => document.querySelector(`.${_constants.ICONS[icon]}-icon`).classList.toggle("highlighted", show);

function initButtons(handleUserAction) {
  let selectedIcon = 0;

  function buttonClick({
    target
  }) {
    if (target.classList.contains("left-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % _constants.ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % _constants.ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleUserAction(_constants.ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
},{"./constants":"iJA9"}],"FyzG":[function(require,module,exports) {
"use strict";

var _gameState = _interopRequireWildcard(require("./gameState"));

var _buttons = _interopRequireDefault(require("./buttons"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function init() {
  (0, _buttons.default)(_gameState.handleUserAction);
  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      _gameState.default.tick();

      nextTimeToTick = now + _constants.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
},{"./gameState":"Oo4C","./buttons":"Vgpl","./constants":"iJA9"}]},{},["FyzG"], null)