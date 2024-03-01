// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4yBzl":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0b9aed92d798abb8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8QSpP":[function(require,module,exports) {
var _aigameController = require("./AIGameController");
var _display = require("./Display");
var _game = require("./Game");
var _localGameController = require("./LocalGameController");
let game = new (0, _game.Game)(11);
let display = new (0, _display.Display)(4, game);
function startTwoPlayerGame() {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new (0, _game.Game)(11);
    display = new (0, _display.Display)(4, game);
    display.draw();
    display.addInputHandling(new (0, _localGameController.LocalGameController)(display));
}
function startAIGame() {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new (0, _game.Game)(11);
    display = new (0, _display.Display)(4, game);
    display.draw();
    const controller = new (0, _aigameController.AIGameController)(display);
    const selectedRadioButton = document.querySelector('input[name="player-start-color"]:checked');
    switch(selectedRadioButton.value){
        case "player-red":
            break;
        case "player-blue":
            setTimeout(controller.aiMove.bind(controller), 500);
            break;
        case "player-random-color":
            if (Math.random() < 0.5) setTimeout(controller.aiMove.bind(controller), 500);
            break;
        default:
            throw new Error("Unexpected value.");
    }
    display.addInputHandling(controller);
}
// event handler for new game button
const newGameButton = document.getElementById("new-game-button");
newGameButton.onclick = ()=>{
    newGameButton.classList.add("button-highlight");
    newGameAIButton.classList.remove("button-highlight");
    startTwoPlayerGame();
};
// event handler for new game with AI button
const newGameAIButton = document.getElementById("new-game-ai-button");
newGameAIButton.onclick = ()=>{
    newGameAIButton.classList.add("button-highlight");
    newGameButton.classList.remove("button-highlight");
    startAIGame();
};
// start game
startTwoPlayerGame();

},{"./AIGameController":"jWLWF","./Display":"jd82i","./Game":"TyEjs","./LocalGameController":"1m7Wr"}],"jWLWF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AIGameController", ()=>AIGameController);
var _token = require("./Token");
var _gameEvaluator = require("./GameEvaluator");
class AIGameController {
    constructor(display){
        this.display = display;
        this.game = display.game;
        this.evaluator = new (0, _gameEvaluator.GameEvaluator)(this.game.board, 1);
        this.firstMovePlayed = false;
    }
    applyMove(x, y) {
        this.placeToken(x, y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else {
            this.game.switchPlayer();
            if (this.firstMovePlayed) setTimeout(this.aiMove.bind(this), 200);
            else setTimeout(this.aiRandomMove.bind(this), 200);
        }
    }
    aiMove() {
        let bestMove;
        if (this.firstMovePlayed) bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
        else if (this.game.getCurrentPlayer() === (0, _token.Token).RED) bestMove = this.evaluator.chooseOpeningRedMove();
        this.placeToken(bestMove.x, bestMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    aiRandomMove() {
        let availableMoves = [];
        for (const node of this.game.board.playableNodes())if (node.getToken() === (0, _token.Token).EMPTY) availableMoves.push(node);
        if (availableMoves.length === 0) throw Error("No available moves");
        const random = Math.floor(Math.random() * availableMoves.length);
        const randomMove = availableMoves[random];
        this.placeToken(randomMove.x, randomMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    placeToken(x, y) {
        this.firstMovePlayed = true;
        this.display.fillHexagon(x, y, this.game.getCurrentPlayer());
        this.game.placeToken(x, y);
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}

},{"./Token":"laOB7","./GameEvaluator":"i29ac","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"laOB7":[function(require,module,exports) {
/**
 * Represents the three possible, singular states of each tile on the Hex game board.
 * The common convention is for red to go first.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Token", ()=>Token);
var Token;
(function(Token) {
    Token[Token["RED"] = 0] = "RED";
    Token[Token["BLUE"] = 1] = "BLUE";
    Token[Token["EMPTY"] = 2] = "EMPTY";
})(Token || (Token = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"i29ac":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameEvaluator", ()=>GameEvaluator);
var _board = require("./Board");
var _token = require("./Token");
var _module = require("module");
class GameEvaluator {
    static #_ = (()=>{
        this.MINIMAX_MAX_VAL = 1000;
    })();
    static #_1 = (()=>{
        this.MINIMAX_MIN_VAL = -1000;
    })();
    static #_2 = (()=>{
        this.MAXIMIZER_TOKEN = (0, _token.Token).RED;
    })();
    static #_3 = (()=>{
        this.MINIMIZER_TOKEN = (0, _token.Token).BLUE;
    })();
    static #_4 = (()=>{
        this.openingMoves = [
            (0, _board.Board).Board11x11.getNode(1, 2),
            (0, _board.Board).Board11x11.getNode(3, 0),
            (0, _board.Board).Board11x11.getNode(5, 0),
            (0, _board.Board).Board11x11.getNode(6, 0),
            (0, _board.Board).Board11x11.getNode(7, 0),
            (0, _board.Board).Board11x11.getNode(8, 0),
            (0, _board.Board).Board11x11.getNode(9, 0),
            (0, _board.Board).Board11x11.getNode(10, 0),
            (0, _board.Board).Board11x11.getNode(2, 5),
            (0, _board.Board).Board11x11.getNode(9, 2),
            (0, _board.Board).Board11x11.getNode(8, 5),
            (0, _board.Board).Board11x11.getNode(1, 8),
            (0, _board.Board).Board11x11.getNode(0, 10),
            (0, _board.Board).Board11x11.getNode(2, 10),
            (0, _board.Board).Board11x11.getNode(3, 10),
            (0, _board.Board).Board11x11.getNode(5, 10),
            (0, _board.Board).Board11x11.getNode(6, 10),
            (0, _board.Board).Board11x11.getNode(7, 10),
            (0, _board.Board).Board11x11.getNode(8, 10)
        ];
    })();
    constructor(board, searchDepth){
        this.board = board;
        this.searchDepth = searchDepth;
    }
    chooseBestMove(tokenToPlace) {
        if (tokenToPlace === (0, _token.Token).RED) return this.chooseBestMoveAsMaximizer();
        return this.chooseBestMoveAsMinimizer();
    }
    chooseOpeningRedMove() {
        const rand1 = Math.floor(Math.random() * 3 + 4);
        const rand2 = Math.floor(Math.random() * 3 + 4);
        return this.board.getNode(rand1, rand2);
    }
    chooseBestMoveAsMaximizer() {
        let max = GameEvaluator.MINIMAX_MIN_VAL - 1;
        let bestMove;
        for (const node of this.board.playableNodes())if (node.getToken() === (0, _token.Token).EMPTY) {
            node.setToken(GameEvaluator.MAXIMIZER_TOKEN);
            const evalResult = this.minimax(this.searchDepth, false);
            node.setToken((0, _token.Token).EMPTY);
            if (evalResult > max) {
                max = evalResult;
                bestMove = node;
            }
        }
        return bestMove;
    }
    chooseBestMoveAsMinimizer() {
        let min = GameEvaluator.MINIMAX_MAX_VAL + 1;
        let bestMove;
        for (const node of this.board.playableNodes())if (node.getToken() === (0, _token.Token).EMPTY) {
            node.setToken(GameEvaluator.MINIMIZER_TOKEN);
            const evalResult = this.minimax(this.searchDepth, true);
            node.setToken((0, _token.Token).EMPTY);
            if (evalResult < min) {
                min = evalResult;
                bestMove = node;
            }
        }
        return bestMove;
    }
    evaluate() {
        const redMovesLeft = this.board.shortestPathLength(this.board.topVirtualNode, this.board.bottomVirtualNode, (0, _token.Token).RED);
        const blueMovesLeft = this.board.shortestPathLength(this.board.leftVirtualNode, this.board.rightVirtualNode, (0, _token.Token).BLUE);
        return blueMovesLeft - redMovesLeft;
    }
    minimax(depth, isMax) {
        return this._minimax(depth, isMax, GameEvaluator.MINIMAX_MIN_VAL, GameEvaluator.MINIMAX_MAX_VAL);
    }
    _minimax(depth, isMax, alpha, beta) {
        const evaluation = this.evaluate();
        if (evaluation === GameEvaluator.MINIMAX_MAX_VAL) return GameEvaluator.MINIMAX_MAX_VAL;
        if (evaluation === GameEvaluator.MINIMAX_MIN_VAL) return GameEvaluator.MINIMAX_MIN_VAL;
        if (depth === 0) return evaluation;
        const currentToken = isMax ? (0, _token.Token).RED : (0, _token.Token).BLUE;
        if (isMax) {
            let best = GameEvaluator.MINIMAX_MIN_VAL;
            for (const node of this.board.nodes)if (node.getToken() === (0, _token.Token).EMPTY) {
                this.board.putToken(node.x, node.y, currentToken);
                best = Math.max(best, this._minimax(depth - 1, !isMax, alpha, beta));
                this.board.removeToken(node.x, node.y);
                if (best > beta) break;
                alpha = Math.max(alpha, best);
            }
            return best;
        } else {
            let best = GameEvaluator.MINIMAX_MAX_VAL;
            for (const node of this.board.nodes)if (node.getToken() === (0, _token.Token).EMPTY) {
                this.board.putToken(node.x, node.y, currentToken);
                best = Math.min(best, this._minimax(depth - 1, !isMax, alpha, beta));
                this.board.removeToken(node.x, node.y);
                if (best < alpha) break;
                beta = Math.min(beta, best);
            }
            return best;
        }
    }
}

},{"./Board":"4daYq","./Token":"laOB7","module":"jhUEF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4daYq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Model of the Hex game board, which is a grid of hexagonal 
 * tiles (nodes) containing player tokens. 
 */ parcelHelpers.export(exports, "Board", ()=>Board);
var _token = require("./Token");
var _hexNode = require("./HexNode");
var _deque = require("./Deque");
class Board {
    static #_ = (()=>{
        this.Board11x11 = new Board(11);
    })();
    /**
     * Returns the neighbors of a node at a given [x, y] position; excludes virtual nodes.
     * 
     * @param x the x-coordinate of the node whose neighbors to get
     * @param y the y-coordinate of the node whose neighbors to get
     * @returns An array of indices representing the neighbor positions.
     */ //TODO: make private
    static neighbors(index, size) {
        const i = Math.floor(index / size);
        const j = index % size;
        // top left corner
        if (i === 0 && j == 0) return [
            1,
            size
        ];
        // bottom left corner
        if (i === size - 1 && j === 0) return [
            size * (size - 2),
            size * (size - 2) + 1,
            size * (size - 1) + 1
        ];
        // bottom right corner
        if (i === size - 1 && j === size - 1) return [
            size * (size - 1) - 1,
            size * size - 2
        ];
        // top right corner
        if (i === 0 && j === size - 1) return [
            size - 2,
            2 * size - 1,
            2 * size - 2
        ];
        // top edge except corners
        if (i === 0) return [
            index - 1,
            index + size - 1,
            index + size,
            index + 1
        ];
        // right edge except corners
        if (j === size - 1) return [
            index - size,
            index - 1,
            index + size - 1,
            index + size
        ];
        // bottom edge except corners
        if (i === size - 1) return [
            index - 1,
            index - size,
            index - size + 1,
            index + 1
        ];
        // left edge except corners
        if (j === 0) return [
            index + size,
            index + 1,
            index - size + 1,
            index - size
        ];
        // not an edge or corner hexagon
        return [
            index - 1,
            index - size,
            index - size + 1,
            index + 1,
            index + size,
            index + size - 1
        ];
    }
    /**
     * Given an integer n, creates an n * n game board. The primary data structure
     * representing the board is a one-dimensional HexNode[] array of size (n * n + 4). 
     * The extra four nodes, which are placed on each side of the board and connected to the edge nodes
     * at their respective side, are only used in order to make the path-finding algorithms more efficient.
     * Otherwise, they are not used in the game in any way.
     * 
     * @param size the number of nodes on an the board edge
     */ constructor(size){
        if (size < 3 || size > 30) throw Error("Not a valid board size.");
        this.size = size;
        // initialize HexNode array with size * size dimensions
        // and add all non-virtual nodes to it
        this.nodes = [];
        for(let i = 0; i < size * size; i++)this.nodes.push(new (0, _hexNode.HexNode)(i, size));
        // initialize virtual nodes and push to node array
        this.topVirtualNode = new (0, _hexNode.HexNode)(size * size, size, true);
        this.leftVirtualNode = new (0, _hexNode.HexNode)(size * size + 1, size, true);
        this.bottomVirtualNode = new (0, _hexNode.HexNode)(size * size + 2, size, true);
        this.rightVirtualNode = new (0, _hexNode.HexNode)(size * size + 3, size, true);
        this.nodes.push(this.topVirtualNode);
        this.nodes.push(this.leftVirtualNode);
        this.nodes.push(this.bottomVirtualNode);
        this.nodes.push(this.rightVirtualNode);
        // set appropriate token for each virtual node
        this.topVirtualNode.setToken((0, _token.Token).RED);
        this.bottomVirtualNode.setToken((0, _token.Token).RED);
        this.leftVirtualNode.setToken((0, _token.Token).BLUE);
        this.rightVirtualNode.setToken((0, _token.Token).BLUE);
        // set neighboring nodes for each non-virtual HexNode, including any 
        // neighbors which are virtual nodes
        for(let i = 0; i < size * size; i++){
            const currentNode = this.nodes[i];
            // add all neighbor nodes for every node in board
            for (const index of Board.neighbors(i, size))// add any connected non-virtual nodes
            currentNode.addNeighbor(this.nodes[index]);
            // add any connected virtual nodes
            if (currentNode.atTopEdge()) currentNode.addNeighbor(this.topVirtualNode);
            if (currentNode.atLeftEdge()) currentNode.addNeighbor(this.leftVirtualNode);
            if (currentNode.atBottomEdge()) currentNode.addNeighbor(this.bottomVirtualNode);
            if (currentNode.atRightEdge()) currentNode.addNeighbor(this.rightVirtualNode);
        }
        // set neighbors of each virtual node
        this.topEdge().forEach((edgeNode)=>this.topVirtualNode.addNeighbor(edgeNode));
        this.leftEdge().forEach((edgeNode)=>this.leftVirtualNode.addNeighbor(edgeNode));
        this.bottomEdge().forEach((edgeNode)=>this.bottomVirtualNode.addNeighbor(edgeNode));
        this.rightEdge().forEach((edgeNode)=>this.rightVirtualNode.addNeighbor(edgeNode));
    }
    getIndex(x, y) {
        return x * this.size + y;
    }
    /**
     * Gets the token on the board at the given (x, y) position
     * 
     * @param x the x-coordinate of the token to retrieve
     * @param y the y-coordinate of the token to retrieve
     * @returns the token (RED, BLUE, or EMPTY) at the specified (x, y) position
     */ getToken(x, y) {
        return this.nodes[this.getIndex(x, y)].getToken();
    }
    /**
     * Puts the token on the board at the given (x, y) position and updates the 
     * union-find structure
     * 
     * @param x the x-coordinate at which to place the token
     * @param y the y-coordinate at which to place the token
     * @param token 
     * 
     * @throws will throw an error if specified position already contains a 
     * RED or BLUE token
     */ putToken(x, y, token) {
        if (this.getToken(x, y) !== (0, _token.Token).EMPTY) throw new Error(`Board at ${x}, ${y} already has a token.`);
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken(token);
    }
    removeToken(x, y) {
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken((0, _token.Token).EMPTY);
    }
    getNode(x, y) {
        return this.nodes[this.getIndex(x, y)];
    }
    connected(node1, node2, token) {
        if (node1.index === node2.index) throw Error("Arguments cannot refer to the same node.");
        return this.shortestPathLength(node1, node2, token) === 0;
    }
    // TODO: remove console log statements
    BFS(node1, node2, token) {
        console.log(node1);
        console.log(node2);
        if (node1.index === node2.index) throw Error("Arguments cannot refer to the same node.");
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(-1);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for(let i = 0; i < pathTree.length; i++)pathTree[i] = i;
        // queue used for BFS
        const queue = new (0, _deque.Deque)();
        // enqueue starting position
        queue.addLast(node1);
        dist[node1.index] = 0;
        while(!queue.isEmpty()){
            const current = queue.dequeue();
            for (const neighbor of current.getNeighbors())if (neighbor.getToken() === token && dist[neighbor.index] === -1) {
                queue.addLast(neighbor);
                dist[neighbor.index] = dist[current.index] + 1;
                pathTree[neighbor.index] = current.index;
            }
        }
        const path = [];
        let currIndex = node2.index;
        while(currIndex !== node1.index){
            path.push(this.nodes[currIndex]);
            currIndex = pathTree[currIndex];
        }
        path.push(this.nodes[currIndex]);
        return path;
    }
    // shortest path algorithm, returns zero if a bridge exists
    shortestPathLength(from, to, token) {
        if (from.index === to.index) throw Error("Arguments cannot refer to the same node.");
        const MAX_DIST = 1000;
        const enemyToken = token === (0, _token.Token).RED ? (0, _token.Token).BLUE : (0, _token.Token).RED;
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(MAX_DIST);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for(let i = 0; i < pathTree.length; i++)pathTree[i] = i;
        const deque = new (0, _deque.Deque)();
        // enqueue starting position
        deque.addLast(from);
        dist[from.index] = 0;
        while(!deque.isEmpty()){
            const currentNode = deque.dequeue();
            for (const neighbor of currentNode.getNeighbors()){
                if (neighbor.getToken() === enemyToken) continue;
                const edgeWeight = neighbor.getToken() === token ? 0 : 1;
                if (dist[neighbor.index] > dist[currentNode.index] + edgeWeight) {
                    dist[neighbor.index] = dist[currentNode.index] + edgeWeight;
                    pathTree[neighbor.index] = currentNode.index;
                    if (neighbor.getToken() === (0, _token.Token).EMPTY) deque.addFirst(neighbor);
                    if (neighbor.getToken() === token) deque.addLast(neighbor);
                }
            }
        }
        // console.log("Shortest path length for " + token + ": " + dist[to.index]);
        return dist[to.index];
    }
    fillRandom() {
        for(let i = 0; i < this.size; i++)for(let j = 0; j < this.size; j++){
            const rand = Math.floor(Math.random() * 2);
            const token = rand === 0 ? (0, _token.Token).RED : (0, _token.Token).BLUE;
            this.putToken(i, j, token);
        }
    }
    /**
     * Returns the total number of nodes in board, including 
     * virtual nodes
     * 
     * @returns the total number of nodes in board
     */ allNodesCount() {
        return this.size * this.size + 4;
    }
    playableNodeCount() {
        return this.size * this.size;
    }
    playableNodes() {
        return this.nodes.slice(0, this.playableNodeCount());
    }
    /**
     * Returns the nodes in the top edge of the game board.
     * 
     * @returns the nodes in the top edge as an array
     */ topEdge() {
        return this.nodes.slice(0, this.size);
    }
    /**
     * Returns the nodes in the left edge of the game board.
     * 
     * @returns the nodes in the left edge of the array
     */ leftEdge() {
        let leftNodes = [];
        for(let i = 0; i < this.size; i++)leftNodes.push(this.nodes[this.getIndex(i, 0)]);
        return leftNodes;
    }
    /**
     * Returns the nodes in the bottom edge of the game board.
     * 
     * @returns the nodes in the bottom edge of the array
     */ bottomEdge() {
        return this.nodes.slice(this.size * (this.size - 1), this.size * this.size);
    }
    /**
     * Returns the nodes in the right edge of the game board.
     * 
     * @returns the nodes in the right edge of the array
     */ rightEdge() {
        let rightNodes = [];
        for(let i = 0; i < this.size; i++)rightNodes.push(this.nodes[this.getIndex(i, this.size - 1)]);
        return rightNodes;
    }
}

},{"./Token":"laOB7","./HexNode":"2Iq5F","./Deque":"6HTOm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Iq5F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a node on a Hex board. Can either be empty, or contain a single token;
 * also contains references to its neighbor nodes.
 */ parcelHelpers.export(exports, "HexNode", ()=>HexNode);
var _token = require("./Token");
"use strict";
class HexNode {
    /**
     * Creates a HexNode at a given [x, y] position for a board of given size.
     * 
     * @param n the index of the node
     * @param size the size of the board where the node lives
     */ constructor(index, size, isVirtual = false){
        // neighbor nodes of this node; these are set upon initialization of the HexBoard class
        this.neighbors = [];
        // current token occupying this node
        this.token = (0, _token.Token).EMPTY;
        if (size === 0 && !isVirtual) throw Error("Size argument must be passed for non-virtual node.");
        this.size = size;
        this.index = index;
        this.x = Math.floor(index / size);
        this.y = index % size;
        this.isVirtual = isVirtual;
    }
    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }
    addNeighbor(hexNode) {
        this.neighbors.push(hexNode);
    }
    getNeighbors() {
        return this.neighbors;
    }
    atTopEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.x === 0;
    }
    atRightEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.y === this.size - 1;
    }
    atBottomEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.x === this.size - 1;
    }
    atLeftEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.y === 0;
    }
}

},{"./Token":"laOB7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6HTOm":[function(require,module,exports) {
/**
 * Linked list implementation of a deque.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Deque", ()=>Deque);
class ListNode {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
class Deque {
    constructor(){
        this.head = null;
        this.tail = null;
        this.n = 0;
    }
    isEmpty() {
        return this.n === 0;
    }
    size() {
        return this.n;
    }
    addLast(item) {
        if (this.isEmpty()) {
            this.head = new ListNode(item);
            this.tail = this.head;
        } else {
            const newTail = new ListNode(item);
            this.tail.next = newTail;
            this.tail = newTail;
        }
        this.n++;
    }
    // removes head from list and returns value
    dequeue() {
        if (this.isEmpty()) throw Error("Cannot dequeue from empty queue.");
        const removed = this.head;
        this.head = removed.next;
        if (this.head === null) this.tail = null;
        this.n--;
        return removed.val;
    }
    addFirst(item) {
        const oldHead = this.head;
        this.head = new ListNode(item);
        this.head.next = oldHead;
        if (oldHead === null) this.tail = this.head;
        this.n++;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jhUEF":[function(require,module,exports) {
"use strict";

},{}],"jd82i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Display", ()=>Display);
var _token = require("./Token");
"use strict";
class Display {
    static #_ = (()=>{
        this.CANVAS_HRZ_BORDER = 70;
    })();
    static #_1 = (()=>{
        this.CANVAS_VERT_BORDER = 50;
    })();
    static #_2 = (()=>{
        this.HEXAGON_SIDE_COUNT = 6;
    })();
    static #_3 = (()=>{
        this.HEXAGON_INTERIOR_ANGLE = Math.PI / 3;
    })();
    static #_4 = (()=>{
        this.FONT = "bold 16px sans-serif";
    })();
    static #_5 = (()=>{
        this.FONT_COLOR = "white";
    })();
    static #_6 = (()=>{
        this.BOARD_COLOR = "#46424f";
    })();
    static #_7 = (()=>{
        this.RED_COLOR_VALUE = "red";
    })();
    static #_8 = (()=>{
        this.BLUE_COLOR_VALUE = "blue";
    })();
    static #_9 = (()=>{
        this.RED_HOVER_COLOR = "rgba(200, 0, 0, 0.3)";
    })();
    static #_10 = (()=>{
        this.BLUE_HOVER_COLOR = "rgba(0, 0, 200, 0.3)";
    })();
    static #_11 = (()=>{
        this.TRAIL_COLOR_VALUE = "yellow";
    })();
    static #_12 = (()=>{
        this.EMPTY_TILE_COLOR = "lightgrey";
    })();
    static #_13 = (()=>{
        this.GRID_ORIGIN_X = this.CANVAS_HRZ_BORDER;
    })();
    static #_14 = (()=>{
        this.GRID_ORIGIN_Y = this.CANVAS_VERT_BORDER;
    })();
    constructor(gap, game){
        this.GAME_INFO = document.getElementById("game-info");
        this.CANVAS = document.getElementById("game-canvas");
        this.CTX = this.CANVAS.getContext("2d");
        this.CANVAS_HEIGHT = this.CANVAS.clientHeight;
        this.CANVAS_WIDTH = this.CANVAS.clientWidth;
        this.CANVAS_ORIGIN_X = this.CANVAS.offsetLeft + this.CANVAS.clientLeft;
        this.CANVAS_ORIGIN_Y = this.CANVAS.offsetTop + this.CANVAS.clientTop;
        this.gap = gap;
        this.game = game;
        this.sideCount = game.board.size;
        this.hexRadius = this.CANVAS_HEIGHT / this.sideCount * 0.5;
        this.hexFlatToFlat = this.hexRadius * Math.sqrt(3);
        this.bottomOffset = this.hexFlatToFlat / 2 * this.sideCount;
        this.totalGapLength = gap * (this.sideCount + 1);
        this.hexPaths2D = this.createHexPaths2D(Display.GRID_ORIGIN_X, Display.GRID_ORIGIN_Y);
        this.inputActive = true;
        this.activeHoverNode = null;
        this.CTX.fillStyle = Display.BOARD_COLOR;
        this.CTX.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
    /**
     * Draws a grid of hexagons to the canvas.
     */ drawHexagons() {
        this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
        for (const row of this.hexPaths2D)for (const path of row)this.CTX.fill(path);
    }
    drawBorder() {
        // draw red border
        this.CTX.fillStyle = Display.RED_COLOR_VALUE;
    }
    drawText() {
        this.CTX.font = Display.FONT;
        this.CTX.fillStyle = Display.FONT_COLOR;
        const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L"
        ];
        const coordOriginX = Display.CANVAS_HRZ_BORDER + this.bottomOffset + this.gap * 3;
        const coordOriginY = Display.CANVAS_VERT_BORDER + (this.hexFlatToFlat / 2 * Math.sqrt(3) + this.gap) * this.sideCount;
        // draw column letters
        for(let i = 0; i < this.sideCount; i++)this.CTX.fillText(letters[i], coordOriginX + (this.hexFlatToFlat + this.gap) * i, coordOriginY);
        // draw row numbers
        for(let j = 0; j < this.sideCount; j++){
            const numText = (j + 1).toString();
            const numTextWidth = this.CTX.measureText(numText).width;
            this.CTX.fillText(numText, 30 - numTextWidth + (this.gap / 2 + this.hexFlatToFlat / 2) * j, Display.CANVAS_VERT_BORDER + 2 + this.gap + (this.gap + this.hexFlatToFlat / 2 * Math.sqrt(3)) * j);
        }
    }
    drawGameInfo() {
        if (this.game.isGameOver()) this.GAME_INFO.textContent = (this.game.getWinner() === (0, _token.Token).RED ? "Red" : "Blue") + " won!";
        else this.GAME_INFO.textContent = (this.game.getCurrentPlayer() === (0, _token.Token).RED ? "Red" : "Blue") + " to move.";
    }
    /**
     * Draws current game state to canvas.
     */ draw() {
        this.drawHexagons();
        this.drawText();
        this.drawGameInfo();
    }
    /**
     * Fills hexagon at (x, y) position with given color, representing a token placed.
     * 
     * @param x the x-position of the hexagon to fill
     * @param y the y-position of the hexagon to fill
     * @param token the token color used to fill the hexagon
     */ fillHexagon(x, y, token) {
        const path2D = this.hexPaths2D[x][y];
        if (token === (0, _token.Token).RED) this.CTX.fillStyle = Display.RED_COLOR_VALUE;
        else this.CTX.fillStyle = Display.BLUE_COLOR_VALUE;
        this.CTX.fill(path2D);
    }
    highlightWinPath(nodes) {
        this.CTX.fillStyle = Display.TRAIL_COLOR_VALUE;
        let i = 1;
        for (const node of nodes){
            const path2d = this.hexPaths2D[node.x][node.y];
            setInterval(()=>this.CTX.fill(path2d), i * 250);
            i++;
        }
    }
    showThinkingIcon() {
        this.CTX.fillStyle = Display.FONT_COLOR;
        this.CTX.fillText("thinking...", 600, 180);
    }
    hideThinkingIcon() {
        this.CTX.fillStyle = Display.BOARD_COLOR;
        this.CTX.fillRect(600, 10, 100, 100);
    }
    /**
     * Creates a hexagon Path2D object with the given location and size.
     * 
     * @param centerX the center x-coordinate of hexagon
     * @param centerY the center y-coordinate of hexagon
     * @param r the radius of the hexagon, which also equals its side length
     * @returns the hexagon Path2D object
     */ hexPath2D(centerX, centerY, r) {
        let x = centerX;
        let y = centerY - r;
        const path = new Path2D();
        path.moveTo(x, y);
        for(let i = 0; i < Display.HEXAGON_SIDE_COUNT; i++){
            x += r * Math.cos(Display.HEXAGON_INTERIOR_ANGLE / 2 + i * Display.HEXAGON_INTERIOR_ANGLE);
            y += r * Math.sin(Display.HEXAGON_INTERIOR_ANGLE / 2 + i * Display.HEXAGON_INTERIOR_ANGLE);
            path.lineTo(x, y);
        }
        return path;
    }
    /**
     * Creates an array of Path2D objects representing the game board.
     * 
     * @param startCenterX the center x-coordinate of the top left hexagon within the grid
     * @param startCenterY the center y-coordinate of the top left hexagon within the grid
     * @returns an array of Path2D objects representing the hexagon tiles
     */ createHexPaths2D(startCenterX, startCenterY) {
        const hexPaths2D = [];
        for(let i = 0; i < this.sideCount; i++)hexPaths2D.push([]);
        // TODO: clean up all derived values
        const rowOffset = this.hexFlatToFlat / 2 * Math.sqrt(3);
        let currentX = startCenterX;
        let currentY = startCenterY;
        for(let i = 0; i < this.sideCount; i++){
            currentX = startCenterX + (this.hexFlatToFlat / 2 + this.gap / 2) * i;
            for(let j = 0; j < this.sideCount; j++){
                hexPaths2D[i].push(this.hexPath2D(currentX, currentY, this.hexRadius));
                currentX = currentX + this.gap + this.hexFlatToFlat;
            }
            currentY = currentY + this.gap + rowOffset;
        }
        return hexPaths2D;
    }
    clearDisplay() {
        this.CTX.fillStyle = "white";
        this.CTX.fillRect(this.CANVAS_ORIGIN_X, this.CANVAS_ORIGIN_Y, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
    disableInput() {
        this.inputActive = false;
    }
    enableInput() {
        this.inputActive = true;
    }
    addInputHandling(controller) {
        this.controller = controller;
        // add click events to tiles
        this.CANVAS.addEventListener("click", (event)=>{
            if (!this.inputActive) return;
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            for(let i = 0; i < this.sideCount; i++)for(let j = 0; j < this.sideCount; j++){
                const path = this.hexPaths2D[i][j];
                if (this.CTX.isPointInPath(path, x, y) && this.game.getToken(i, j) === (0, _token.Token).EMPTY) {
                    this.activeHoverNode = null;
                    controller.applyMove(i, j);
                    this.drawGameInfo();
                    return;
                }
            }
        });
        // TODO: wrong hover color when playing AI after turn change
        this.CANVAS.addEventListener("mousemove", (event)=>{
            if (!this.inputActive) return;
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            const tokenToPlace = this.game.getCurrentPlayer();
            const color = tokenToPlace === (0, _token.Token).RED ? Display.RED_HOVER_COLOR : Display.BLUE_HOVER_COLOR;
            const oldHoverNode = this.activeHoverNode;
            for(let i = 0; i < this.sideCount; i++)for(let j = 0; j < this.sideCount; j++){
                const path = this.hexPaths2D[i][j];
                if (this.CTX.isPointInPath(path, x, y) && this.game.getToken(i, j) === (0, _token.Token).EMPTY) {
                    if (path === this.activeHoverNode) {
                        this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
                        this.CTX.fill(path);
                        this.CTX.fillStyle = color;
                        this.CTX.fill(path);
                    } else {
                        if (this.activeHoverNode !== null) {
                            this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
                            this.CTX.fill(this.activeHoverNode);
                        }
                        this.CTX.fill(path);
                        this.activeHoverNode = path;
                    }
                    return;
                }
            }
            if (this.activeHoverNode !== null) {
                this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
                this.CTX.fill(this.activeHoverNode);
                this.activeHoverNode = null;
            }
        });
        // cursor changes to pointer when hovering over canvas
        this.CANVAS.addEventListener("mouseenter", ()=>{
            document.body.style.cursor = "pointer";
        });
        // cursor reverts to default when leaving canvas
        this.CANVAS.addEventListener("mouseleave", ()=>{
            document.body.style.cursor = "default";
        });
    }
}

},{"./Token":"laOB7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"TyEjs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game);
var _token = require("./Token");
var _board = require("./Board");
class Game {
    constructor(boardSize){
        this.board = new (0, _board.Board)(boardSize);
        this.currentPlayer = (0, _token.Token).RED;
        this.winner = null;
    }
    getToken(x, y) {
        return this.board.getToken(x, y);
    }
    placeToken(x, y) {
        this.board.putToken(x, y, this.currentPlayer);
    }
    playTurn(x, y) {
        if (this.isGameOver()) throw Error("Game has already ended.");
        this.board.putToken(x, y, this.currentPlayer);
        if (this.isWinner(this.currentPlayer)) this.winner = this.currentPlayer;
        else this.switchPlayer();
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    isGameOver() {
        return this.winner !== null;
    }
    getWinner() {
        if (this.winner === null) throw Error("Game is not over");
        return this.winner;
    }
    setWinner(token) {
        if (this.isGameOver()) throw new Error("Game is already over.");
        this.winner = token;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === (0, _token.Token).RED ? (0, _token.Token).BLUE : (0, _token.Token).RED;
    }
    isWinner(token) {
        if (token === (0, _token.Token).RED) return this.board.connected(this.board.topVirtualNode, this.board.bottomVirtualNode, token);
        return this.board.connected(this.board.leftVirtualNode, this.board.rightVirtualNode, token);
    }
    getWinBridge() {
        if (!this.isGameOver()) throw Error("Game is not over.");
        if (this.getWinner() === (0, _token.Token).RED) return this.board.BFS(this.board.topVirtualNode, this.board.bottomVirtualNode, (0, _token.Token).RED).slice(1, -1);
        else return this.board.BFS(this.board.leftVirtualNode, this.board.rightVirtualNode, (0, _token.Token).BLUE).slice(1, -1);
    }
}

},{"./Token":"laOB7","./Board":"4daYq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1m7Wr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LocalGameController", ()=>LocalGameController);
class LocalGameController {
    constructor(display){
        this.display = display;
        this.game = display.game;
        this.firstPlayerMoved = false;
    }
    applyMove(x, y) {
        const currentPlayer = this.game.getCurrentPlayer();
        this.display.fillHexagon(x, y, currentPlayer);
        this.game.placeToken(x, y);
        if (this.game.isWinner(currentPlayer)) this.makeWinner(currentPlayer);
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["4yBzl","8QSpP"], "8QSpP", "parcelRequire7352")

//# sourceMappingURL=index.d798abb8.js.map
