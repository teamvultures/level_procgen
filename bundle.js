/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/BruteForceError.ts":
/*!***********************************!*\
  !*** ./src/ts/BruteForceError.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BruteForceError = /** @class */ (function (_super) {
    __extends(BruteForceError, _super);
    function BruteForceError(description) {
        var _this = _super.call(this, description) || this;
        _this.bruteForce = true;
        return _this;
    }
    return BruteForceError;
}(Error));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BruteForceError);


/***/ }),

/***/ "./src/ts/Facing.ts":
/*!**************************!*\
  !*** ./src/ts/Facing.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Facing: () => (/* binding */ Facing)
/* harmony export */ });
var Facing;
(function (Facing) {
    Facing[Facing["UP"] = 0] = "UP";
    Facing[Facing["DOWN"] = 1] = "DOWN";
    Facing[Facing["LEFT"] = 2] = "LEFT";
    Facing[Facing["RIGHT"] = 3] = "RIGHT";
})(Facing || (Facing = {}));
;


/***/ }),

/***/ "./src/ts/Room.ts":
/*!************************!*\
  !*** ./src/ts/Room.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Enemy: () => (/* binding */ Enemy),
/* harmony export */   Item: () => (/* binding */ Item),
/* harmony export */   WallSpot: () => (/* binding */ WallSpot),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var WallSpot = /** @class */ (function () {
    function WallSpot() {
    }
    return WallSpot;
}());

var Enemy = /** @class */ (function () {
    function Enemy() {
    }
    return Enemy;
}());

var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());

var Room = /** @class */ (function () {
    function Room(roomType, difficultyRating) {
        this.roomType = roomType;
        this.exits = [];
        this.enemies = [];
        this.hotspots = [];
        this.seq = Room.nextId++;
        this.id = roomType + " [$" + this.seq + "]";
        this.voidMap = new Map();
        this.difficultyRating = difficultyRating;
    }
    Room.prototype.clearVoid = function () {
        this.voidMap.clear();
    };
    Room.prototype.setVoid = function (x, y) {
        this.voidMap.set(x + ',' + y, true);
    };
    Room.prototype.isVoid = function (x, y) {
        return this.voidMap.get(x + ',' + y);
    };
    Room.prototype.enlargeLeft = function () {
        this.x--;
        this.hotspots.forEach(function (e) {
            if (e.x === 0) {
                return;
            }
            e.x++;
        });
        this.w++;
        this.doBox();
    };
    Room.prototype.enlargeUp = function () {
        this.y--;
        //this.exits.forEach(e => e.y++);
        //this.enemies.forEach(e => e.y++);
        this.hotspots.forEach(function (e) {
            if (e.y === 0) {
                return;
            }
            e.y++;
        });
        this.h++;
        this.doBox();
    };
    Room.prototype.enlargeDown = function () {
        var _this = this;
        //this.exits.forEach(e => e.y++);
        //this.enemies.forEach(e => e.y++);
        this.hotspots.forEach(function (e) {
            if (e.y === _this.h - 1) {
                e.y++;
            }
        });
        this.h++;
        this.doBox();
    };
    Room.prototype.enlargeRight = function () {
        var _this = this;
        //this.exits.forEach(e => e.y++);
        //this.enemies.forEach(e => e.y++);
        this.hotspots.forEach(function (e) {
            if (e.x === _this.w - 1) {
                e.x++;
            }
        });
        this.w++;
        this.doBox();
    };
    Room.prototype.doBox = function () {
        this.box = [this.x, this.y, this.w, this.h]; // TODO: Phase out room.box
    };
    Room.prototype.addEnemyData = function (enemyId, quantity) {
        for (var i = 0; i < quantity; i++) {
            this.enemies.push({
                id: enemyId,
                icon: enemyId[0]
            });
        }
    };
    Room.prototype.addExit = function (room, second) {
        //this.exits.push(room); Disabled to avoid circular deps for now
        this.exits.push(room.id);
        if (!second) {
            room.addExit(this, true);
        }
    };
    Room.prototype.setMirror = function (mirrorRoom) {
        // this.mirrorRoom = mirrorRoom;
        this.mirrorRoom = mirrorRoom.id;
    };
    Room.nextId = 0;
    return Room;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);


/***/ }),

/***/ "./src/ts/abstractLayoutGenerator.ts":
/*!*******************************************!*\
  !*** ./src/ts/abstractLayoutGenerator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BruteForceError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BruteForceError */ "./src/ts/BruteForceError.ts");
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dictionary */ "./src/ts/dictionary.ts");
/* harmony import */ var _enemyPopulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemyPopulator */ "./src/ts/enemyPopulator.ts");
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Room */ "./src/ts/Room.ts");





var WeightedRoomType = /** @class */ (function () {
    function WeightedRoomType() {
    }
    return WeightedRoomType;
}());
var AbstractLayoutGenerator = /** @class */ (function () {
    function AbstractLayoutGenerator() {
        this.CLOSE_ROOM_TYPES = [
            "breakRoom",
            "instructionRoom",
            "wingRoom"
        ];
        this.FAR_ROOM_TYPES = [
            "investigationRoom",
            "evidenceRoom",
            "archive",
            "firingRange",
            "garden",
            "pressRoom"
        ];
    }
    AbstractLayoutGenerator.prototype.generateRoomsList = function () {
        var rooms = [];
        var entrance = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("entrance", 0);
        rooms.push(entrance);
        var lobby = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("lobby", 2);
        rooms.push(lobby);
        entrance.addExit(lobby);
        lobby.specs = {
            symmetric: _rand__WEBPACK_IMPORTED_MODULE_3__["default"].chance(50),
            topAttachment: _rand__WEBPACK_IMPORTED_MODULE_3__["default"].chance(50),
            bottomAttachment: _rand__WEBPACK_IMPORTED_MODULE_3__["default"].chance(50)
        };
        var closeRooms = 2 + _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(4, 6);
        var lobbyCore = [];
        lobbyCore.push(lobby);
        var availableCloseRooms = this.CLOSE_ROOM_TYPES.map(function (rt) {
            return {
                roomType: rt,
                weight: (0,_dictionary__WEBPACK_IMPORTED_MODULE_1__["default"])(rt).weight || 1
            };
        });
        this.stretch(availableCloseRooms, 100);
        var _loop_1 = function (i) {
            var roomType = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedFrom(availableCloseRooms, function (wrt) { return wrt.weight; }, function (wrt) { return wrt.roomType; }, 100);
            if (!this_1.canAdd(rooms, roomType, lobby.specs.symmetric)) {
                i--;
                availableCloseRooms.splice(availableCloseRooms.findIndex(function (wrt) { return wrt.roomType === roomType; }), 1);
                if (availableCloseRooms.length === 0) {
                    throw this_1.procgenError("Available room starvation");
                }
                this_1.stretch(availableCloseRooms, 100);
                return out_i_1 = i, "continue";
            }
            var closeRoom = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"](roomType, 1);
            rooms.push(closeRoom);
            lobbyCore.push(closeRoom);
            lobby.addExit(closeRoom);
            if (lobby.specs.symmetric) {
                var mirrorRoom = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"](closeRoom.roomType, 1);
                mirrorRoom.setMirror(closeRoom);
                rooms.push(mirrorRoom);
                lobbyCore.push(mirrorRoom);
                lobby.addExit(mirrorRoom);
                i++;
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < closeRooms; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        var corridors = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, 3);
        var firstLayerCorridors = [];
        for (var i = 0; i < corridors; i++) {
            var closeRoom = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(lobbyCore);
            var corridor_1 = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("corridor", 2);
            corridor_1.addExit(closeRoom);
            rooms.push(corridor_1);
            firstLayerCorridors.push(corridor_1);
            if (true) {
                var corridorExtension = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("corridor", 2);
                corridorExtension.addExit(corridor_1);
                rooms.push(corridorExtension);
                firstLayerCorridors.push(corridorExtension);
            }
        }
        var firstLayerRooms = 2 + _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, 3);
        var firstLayerRoomsList = [];
        var availableFarRoomTypes = this.FAR_ROOM_TYPES.map(function (rt) {
            return {
                roomType: rt,
                weight: (0,_dictionary__WEBPACK_IMPORTED_MODULE_1__["default"])(rt).weight || 1
            };
        });
        this.stretch(availableFarRoomTypes, 100);
        var _loop_2 = function (i) {
            var corridor_2 = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(firstLayerCorridors);
            var roomType = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedFrom(availableFarRoomTypes, function (wrt) { return wrt.weight; }, function (wrt) { return wrt.roomType; }, 100);
            if (!this_2.canAdd(rooms, roomType, false)) {
                i--;
                availableFarRoomTypes.splice(availableFarRoomTypes.findIndex(function (wrt) { return wrt.roomType === roomType; }), 1);
                if (availableFarRoomTypes.length === 0) {
                    throw this_2.procgenError("Available room starvation");
                }
                this_2.stretch(availableFarRoomTypes, 100);
                return out_i_2 = i, "continue";
            }
            var firstLayerRoom = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"](roomType, 3);
            corridor_2.addExit(firstLayerRoom);
            rooms.push(firstLayerRoom);
            firstLayerRoomsList.push(firstLayerRoom);
            out_i_2 = i;
        };
        var this_2 = this, out_i_2;
        for (var i = 0; i < firstLayerRooms; i++) {
            _loop_2(i);
            i = out_i_2;
        }
        var keyRooms = this.placeKeyAndLock(rooms, firstLayerRoomsList, 'k1');
        var priorRoom = rooms.find(function (r) { return r.id === keyRooms.key.exits[0]; });
        _enemyPopulator__WEBPACK_IMPORTED_MODULE_2__["default"].addPoliceBossEncounter(priorRoom.roomType === 'corridor' ? keyRooms.key : priorRoom);
        var secondLayerCorridors = [];
        var corridor = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(firstLayerCorridors);
        var offices = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("offices", 4);
        corridor.addExit(offices);
        rooms.push(offices);
        var chiefOffice = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("chiefOffice", 4);
        offices.addExit(chiefOffice);
        rooms.push(chiefOffice);
        secondLayerCorridors.push(chiefOffice);
        var cells = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("cells", 5);
        offices.addExit(cells);
        secondLayerCorridors.push(cells);
        rooms.push(cells);
        var moreCorridors = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, 3);
        for (var i = 0; i < moreCorridors; i++) {
            var closeCorridor = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(firstLayerCorridors);
            var corridor_3 = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"]("corridor", 3);
            closeCorridor.addExit(corridor_3);
            rooms.push(corridor_3);
            secondLayerCorridors.push(corridor_3);
        }
        var secondLayerRooms = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, 3);
        var secondLayerRoomsList = [];
        var _loop_3 = function (i) {
            var corridor_4 = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(secondLayerCorridors);
            var roomType = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedFrom(availableFarRoomTypes, function (wrt) { return wrt.weight; }, function (wrt) { return wrt.roomType; }, 100);
            if (!this_3.canAdd(rooms, roomType, false)) {
                i--;
                availableFarRoomTypes.splice(availableFarRoomTypes.findIndex(function (wrt) { return wrt.roomType === roomType; }), 1);
                if (availableFarRoomTypes.length === 0) {
                    throw this_3.procgenError("Available room starvation");
                }
                this_3.stretch(availableFarRoomTypes, 100);
                return out_i_3 = i, "continue";
            }
            var secondLayerRoom = new _Room__WEBPACK_IMPORTED_MODULE_4__["default"](roomType, 4);
            corridor_4.addExit(secondLayerRoom);
            rooms.push(secondLayerRoom);
            secondLayerRoomsList.push(secondLayerRoom);
            out_i_3 = i;
        };
        var this_3 = this, out_i_3;
        for (var i = 0; i < secondLayerRooms; i++) {
            _loop_3(i);
            i = out_i_3;
        }
        keyRooms = this.placeKeyAndLock(rooms, secondLayerRoomsList, 'k2', 'Su');
        priorRoom = rooms.find(function (r) { return r.id === keyRooms.key.exits[0]; });
        _enemyPopulator__WEBPACK_IMPORTED_MODULE_2__["default"].addShadowEncounter(priorRoom.roomType === 'corridor' ? keyRooms.key : priorRoom);
        var _loop_4 = function (i) {
            var room = rooms[i];
            if (room.roomType === 'corridor' && room.exits.length === 1) {
                var fromRoomExits = rooms.find(function (r) { return r.id === room.exits[0]; }).exits;
                fromRoomExits.splice(fromRoomExits.indexOf(room.id), 1);
            }
        };
        // Remove corridors leading nowhere, last to first
        for (var i = rooms.length - 1; i >= 0; i--) {
            _loop_4(i);
        }
        return rooms;
    };
    AbstractLayoutGenerator.prototype.stretch = function (array, max) {
        if (array.length === 0) {
            return;
        }
        if (array.length === 1) {
            array[0].weight = max;
            return;
        }
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i].weight;
        }
        var ratio = max / sum;
        for (var i = 0; i < array.length; i++) {
            array[i].weight = array[i].weight * ratio;
        }
    };
    AbstractLayoutGenerator.prototype.canAdd = function (rooms, roomType, symmetric) {
        var metadata = (0,_dictionary__WEBPACK_IMPORTED_MODULE_1__["default"])(roomType);
        if (metadata && metadata.max !== undefined) {
            var currentRooms = rooms.reduce(function (acum, r) { return acum + (r.roomType === roomType ? 1 : 0); }, 0);
            if (currentRooms + (symmetric ? 1 : 0) >= metadata.max) {
                return false;
            }
        }
        return true;
    };
    AbstractLayoutGenerator.prototype.placeKeyAndLock = function (allRooms, rooms, keyCode, lockedReward) {
        var fails = 0;
        while (true) {
            var r1 = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(rooms);
            var r2 = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(rooms);
            if (r1 === r2) {
                continue;
            }
            var roomDistance = this.getRoomDistance(allRooms, r1, r2, r1.id);
            // console.log("Room distance " + roomDistance);
            if (roomDistance < 5) {
                fails++;
                if (fails > 100) {
                    throw this.procgenError("Failed Key/Lock Placement!");
                }
                continue;
            }
            r1.items = [{ id: keyCode }];
            r2.lock = keyCode;
            if (lockedReward) {
                r2.items = [{ id: lockedReward }];
            }
            return { key: r1, locked: r2 };
        }
    };
    AbstractLayoutGenerator.prototype.getRoomDistance = function (rooms, r1, r2, fromRoomId) {
        if (r1 == r2) {
            return 0;
        }
        var minDistance = 9999;
        var _loop_5 = function (i) {
            var exit = r1.exits[i];
            if (exit === fromRoomId) {
                return "continue";
            }
            if (exit === r2.id) {
                return { value: 1 };
            }
            var distance = this_4.getRoomDistance(rooms, rooms.find(function (r) { return r.id === exit; }), r2, r1.id);
            if (distance < minDistance) {
                minDistance = distance;
            }
        };
        var this_4 = this;
        for (var i = 0; i < r1.exits.length; i++) {
            var state_1 = _loop_5(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return 1 + minDistance;
    };
    AbstractLayoutGenerator.prototype.procgenError = function (description) {
        return new _BruteForceError__WEBPACK_IMPORTED_MODULE_0__["default"](description);
    };
    return AbstractLayoutGenerator;
}());
var abstractLayoutGenerator = new AbstractLayoutGenerator();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (abstractLayoutGenerator);


/***/ }),

/***/ "./src/ts/arrays.ts":
/*!**************************!*\
  !*** ./src/ts/arrays.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");

var Arrays = /** @class */ (function () {
    function Arrays() {
    }
    Arrays.prototype.find = function (array, c) {
        for (var i = 0; i < array.length; i++) {
            if (c(array[i])) {
                return array[i];
            }
        }
        return undefined;
    };
    Arrays.prototype.shuffle = function (array) {
        var _a;
        var currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(_rand__WEBPACK_IMPORTED_MODULE_0__["default"].seeded() * currentIndex);
            currentIndex--;
            _a = [
                array[randomIndex], array[currentIndex]
            ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    return Arrays;
}());
var arrays = new Arrays();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrays);


/***/ }),

/***/ "./src/ts/canvasRenderer.ts":
/*!**********************************!*\
  !*** ./src/ts/canvasRenderer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SHOW_UNUSED_DOORS = false;
var CanvasRenderer = /** @class */ (function () {
    function CanvasRenderer() {
    }
    CanvasRenderer.prototype.drawSketch = function (rooms, canvasId, overlay) {
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        context.font = "16px Courier";
        if (!overlay)
            context.clearRect(0, 0, canvas.width, canvas.height);
        var zoom = 32;
        for (var i = 0; i < rooms.length; i++) {
            var area = rooms[i];
            if (!area.box)
                continue; // Only for tests
            context.beginPath();
            for (var x = area.box[0]; x < area.box[0] + area.box[2]; x++) {
                for (var y = area.box[1]; y < area.box[1] + area.box[3]; y++) {
                    if (area.isVoid(x - area.box[0], y - area.box[1])) {
                        // It's a hole
                        continue;
                    }
                    context.beginPath();
                    context.rect(x * zoom, y * zoom, zoom, zoom);
                    context.lineWidth = 1;
                    context.strokeStyle = '#444444';
                    if (!overlay) {
                        context.fillStyle = area.color || '#192b19';
                        context.fill();
                    }
                    context.stroke();
                }
            }
            // TODO: Somehow fix outline for irregular rooms
            if (!area.irregular) {
                context.beginPath();
                context.rect(area.box[0] * zoom, area.box[1] * zoom, area.box[2] * zoom, area.box[3] * zoom);
                context.lineWidth = 5;
                context.strokeStyle = 'white';
                context.stroke();
            }
            var areaDescription = area.roomType;
            context.fillStyle = 'white';
            context.fillText(areaDescription, (area.box[0]) * zoom + 5, (area.box[1]) * zoom + 20);
            context.fillText(area.seq + "", (area.box[0]) * zoom + 5, (area.box[1]) * zoom + 40);
            for (var j = 0; j < area.hotspots.length; j++) {
                var bridge = area.hotspots[j];
                if (!bridge.toRoom && !SHOW_UNUSED_DOORS) {
                    continue;
                }
                context.beginPath();
                context.rect((area.box[0] + bridge.x) * zoom /*- zoom / 2*/, (area.box[1] + bridge.y) * zoom /*- zoom / 2*/, zoom, zoom);
                context.lineWidth = 2;
                context.strokeStyle = bridge.toRoom ? 'yellow' : 'blue';
                context.stroke();
                if (bridge.lock) {
                    context.fillText(bridge.lock, (area.box[0] + bridge.x) * zoom + 5, (area.box[1] + bridge.y) * zoom + 20);
                }
            }
            if (area.items)
                area.items.forEach(function (i) {
                    context.beginPath();
                    context.rect((area.box[0] + i.x) * zoom + 2, (area.box[1] + i.y) * zoom + 2, zoom - 4, zoom - 4);
                    context.lineWidth = 2;
                    context.strokeStyle = 'red';
                    context.stroke();
                    context.fillText(i.id, (area.box[0] + i.x) * zoom + 5, (area.box[1] + i.y) * zoom + 20);
                });
            if (area.enemies)
                area.enemies.forEach(function (i) {
                    context.beginPath();
                    context.rect((area.box[0] + i.x) * zoom, (area.box[1] + i.y) * zoom, zoom, zoom);
                    context.lineWidth = 2;
                    context.strokeStyle = 'purple';
                    context.stroke();
                    context.fillText(i.icon, (area.box[0] + i.x) * zoom + 5, (area.box[1] + i.y) * zoom + 20);
                });
        }
    };
    return CanvasRenderer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasRenderer);


/***/ }),

/***/ "./src/ts/debugControls.ts":
/*!*********************************!*\
  !*** ./src/ts/debugControls.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canvasRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasRenderer */ "./src/ts/canvasRenderer.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DebugControls = /** @class */ (function () {
    function DebugControls(renderFunction) {
        this.renderFunction = renderFunction;
    }
    DebugControls.prototype.waitClick = function (rooms) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.renderFunction(rooms);
                if (document.getElementById("chkAuto").checked) {
                    return [2 /*return*/, Promise.resolve()];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.clickResolve = resolve;
                    })];
            });
        });
    };
    DebugControls.prototype.stepGeneration = function () {
        if (this.clickResolve) {
            this.clickResolve();
        }
    };
    return DebugControls;
}());
var canvasRenderer = new _canvasRenderer__WEBPACK_IMPORTED_MODULE_0__["default"]();
var debugControls = new DebugControls(function (level) { return canvasRenderer.drawSketch(level, 'levelCanvas', false); });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debugControls);


/***/ }),

/***/ "./src/ts/dictionary.ts":
/*!******************************!*\
  !*** ./src/ts/dictionary.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoomMetadata: () => (/* binding */ RoomMetadata),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var RoomMetadata = /** @class */ (function () {
    function RoomMetadata() {
    }
    return RoomMetadata;
}());

var metadatum = {
    entrance: {
        width: [5, 7],
        height: [8, 10],
        exitSpots: 'topCenter',
        placement: 'border',
        straightRoom: true
    },
    lobby: {
        width: [10, 14],
        height: [10, 14]
    },
    offices: {
        width: [10, 14],
        height: [10, 14]
    },
    garden: {
        width: [6, 8],
        height: [6, 8],
        max: 1
    },
    cells: {
        width: [10, 14],
        height: [10, 14]
    },
    pressRoom: {
        width: [10, 14],
        height: [10, 14]
    },
    breakRoom: {
        width: [4, 6],
        height: [4, 6],
        weight: 1.5
    },
    wingRoom: {
        width: [4, 6],
        height: [4, 6],
        max: 2,
        weight: 0.5
    },
    instructionRoom: {
        width: [6, 8],
        height: [6, 8],
        max: 2
    },
    corridor: {
        width: [3, 4],
        height: [8, 12],
        straightRoom: true
    },
    firingRange: {
        width: [3, 5],
        height: [8, 10],
        max: 1,
        straightRoom: true
    },
    default: {
        width: [4, 6],
        height: [4, 6]
    }
};
function roomDictionary(roomTypeId) {
    if (metadatum[roomTypeId]) {
        return metadatum[roomTypeId];
    }
    return metadatum.default;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (roomDictionary);


/***/ }),

/***/ "./src/ts/enemyDictionary.ts":
/*!***********************************!*\
  !*** ./src/ts/enemyDictionary.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var enemyDictionary = [
    {
        id: 'zombie',
        difficultyRating: 1
    },
    {
        id: 'greenZombie',
        difficultyRating: 2
    },
    {
        id: 'redZombie',
        difficultyRating: 3
    },
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enemyDictionary);


/***/ }),

/***/ "./src/ts/enemyPopulator.ts":
/*!**********************************!*\
  !*** ./src/ts/enemyPopulator.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays */ "./src/ts/arrays.ts");
/* harmony import */ var _BruteForceError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BruteForceError */ "./src/ts/BruteForceError.ts");
/* harmony import */ var _enemyDictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemyDictionary */ "./src/ts/enemyDictionary.ts");
/* harmony import */ var _geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geo */ "./src/ts/geo.ts");
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");





var EnemyPopulator = /** @class */ (function () {
    function EnemyPopulator() {
    }
    EnemyPopulator.prototype.populateLevel = function (level) {
        var _this = this;
        level.forEach(function (room) { return _this.addEnemies(room); });
        level.forEach(function (room) { return _this.materializeEnemies(room); });
    };
    EnemyPopulator.prototype.addPoliceBossEncounter = function (room) {
        if (_rand__WEBPACK_IMPORTED_MODULE_4__["default"].chance(50)) {
            // The boss is alive
            room.addEnemyData('bossZombie', 1);
            room.addEnemyData('policeZombie', 2);
        }
        else {
            // The boss is dead
            room.addEnemyData('policeZombie', 6);
        }
        room.populated = true;
    };
    EnemyPopulator.prototype.addShadowEncounter = function (room) {
        if (_rand__WEBPACK_IMPORTED_MODULE_4__["default"].chance(50)) {
            // The Shadow
            room.addEnemyData('Shadow', 1);
            room.addEnemyData('policeZombie', 3);
        }
        else {
            // No Shadow
            room.addEnemyData('policeZombie', 9);
        }
        room.populated = true;
    };
    EnemyPopulator.prototype.addEnemies = function (room) {
        if (room.difficultyRating === 0 || room.populated) {
            return;
        }
        var remainingDifficultyPower = 2 + (room.difficultyRating - 1) * 2;
        while (remainingDifficultyPower > 0) {
            var race = this.selectEnemy(room.difficultyRating);
            remainingDifficultyPower -= race.difficultyRating;
            room.addEnemyData(race.id, 1);
        }
        room.populated = true;
    };
    EnemyPopulator.prototype.selectEnemy = function (difficultyLevel) {
        var possible = _enemyDictionary__WEBPACK_IMPORTED_MODULE_2__["default"].filter(function (e) { return (e.minLevel === undefined || e.minLevel >= difficultyLevel) && (e.maxLevel === undefined || e.maxLevel <= difficultyLevel); });
        return _rand__WEBPACK_IMPORTED_MODULE_4__["default"].from(possible);
    };
    EnemyPopulator.prototype.materializeEnemies = function (room) {
        if (room.enemies) {
            var possiblePlaces_1 = [];
            var _loop_1 = function (x) {
                var _loop_2 = function (y) {
                    var nearHotspot = room.hotspots.find(function (h) { return h.toRoom && _geo__WEBPACK_IMPORTED_MODULE_3__["default"].manhattan(h.x, h.y, x, y) < 3; });
                    if (nearHotspot) {
                        return "continue";
                    }
                    if (room.isVoid(x, y)) {
                        return "continue";
                    }
                    if (room.items && _arrays__WEBPACK_IMPORTED_MODULE_0__["default"].find(room.items, function (i) { return i.x === x && i.y === y; })) {
                        return "continue";
                    }
                    possiblePlaces_1.push({ x: x, y: y });
                };
                for (var y = 1; y < room.box[3] - 1; y++) {
                    _loop_2(y);
                }
            };
            for (var x = 1; x < room.box[2] - 1; x++) {
                _loop_1(x);
            }
            if (possiblePlaces_1.length < room.enemies.length) {
                throw new _BruteForceError__WEBPACK_IMPORTED_MODULE_1__["default"]("Failed Enemies Placement, room too small!");
            }
            room.enemies.forEach(function (e) {
                var randPlacement = _rand__WEBPACK_IMPORTED_MODULE_4__["default"].from(possiblePlaces_1);
                e.x = randPlacement.x;
                e.y = randPlacement.y;
                possiblePlaces_1.splice(possiblePlaces_1.findIndex(function (p) { return p.x === e.x && p.y === e.y; }), 1);
            });
        }
    };
    return EnemyPopulator;
}());
var enemyPopulator = new EnemyPopulator();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enemyPopulator);


/***/ }),

/***/ "./src/ts/geo.ts":
/*!***********************!*\
  !*** ./src/ts/geo.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Point: () => (/* binding */ Point),
/* harmony export */   Rect: () => (/* binding */ Rect),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Rect = /** @class */ (function () {
    function Rect() {
    }
    return Rect;
}());

var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());

var Geo = /** @class */ (function () {
    function Geo() {
    }
    Geo.prototype.getBoundaries = function (rects) {
        var upperBoundary = rects[0].y;
        var lowerBoundary = rects[0].y + rects[0].h;
        var leftBoundary = rects[0].x;
        var rightBoundary = rects[0].x + rects[0].w;
        for (var ri = 0; ri < rects.length; ri++) {
            var room = rects[ri];
            if (room.x < leftBoundary) {
                leftBoundary = room.x;
            }
            if (room.y < upperBoundary) {
                upperBoundary = room.y;
            }
            if (room.y + room.h > lowerBoundary) {
                lowerBoundary = room.y + room.h;
            }
            if (room.x + room.w > rightBoundary) {
                rightBoundary = room.x + room.w;
            }
        }
        return {
            leftBoundary: leftBoundary,
            upperBoundary: upperBoundary,
            lowerBoundary: lowerBoundary,
            rightBoundary: rightBoundary,
            w: rightBoundary - leftBoundary + 1,
            h: lowerBoundary - upperBoundary + 1,
        };
    };
    Geo.prototype.getRoomAt = function (rooms, x, y) {
        var _this = this;
        return rooms.find(function (r) { return _this.pointInBox(r, x, y); });
    };
    Geo.prototype.pointInBox = function (box, x, y) {
        return x < box.x + box.w && x >= box.x && y >= box.y && y < box.y + box.h;
    };
    Geo.prototype.manhattan = function (x, y, x1, y1) {
        return Math.abs(x - x1) + Math.abs(y - y1);
    };
    return Geo;
}());
var geo = new Geo();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (geo);


/***/ }),

/***/ "./src/ts/mergeRooms.ts":
/*!******************************!*\
  !*** ./src/ts/mergeRooms.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _debugControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debugControls */ "./src/ts/debugControls.ts");
/* harmony import */ var _geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geo */ "./src/ts/geo.ts");
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Room */ "./src/ts/Room.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var MergeRooms = /** @class */ (function () {
    function MergeRooms() {
    }
    MergeRooms.prototype.mergeRooms = function (rooms) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, out_i_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var room, nextExitId, nextRoom_1, doubleBack;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        room = rooms[i];
                                        if (!room) {
                                            debugger;
                                        }
                                        nextExitId = room.exits.find(function (e) {
                                            var exitRoom = rooms.find(function (r) { return r.id === e; });
                                            if (!exitRoom) {
                                                return false; // TODO: Cleanup so we don't have exits to inexistent places
                                            }
                                            return exitRoom.roomType === room.roomType;
                                        });
                                        if (!nextExitId) return [3 /*break*/, 2];
                                        nextRoom_1 = rooms.find(function (r) { return r.id === nextExitId; });
                                        doubleBack = false;
                                        if (rooms.findIndex(function (r) { return r.id === nextRoom_1.id; }) < i - 1) {
                                            doubleBack = true;
                                        }
                                        this_1.mergeInto(rooms, room, nextRoom_1);
                                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_0__["default"].waitClick(rooms)];
                                    case 1:
                                        _b.sent();
                                        i--;
                                        if (doubleBack) {
                                            i--;
                                        }
                                        _b.label = 2;
                                    case 2:
                                        out_i_1 = i;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < rooms.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        i = out_i_1;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MergeRooms.prototype.mergeInto = function (rooms, room, nextRoom) {
        var boundaries = _geo__WEBPACK_IMPORTED_MODULE_1__["default"].getBoundaries([room, nextRoom]);
        // Relocate all contents, including doors
        var r1dx = room.x - boundaries.leftBoundary;
        var r1dy = room.y - boundaries.upperBoundary;
        var newRoom = new _Room__WEBPACK_IMPORTED_MODULE_2__["default"](room.roomType, room.difficultyRating);
        room.hotspots.forEach(function (h) {
            if (!h.toRoom || h.toRoom === nextRoom.id) {
                return;
            }
            newRoom.hotspots.push(h);
            h.x += r1dx;
            h.y += r1dy;
        });
        room.enemies.forEach(function (e) {
            newRoom.enemies.push(e);
            e.x += r1dx;
            e.y += r1dy;
        });
        if (room.items) {
            room.items.forEach(function (i) {
                newRoom.items.push(i);
                i.x += r1dx;
                i.y += r1dy;
            });
        }
        if (nextRoom.color) {
            newRoom.color = nextRoom.color;
        }
        var r2dx = nextRoom.x - boundaries.leftBoundary;
        var r2dy = nextRoom.y - boundaries.upperBoundary;
        nextRoom.exits.forEach(function (e) {
            if (e !== room.id) {
                newRoom.exits.push(e);
            }
        });
        nextRoom.hotspots.forEach(function (h) {
            if (!h.toRoom || h.toRoom === room.id) {
                return;
            }
            newRoom.hotspots.push(h);
            h.x += r2dx;
            h.y += r2dy;
        });
        nextRoom.enemies.forEach(function (e) {
            newRoom.enemies.push(e);
            e.x += r2dx;
            e.y += r2dy;
        });
        if (nextRoom.items) {
            nextRoom.items.forEach(function (i) {
                newRoom.items.push(i);
                i.x += r2dx;
                i.y += r2dy;
            });
        }
        for (var x = boundaries.leftBoundary; x < boundaries.rightBoundary; x++) {
            for (var y = boundaries.upperBoundary; y < boundaries.lowerBoundary; y++) {
                var theRoom = _geo__WEBPACK_IMPORTED_MODULE_1__["default"].getRoomAt(rooms, x, y);
                if (!theRoom || // There's no room there, we are expanding into the void
                    (theRoom !== room && theRoom !== nextRoom) || // There is another room there we are not merging with, it's void
                    theRoom.isVoid(x - theRoom.x, y - theRoom.y) // This point belong to one of the rooms being merged, so copy the voidness
                ) {
                    newRoom.setVoid(x - boundaries.leftBoundary, y - boundaries.upperBoundary);
                    newRoom.irregular = true;
                }
            }
        }
        newRoom.x = boundaries.leftBoundary;
        newRoom.y = boundaries.upperBoundary;
        newRoom.w = boundaries.w - 1;
        newRoom.h = boundaries.h - 1;
        newRoom.doBox();
        if (nextRoom.stopGrowthLeft)
            newRoom.stopGrowthLeft = true;
        if (nextRoom.stopGrowthRight)
            newRoom.stopGrowthRight = true;
        if (nextRoom.stopGrowthDown)
            newRoom.stopGrowthDown = true;
        if (nextRoom.stopGrowthUp)
            newRoom.stopGrowthUp = true;
        rooms.splice(rooms.findIndex(function (r) { return r === room; }), 1);
        rooms.splice(rooms.findIndex(function (r) { return r === nextRoom; }), 1);
        rooms.push(newRoom);
        var adjacentRooms = rooms.filter(function (r) { return r.id !== room.id && r.id !== nextRoom.id && (r.exits.indexOf(room.id) > -1 || r.exits.indexOf(nextRoom.id) > -1); });
        // Update doors referencing the rooms we just destroyed
        adjacentRooms.forEach(function (adjacentRoom) {
            adjacentRoom.hotspots.filter(function (h) { return h.toRoom === room.id || h.toRoom === nextRoom.id; }).forEach(function (h) { return h.toRoom = newRoom.id; });
            adjacentRoom.exits = adjacentRoom.exits.filter(function (exit) { return exit !== room.id && exit !== nextRoom.id; });
            adjacentRoom.exits.push(newRoom.id);
        });
    };
    return MergeRooms;
}());
var mergeRooms = new MergeRooms();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeRooms);


/***/ }),

/***/ "./src/ts/rand.ts":
/*!************************!*\
  !*** ./src/ts/rand.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Rand = /** @class */ (function () {
    function Rand() {
    }
    // 1993 Park-Miller LCG, https://gist.github.com/blixt/f17b47c62508be59987b
    Rand.prototype.LCG = function (s) {
        return function () {
            s = Math.imul(16807, s) | 0 % 2147483647;
            return (s & 2147483647) / 2147483648;
        };
    };
    Rand.prototype.doSeed = function (seed) {
        this.seeded = this.LCG(seed);
    };
    Rand.prototype.from = function (fromArray) {
        return fromArray[this.int(0, fromArray.length - 1)];
    };
    Rand.prototype.weightedFrom = function (fromArray, weightFunction, itemFunction, maxNumber) {
        if (maxNumber === void 0) { maxNumber = 100; }
        var sum = 0, r = this.seeded() * maxNumber;
        for (var i in fromArray) {
            sum += weightFunction(fromArray[i]);
            if (r <= sum) {
                return itemFunction(fromArray[i]);
            }
        }
        return undefined;
    };
    Rand.prototype.int = function (a, b) {
        return a + Math.floor((b - a + 1) * this.seeded());
    };
    Rand.prototype.chance = function (pTo100) {
        return this.seeded() <= pTo100 / 100;
    };
    return Rand;
}());
var rng = new Rand();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rng);


/***/ }),

/***/ "./src/ts/relaxRooms.ts":
/*!******************************!*\
  !*** ./src/ts/relaxRooms.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Facing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Facing */ "./src/ts/Facing.ts");
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Room */ "./src/ts/Room.ts");
/* harmony import */ var _arrays__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrays */ "./src/ts/arrays.ts");
/* harmony import */ var _debugControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debugControls */ "./src/ts/debugControls.ts");
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dictionary */ "./src/ts/dictionary.ts");
/* harmony import */ var _geo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./geo */ "./src/ts/geo.ts");
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};







var Range = /** @class */ (function () {
    function Range() {
    }
    return Range;
}());
var RoomProjection = /** @class */ (function () {
    function RoomProjection() {
    }
    return RoomProjection;
}());
var RelaxRooms = /** @class */ (function () {
    function RelaxRooms() {
        this.MIN_FILLER_SIZE = 3;
        this.stepGrowth = 3;
    }
    RelaxRooms.prototype.getRelaxedRooms = function (levelStructure) {
        return __awaiter(this, void 0, void 0, function () {
            var shuffledLevelStructure, boundaries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shuffledLevelStructure = _arrays__WEBPACK_IMPORTED_MODULE_2__["default"].shuffle(__spreadArray([], levelStructure, true)).filter(function (r) { return r.box !== undefined; });
                        shuffledLevelStructure.forEach(function (room) {
                            room.x = room.box[0];
                            room.y = room.box[1];
                            room.w = room.box[2];
                            room.h = room.box[3];
                        });
                        boundaries = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getBoundaries(levelStructure);
                        this.leftBoundary = boundaries.leftBoundary;
                        this.upperBoundary = boundaries.upperBoundary;
                        this.lowerBoundary = boundaries.lowerBoundary;
                        this.rightBoundary = boundaries.rightBoundary;
                        // First run of growth, but first mark the boundaries that shouldn't grow
                        this.markStopGrowth(shuffledLevelStructure);
                        return [4 /*yield*/, this.stretchRooms(shuffledLevelStructure)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.addFillers(shuffledLevelStructure)];
                    case 2:
                        _a.sent();
                        this.markStopGrowth(shuffledLevelStructure);
                        return [4 /*yield*/, this.stretchRooms(shuffledLevelStructure)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addFillers(shuffledLevelStructure)];
                    case 4:
                        _a.sent();
                        shuffledLevelStructure.forEach(function (room) {
                            room.doBox();
                        });
                        return [2 /*return*/, shuffledLevelStructure];
                }
            });
        });
    };
    RelaxRooms.prototype.getRangeIntersection = function (a, b) {
        var minRange = (a.start < b.start ? a : b);
        var maxRange = (minRange == a ? b : a);
        if (minRange.end < maxRange.start) {
            return null; //the ranges don't intersect
        }
        return {
            start: maxRange.start,
            end: minRange.end < maxRange.end ? minRange.end : maxRange.end
        };
    };
    RelaxRooms.prototype.addRoom = function (rooms, projection, expandFacing) {
        return __awaiter(this, void 0, void 0, function () {
            var horizontalIntersection, intersectionWidth, newRoom_1, corridorWidth, verticalIntersection, intersectionWidth, newRoom_2, corridorWidth, fillerRoomTypeId, fillerRoomDef, newRoom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(projection.intersectedRoom && expandFacing !== undefined)) return [3 /*break*/, 7];
                        if (!(expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.DOWN || expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP)) return [3 /*break*/, 4];
                        horizontalIntersection = this.getRangeIntersection({
                            start: projection.fromRoom.x,
                            end: projection.fromRoom.x + projection.fromRoom.w - 1,
                        }, {
                            start: projection.intersectedRoom.x,
                            end: projection.intersectedRoom.x + projection.intersectedRoom.w - 1,
                        });
                        if (!horizontalIntersection) return [3 /*break*/, 3];
                        intersectionWidth = horizontalIntersection.end - horizontalIntersection.start + 1;
                        if (!(intersectionWidth >= 3)) return [3 /*break*/, 2];
                        newRoom_1 = new _Room__WEBPACK_IMPORTED_MODULE_1__["default"]("corridor", projection.fromRoom.difficultyRating);
                        newRoom_1.color = '#655e13';
                        corridorWidth = 3;
                        newRoom_1.x = _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(horizontalIntersection.start, horizontalIntersection.end - corridorWidth);
                        newRoom_1.y = projection.y;
                        newRoom_1.w = corridorWidth;
                        newRoom_1.h = projection.h;
                        newRoom_1.doBox();
                        newRoom_1.stopGrowthLeft = true;
                        newRoom_1.stopGrowthRight = true;
                        // Add door from newRoom to connected room
                        newRoom_1.hotspots.push({
                            x: 1,
                            y: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP ? 0 : newRoom_1.h - 1),
                            facing: expandFacing,
                            toRoom: projection.intersectedRoom.id
                        });
                        newRoom_1.exits.push(projection.intersectedRoom.id);
                        rooms.push(newRoom_1);
                        // Add door from originalRoom to newRoom
                        projection.fromRoom.hotspots.push({
                            x: newRoom_1.x - projection.fromRoom.x + 1,
                            y: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP ? 0 : projection.fromRoom.h - 1),
                            facing: expandFacing,
                            toRoom: newRoom_1.id
                        });
                        projection.fromRoom.exits.push(newRoom_1.id);
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newRoom_1];
                    case 2:
                        // Intersection too small
                        // We could probably look for intersections with other rooms, but for now
                        // Lets do nothing and hope another rooms intersects back with us
                        if (projection.h > 8) {
                            // We don't want a HUGE filler room to spawn
                            return [2 /*return*/, null];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!(expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT || expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.RIGHT)) return [3 /*break*/, 7];
                        verticalIntersection = this.getRangeIntersection({
                            start: projection.fromRoom.y,
                            end: projection.fromRoom.y + projection.fromRoom.h - 1,
                        }, {
                            start: projection.intersectedRoom.y,
                            end: projection.intersectedRoom.y + projection.intersectedRoom.h - 1,
                        });
                        if (!verticalIntersection) return [3 /*break*/, 7];
                        intersectionWidth = verticalIntersection.end - verticalIntersection.start + 1;
                        if (!(intersectionWidth >= 3)) return [3 /*break*/, 6];
                        newRoom_2 = new _Room__WEBPACK_IMPORTED_MODULE_1__["default"]("corridor", projection.fromRoom.difficultyRating);
                        newRoom_2.color = '#655e13';
                        corridorWidth = 3;
                        newRoom_2.x = projection.x;
                        newRoom_2.y = _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(verticalIntersection.start, verticalIntersection.end - corridorWidth);
                        newRoom_2.w = projection.w;
                        newRoom_2.h = corridorWidth;
                        newRoom_2.doBox();
                        newRoom_2.stopGrowthUp = true;
                        newRoom_2.stopGrowthDown = true;
                        // Add door from newRoom to connected room
                        newRoom_2.hotspots.push({
                            x: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT ? 0 : newRoom_2.w - 1),
                            y: 1,
                            facing: expandFacing,
                            toRoom: projection.intersectedRoom.id
                        });
                        newRoom_2.exits.push(projection.intersectedRoom.id);
                        rooms.push(newRoom_2);
                        // Add door from originalRoom to newRoom
                        projection.fromRoom.hotspots.push({
                            x: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT ? 0 : projection.fromRoom.w - 1),
                            y: newRoom_2.y - projection.fromRoom.y + 1,
                            facing: expandFacing,
                            toRoom: newRoom_2.id
                        });
                        projection.fromRoom.exits.push(newRoom_2.id);
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, newRoom_2];
                    case 6:
                        // Intersection too small
                        // We could probably look for intersections with other rooms, but for now
                        // Lets do nothing and hope another rooms intersects back with us
                        if (projection.w > 8) {
                            // We don't want a HUGE filler room to spawn
                            return [2 /*return*/, null];
                        }
                        _a.label = 7;
                    case 7:
                        fillerRoomTypeId = "*";
                        fillerRoomDef = (0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(fillerRoomTypeId);
                        if (projection.w > fillerRoomDef.width[1] || projection.h > fillerRoomDef.height[1]) {
                            return [2 /*return*/, null];
                        }
                        newRoom = new _Room__WEBPACK_IMPORTED_MODULE_1__["default"](fillerRoomTypeId, projection.fromRoom.difficultyRating);
                        newRoom.color = '#655e13';
                        Object.assign(newRoom, {
                            x: projection.x,
                            y: projection.y,
                            w: projection.w,
                            h: projection.h,
                        });
                        newRoom.doBox();
                        if (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.DOWN || expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP) {
                            newRoom.hotspots.push({
                                x: _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(1, newRoom.w - 2),
                                y: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP ? 0 : newRoom.h - 1),
                                facing: expandFacing,
                                toRoom: projection.intersectedRoom.id
                            });
                            rooms.push(newRoom);
                            projection.fromRoom.hotspots.push({
                                x: newRoom.x - projection.fromRoom.x + _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(1, newRoom.w - 2),
                                y: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP ? 0 : projection.fromRoom.h - 1),
                                facing: expandFacing,
                                toRoom: newRoom.id
                            });
                        }
                        else {
                            // Add door from newRoom to connected room
                            newRoom.hotspots.push({
                                x: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT ? 0 : newRoom.w - 1),
                                y: _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(1, newRoom.h - 2),
                                facing: expandFacing,
                                toRoom: projection.intersectedRoom.id
                            });
                            rooms.push(newRoom);
                            // Add door from originalRoom to newRoom
                            projection.fromRoom.hotspots.push({
                                x: (expandFacing == _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT ? 0 : projection.fromRoom.w - 1),
                                y: newRoom.y - projection.fromRoom.y + _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(1, newRoom.h - 2),
                                facing: expandFacing,
                                toRoom: newRoom.id
                            });
                        }
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, newRoom];
                }
            });
        });
    };
    RelaxRooms.prototype.strechLeft = function (rooms, room) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i++ < this.stepGrowth)) return [3 /*break*/, 3];
                        if (!this.canStretchLeft(rooms, room)) {
                            return [2 /*return*/];
                        }
                        room.enlargeLeft();
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RelaxRooms.prototype.strechUp = function (rooms, room) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i++ < this.stepGrowth)) return [3 /*break*/, 3];
                        if (!this.canStretchUp(rooms, room)) {
                            return [2 /*return*/];
                        }
                        room.enlargeUp();
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RelaxRooms.prototype.strechDown = function (rooms, room) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i++ < this.stepGrowth)) return [3 /*break*/, 3];
                        if (!this.canStretchDown(rooms, room)) {
                            return [2 /*return*/];
                        }
                        room.enlargeDown();
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RelaxRooms.prototype.strechRight = function (rooms, room) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i++ < this.stepGrowth)) return [3 /*break*/, 3];
                        if (!this.canStretchRight(rooms, room)) {
                            return [2 /*return*/];
                        }
                        room.enlargeRight();
                        return [4 /*yield*/, _debugControls__WEBPACK_IMPORTED_MODULE_3__["default"].waitClick(rooms)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RelaxRooms.prototype.canStretchLeft = function (rooms, room) {
        if (room.stopGrowthLeft) {
            return false;
        }
        var maxWidth = (0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(room.roomType).width[1];
        if (room.w >= maxWidth) {
            return false;
        }
        if (room.x === this.leftBoundary) {
            room.stopGrowthLeft = true;
            return false;
        }
        for (var y = room.y; y < room.y + room.h; y++) {
            var overlappingRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, room.x - 1, y);
            if (overlappingRoom) {
                return false;
            }
        }
        return true;
    };
    RelaxRooms.prototype.canStretchUp = function (rooms, room) {
        if (room.stopGrowthUp) {
            return false;
        }
        var maxHeight = (0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(room.roomType).height[1];
        if (room.h >= maxHeight) {
            return false;
        }
        if (room.y === this.upperBoundary) {
            room.stopGrowthUp = true;
            return false;
        }
        for (var x = room.x; x < room.x + room.w; x++) {
            var overlappingRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, room.y - 1);
            if (overlappingRoom) {
                return false;
            }
        }
        return true;
    };
    RelaxRooms.prototype.canStretchDown = function (rooms, room) {
        if (room.stopGrowthDown) {
            return false;
        }
        var maxHeight = (0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(room.roomType).height[1];
        if (room.h >= maxHeight) {
            return false;
        }
        if (room.y + room.h >= this.lowerBoundary) {
            room.stopGrowthDown = true;
            return false;
        }
        for (var x = room.x; x < room.x + room.w; x++) {
            var overlappingRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, room.y + room.h);
            if (overlappingRoom) {
                return false;
            }
        }
        return true;
    };
    RelaxRooms.prototype.canStretchRight = function (rooms, room) {
        if (room.stopGrowthRight) {
            return false;
        }
        var maxWidth = (0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(room.roomType).width[1];
        if (room.w >= maxWidth) {
            return false;
        }
        if (room.x + room.w >= this.rightBoundary) {
            room.stopGrowthRight = true;
            return false;
        }
        for (var y = room.y; y < room.y + room.h; y++) {
            var overlappingRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, room.x + room.w, y);
            if (overlappingRoom) {
                return false;
            }
        }
        return true;
    };
    RelaxRooms.prototype.canStretch = function (rooms, room) {
        if (room.stopGrowth) {
            return false;
        }
        return this.canStretchDown(rooms, room) || this.canStretchUp(rooms, room) || this.canStretchLeft(rooms, room) || this.canStretchRight(rooms, room);
    };
    RelaxRooms.prototype.projectRoomLeft = function (rooms, room) {
        for (var x = room.x - 1; x >= this.leftBoundary; x--) {
            for (var y = room.y; y < room.y + room.h; y++) {
                var intersectedRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, y);
                if (intersectedRoom) {
                    return {
                        x: x + 1,
                        y: room.y,
                        w: room.x - x - 1,
                        h: room.h,
                        fromRoom: room,
                        intersectedRoom: intersectedRoom
                    };
                }
            }
        }
        return {
            x: this.leftBoundary,
            y: room.y,
            w: room.x,
            h: room.h,
            fromRoom: room,
            intersectedRoom: undefined
        };
    };
    RelaxRooms.prototype.projectRoomRight = function (rooms, room) {
        for (var x = room.x + room.w; x <= this.rightBoundary; x++) {
            for (var y = room.y; y < room.y + room.h; y++) {
                var intersectedRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, y);
                if (intersectedRoom) {
                    return {
                        x: room.x + room.w,
                        y: room.y,
                        w: x - (room.x + room.w),
                        h: room.h,
                        fromRoom: room,
                        intersectedRoom: intersectedRoom
                    };
                }
            }
        }
        return {
            x: room.x + room.w,
            y: room.y,
            w: this.rightBoundary - (room.x + room.w),
            h: room.h,
            fromRoom: room,
            intersectedRoom: undefined
        };
    };
    RelaxRooms.prototype.projectRoomUp = function (rooms, room) {
        for (var y = room.y - 1; y >= this.upperBoundary; y--) {
            for (var x = room.x; x < room.x + room.w; x++) {
                var intersectedRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, y);
                if (intersectedRoom) {
                    return {
                        x: room.x,
                        y: y + 1,
                        w: room.w,
                        h: room.y - y - 1,
                        fromRoom: room,
                        intersectedRoom: intersectedRoom
                    };
                }
            }
        }
        return {
            x: room.x,
            y: this.upperBoundary,
            w: room.w,
            h: room.y,
            fromRoom: room,
            intersectedRoom: undefined
        };
    };
    RelaxRooms.prototype.projectRoomDown = function (rooms, room) {
        for (var y = room.y + room.h; y <= this.lowerBoundary; y++) {
            for (var x = room.x; x < room.x + room.w; x++) {
                var intersectedRoom = _geo__WEBPACK_IMPORTED_MODULE_5__["default"].getRoomAt(rooms, x, y);
                if (intersectedRoom) {
                    return {
                        x: room.x,
                        y: room.y + room.h,
                        w: room.w,
                        h: y - (room.y + room.h),
                        fromRoom: room,
                        intersectedRoom: intersectedRoom
                    };
                }
            }
        }
        return {
            x: room.x,
            y: room.y + room.h,
            w: room.w,
            h: this.lowerBoundary - (room.y + room.h),
            fromRoom: room,
            intersectedRoom: undefined
        };
    };
    RelaxRooms.prototype.markStopGrowth = function (rooms) {
        for (var ri = 0; ri < rooms.length; ri++) {
            var room = rooms[ri];
            if ((0,_dictionary__WEBPACK_IMPORTED_MODULE_4__["default"])(room.roomType).straightRoom) {
                if (room.generalFacing === _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP || room.generalFacing === _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.DOWN) {
                    room.stopGrowthLeft = true;
                    room.stopGrowthRight = true;
                }
                else if (room.generalFacing === _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT || room.generalFacing === _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.RIGHT) {
                    room.stopGrowthUp = true;
                    room.stopGrowthDown = true;
                }
            }
            // Project the room to the left, see if the projected room touches the boundaries
            var projectedLeftRoom = this.projectRoomLeft(rooms, room);
            if (projectedLeftRoom.w > 0) {
                if (!room.stopGrowthLeft) {
                    room.stopGrowthLeft = projectedLeftRoom.x === this.leftBoundary;
                }
            }
            // Project the room to the right, see if the projected room touches the boundaries
            var projectedRightRoom = this.projectRoomRight(rooms, room);
            if (projectedRightRoom.w > 0) {
                if (!room.stopGrowthRight) {
                    room.stopGrowthRight = projectedRightRoom.w + projectedRightRoom.x === this.rightBoundary;
                }
            }
            var projectedUpRoom = this.projectRoomUp(rooms, room);
            if (projectedUpRoom.h > 0) {
                if (!room.stopGrowthUp) {
                    room.stopGrowthUp = projectedUpRoom.y === this.upperBoundary;
                }
            }
            var projectedDownRoom = this.projectRoomDown(rooms, room);
            if (projectedDownRoom.h > 0) {
                if (!room.stopGrowthDown) {
                    room.stopGrowthDown = projectedDownRoom.h + projectedDownRoom.y === this.lowerBoundary;
                }
            }
        }
    };
    RelaxRooms.prototype.addFillers = function (rooms) {
        return __awaiter(this, void 0, void 0, function () {
            var ri, room, projectedLeftRoom, newRoom, projectedRightRoom, newRoom, projectedUpRoom, newRoom, leftCheck, rightCheck, projectedDownRoom, newRoom, leftCheck, rightCheck;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ri = 0;
                        _a.label = 1;
                    case 1:
                        if (!(ri < rooms.length)) return [3 /*break*/, 10];
                        room = rooms[ri];
                        if (!!room.stopGrowthLeft) return [3 /*break*/, 3];
                        projectedLeftRoom = this.projectRoomLeft(rooms, room);
                        if (!(projectedLeftRoom.w > this.MIN_FILLER_SIZE)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.addRoom(rooms, projectedLeftRoom, _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.LEFT)];
                    case 2:
                        newRoom = _a.sent();
                        if (newRoom) {
                            room.stopGrowthLeft = true;
                        }
                        _a.label = 3;
                    case 3:
                        if (!!room.stopGrowthRight) return [3 /*break*/, 5];
                        projectedRightRoom = this.projectRoomRight(rooms, room);
                        if (!(projectedRightRoom.w > this.MIN_FILLER_SIZE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.addRoom(rooms, projectedRightRoom, _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.RIGHT)];
                    case 4:
                        newRoom = _a.sent();
                        if (newRoom) {
                            room.stopGrowthRight = true;
                        }
                        _a.label = 5;
                    case 5:
                        if (!!room.stopGrowthUp) return [3 /*break*/, 7];
                        projectedUpRoom = this.projectRoomUp(rooms, room);
                        if (!(projectedUpRoom.h > this.MIN_FILLER_SIZE)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.addRoom(rooms, projectedUpRoom, _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.UP)];
                    case 6:
                        newRoom = _a.sent();
                        if (newRoom) {
                            room.stopGrowthUp = true;
                            leftCheck = this.projectRoomLeft(rooms, newRoom);
                            if (leftCheck.w > 0 && leftCheck.x === this.leftBoundary) {
                                newRoom.stopGrowthLeft = true;
                            }
                            rightCheck = this.projectRoomRight(rooms, newRoom);
                            if (rightCheck.w > 0 && rightCheck.w + rightCheck.x === this.rightBoundary) {
                                newRoom.stopGrowthRight = true;
                            }
                        }
                        _a.label = 7;
                    case 7:
                        if (!!room.stopGrowthDown) return [3 /*break*/, 9];
                        projectedDownRoom = this.projectRoomDown(rooms, room);
                        if (!(projectedDownRoom.h > this.MIN_FILLER_SIZE)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.addRoom(rooms, projectedDownRoom, _Facing__WEBPACK_IMPORTED_MODULE_0__.Facing.DOWN)];
                    case 8:
                        newRoom = _a.sent();
                        if (newRoom) {
                            room.stopGrowthDown = true;
                            leftCheck = this.projectRoomLeft(rooms, newRoom);
                            if (leftCheck.w > 0 && leftCheck.x === this.leftBoundary) {
                                newRoom.stopGrowthLeft = true;
                            }
                            rightCheck = this.projectRoomRight(rooms, newRoom);
                            if (rightCheck.w > 0 && rightCheck.w + rightCheck.x === this.rightBoundary) {
                                newRoom.stopGrowthRight = true;
                            }
                        }
                        _a.label = 9;
                    case 9:
                        ri++;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    RelaxRooms.prototype.stretchRooms = function (rooms) {
        return __awaiter(this, void 0, void 0, function () {
            var availableRooms, _loop_1, this_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        availableRooms = __spreadArray([], rooms, true);
                        _loop_1 = function () {
                            var room, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        room = _rand__WEBPACK_IMPORTED_MODULE_6__["default"].from(availableRooms);
                                        _b = _rand__WEBPACK_IMPORTED_MODULE_6__["default"].int(0, 3);
                                        switch (_b) {
                                            case 0: return [3 /*break*/, 1];
                                            case 1: return [3 /*break*/, 3];
                                            case 2: return [3 /*break*/, 5];
                                            case 3: return [3 /*break*/, 7];
                                        }
                                        return [3 /*break*/, 9];
                                    case 1: return [4 /*yield*/, this_1.strechUp(rooms, room)];
                                    case 2:
                                        _c.sent();
                                        return [3 /*break*/, 9];
                                    case 3: return [4 /*yield*/, this_1.strechDown(rooms, room)];
                                    case 4:
                                        _c.sent();
                                        return [3 /*break*/, 9];
                                    case 5: return [4 /*yield*/, this_1.strechLeft(rooms, room)];
                                    case 6:
                                        _c.sent();
                                        return [3 /*break*/, 9];
                                    case 7: return [4 /*yield*/, this_1.strechRight(rooms, room)];
                                    case 8:
                                        _c.sent();
                                        return [3 /*break*/, 9];
                                    case 9:
                                        if (!this_1.canStretch(rooms, room)) {
                                            availableRooms.splice(availableRooms.findIndex(function (r) { return r === room; }), 1);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(availableRooms.length > 0)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RelaxRooms;
}());
var relaxRooms = new RelaxRooms();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (relaxRooms);


/***/ }),

/***/ "./src/ts/roomsMaterializer.ts":
/*!*************************************!*\
  !*** ./src/ts/roomsMaterializer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BruteForceError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BruteForceError */ "./src/ts/BruteForceError.ts");
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dictionary */ "./src/ts/dictionary.ts");
/* harmony import */ var _Facing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Facing */ "./src/ts/Facing.ts");
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");




var RoomsMaterializer = /** @class */ (function () {
    function RoomsMaterializer() {
    }
    RoomsMaterializer.prototype.materializeRooms = function (firstLevel) {
        var dwarf = {
            x: 32, y: 0
        };
        //const facing = rng.int(1, 4);
        //console.log(firstLevel.length);
        var facing = _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP;
        var depth = firstLevel.length; // just for testing
        var croppedLevel = [];
        for (var i = 0; i < depth; i++) {
            croppedLevel.push(firstLevel[i]);
        }
        this.placeRoom(croppedLevel, croppedLevel[0], undefined, facing, dwarf);
        console.log('done end level ');
    };
    RoomsMaterializer.prototype.placeRoom = function (rooms, room, fromRoom, entranceFacing, dwarf) {
        if (!room) {
            //throw new Error('No room');
            return true;
        }
        // console.log('materializing room ' + room.id);
        var metadata = (0,_dictionary__WEBPACK_IMPORTED_MODULE_1__["default"])(room.roomType);
        var possibleBox = this.randomBox(metadata, entranceFacing, dwarf.x, dwarf.y);
        if (this.isOccupied(rooms, possibleBox)) {
            fromRoom.hotspots.find(function (h) { return h.toRoom === room.id; }).toRoom = undefined;
            return false;
        }
        room.box = possibleBox;
        room.generalFacing = entranceFacing;
        // Special non-random placements
        switch (metadata.placement) {
            case 'border':
                var x = void 0, y = void 0;
                switch (entranceFacing) {
                    case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP:
                        x = Math.floor(room.box[2] / 2);
                        y = room.box[3] - 1;
                        break;
                    case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.DOWN:
                        x = Math.floor(room.box[2] / 2);
                        y = 0;
                        break;
                    case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.RIGHT:
                        x = room.box[2] - 1;
                        y = Math.floor(room.box[3] / 2);
                        break;
                    case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.LEFT:
                        x = 0;
                        y = Math.floor(room.box[3] / 2);
                        break;
                }
                room.hotspots.push({ x: x, y: y, facing: entranceFacing });
                break;
            default:
                for (var xx = 1; xx < room.box[2] - 1; xx++) {
                    if (!this.checkOccupied(rooms, room.box[0] + xx, room.box[1] - 1, _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.DOWN)) {
                        room.hotspots.push({ x: xx, y: 0, facing: _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.DOWN });
                    }
                    if (!this.checkOccupied(rooms, room.box[0] + xx, room.box[1] + room.box[3], _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP)) {
                        room.hotspots.push({ x: xx, y: room.box[3] - 1, facing: _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP });
                    }
                }
                for (var yy = 1; yy < room.box[3] - 1; yy++) {
                    if (!this.checkOccupied(rooms, room.box[0] - 1, room.box[1] + yy, _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.LEFT)) {
                        room.hotspots.push({ x: 0, y: yy, facing: _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.LEFT });
                    }
                    if (!this.checkOccupied(rooms, room.box[0] + room.box[2], room.box[1] + yy, _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.RIGHT)) {
                        room.hotspots.push({ x: room.box[2] - 1, y: yy, facing: _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.RIGHT });
                    }
                }
                break;
        }
        var fails = 0;
        if (room.items) {
            room.items.forEach(function (i) {
                var _loop_2 = function () {
                    var ranX = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, room.box[2] - 3);
                    var ranY = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(2, room.box[3] - 3);
                    var existingItem = room.items.find(function (j) { return j.x === ranX && j.y === ranY; });
                    if (existingItem) {
                        fails++;
                        if (fails > 100) {
                            throw new _BruteForceError__WEBPACK_IMPORTED_MODULE_0__["default"]("Failed Items Placement!");
                        }
                        return "continue";
                    }
                    i.x = ranX;
                    i.y = ranY;
                    return "break";
                };
                do {
                    var state_2 = _loop_2();
                    if (state_2 === "break")
                        break;
                } while (true);
            });
        }
        fails = 0;
        var _loop_1 = function (i) {
            var exit = room.exits[i];
            if (fromRoom && exit === fromRoom.id) {
                return out_i_1 = i, "continue";
            }
            // console.log('adding exit to [' + exit + '] for room ' + room.id);
            var availableHotspots = room.hotspots.filter(function (h) { return h.toRoom === undefined; });
            if (availableHotspots.length === 0) {
                // FAIL!
                fromRoom.hotspots.find(function (h) { return h.toRoom === room.id; }).toRoom = undefined;
                return { value: false };
            }
            var hotspot = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].from(availableHotspots);
            hotspot.toRoom = exit;
            var exitToRoom = rooms.find(function (r) { return r.id === exit; });
            if (exitToRoom === fromRoom) {
                return out_i_1 = i, "continue";
            }
            if (!this_1.placeRoom(rooms, exitToRoom, room, hotspot.facing, { x: room.box[0] + hotspot.x, y: room.box[1] + hotspot.y })) {
                i--;
                fails++;
                if (fails > 1000) {
                    throw new _BruteForceError__WEBPACK_IMPORTED_MODULE_0__["default"]("Failed Exit Placement!");
                }
            }
            else {
                if (exitToRoom.lock) {
                    hotspot.lock = exitToRoom.lock;
                }
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < room.exits.length; i++) {
            var state_1 = _loop_1(i);
            i = out_i_1;
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return true;
    };
    RoomsMaterializer.prototype.randomBox = function (metadata, facing, px, py) {
        var w, h;
        switch (facing) {
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP:
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.DOWN:
                w = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(metadata.width[0], metadata.width[1]);
                h = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(metadata.height[0], metadata.height[1]);
                break;
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.LEFT:
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.RIGHT:
                h = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(metadata.width[0], metadata.width[1]);
                w = _rand__WEBPACK_IMPORTED_MODULE_3__["default"].int(metadata.height[0], metadata.height[1]);
                break;
        }
        return this.box(w, h, facing, px, py);
    };
    RoomsMaterializer.prototype.checkOccupied = function (rooms, x, y, facing) {
        return this.isOccupied(rooms, this.box(5, 5, facing, x, y));
    };
    RoomsMaterializer.prototype.isOccupied = function (rooms, box) {
        var _this = this;
        if (rooms.find(function (r) { return r.box && _this.rectOverlap(r.box, box); })) {
            return true;
        }
        if (box[0] < 0 || box[1] < 0 || box[0] + box[2] >= 64 || box[1] + box[3] > 64) {
            return true; // Check if within level bounding box
        }
        return false;
    };
    RoomsMaterializer.prototype.rectOverlap = function (r1, r2) {
        return !(r2[0] > r1[0] + r1[2] - 1 ||
            r2[0] + r2[2] - 1 < r1[0] ||
            r2[1] > r1[1] + r1[3] - 1 ||
            r2[1] + r2[3] - 1 < r1[1]);
    };
    RoomsMaterializer.prototype.box = function (w, h, facing, px, py) {
        switch (facing) {
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.DOWN:
                return [Math.floor(px - w / 2), py - h, w, h];
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.UP:
                return [Math.floor(px - w / 2), py + 1, w, h];
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.RIGHT:
                return [px + 1, Math.floor(py - h / 2), w, h];
            case _Facing__WEBPACK_IMPORTED_MODULE_2__.Facing.LEFT:
                return [px - w, Math.floor(py - h / 2), w, h];
        }
    };
    return RoomsMaterializer;
}());
var roomsMaterializer = new RoomsMaterializer();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (roomsMaterializer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _abstractLayoutGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstractLayoutGenerator */ "./src/ts/abstractLayoutGenerator.ts");
/* harmony import */ var _debugControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debugControls */ "./src/ts/debugControls.ts");
/* harmony import */ var _enemyPopulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemyPopulator */ "./src/ts/enemyPopulator.ts");
/* harmony import */ var _mergeRooms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergeRooms */ "./src/ts/mergeRooms.ts");
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rand */ "./src/ts/rand.ts");
/* harmony import */ var _relaxRooms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./relaxRooms */ "./src/ts/relaxRooms.ts");
/* harmony import */ var _roomsMaterializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./roomsMaterializer */ "./src/ts/roomsMaterializer.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.changeChecked = function () {
        localStorage.setItem("autoStep", document.getElementById("chkAuto").checked ? "true" : "false");
    };
    Generator.prototype.changeSeed = function () {
        localStorage.setItem("seed", document.getElementById("txtSeed").value);
    };
    Generator.prototype.retryClean = function () {
        localStorage.removeItem("seed");
        location.reload();
    };
    Generator.prototype.toggleMeta = function () {
        var metaText = document.getElementById("output");
        metaText.style.visibility = metaText.style.visibility === 'hidden' ? 'visible' : 'hidden';
    };
    Generator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var autoStep, seed, rooms, bigFails, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        autoStep = localStorage.getItem("autoStep");
                        if (autoStep === "true") {
                            document.getElementById("chkAuto").checked = true;
                        }
                        seed = localStorage.getItem("seed");
                        if (!seed || seed === "") {
                            seed = Math.floor(Math.random() * 13000) + "";
                            localStorage.setItem("seed", seed);
                        }
                        document.getElementById("txtSeed").value = seed + "";
                        _rand__WEBPACK_IMPORTED_MODULE_4__["default"].doSeed(parseInt(seed));
                        bigFails = 0;
                        _a.label = 1;
                    case 1:
                        if (false) {}
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        rooms = _abstractLayoutGenerator__WEBPACK_IMPORTED_MODULE_0__["default"].generateRoomsList();
                        _roomsMaterializer__WEBPACK_IMPORTED_MODULE_6__["default"].materializeRooms(rooms);
                        return [4 /*yield*/, _relaxRooms__WEBPACK_IMPORTED_MODULE_5__["default"].getRelaxedRooms(rooms)];
                    case 3:
                        rooms = _a.sent();
                        return [4 /*yield*/, _mergeRooms__WEBPACK_IMPORTED_MODULE_3__["default"].mergeRooms(rooms)];
                    case 4:
                        _a.sent();
                        _enemyPopulator__WEBPACK_IMPORTED_MODULE_2__["default"].populateLevel(rooms);
                        _debugControls__WEBPACK_IMPORTED_MODULE_1__["default"].waitClick(rooms);
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        if (!error_1.bruteForce) {
                            throw error_1;
                        }
                        bigFails++;
                        if (bigFails > 100) {
                            rooms = undefined;
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7:
                        if (!rooms) {
                            document.getElementById('output').innerHTML = "FAIL";
                        }
                        else {
                            document.getElementById('output').innerHTML = JSON.stringify(rooms, null, 3) + "\n\nRooms: " + rooms.length + "\n\nBig Fails: " + bigFails;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
window.generator = new Generator();
window.debugControls = _debugControls__WEBPACK_IMPORTED_MODULE_1__["default"];

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNnRTtBQUNwQjtBQUNFO0FBQ1I7QUFDYjtBQUNhO0FBQ2M7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFHO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLLEVBQUUsRUFBd0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdFQUF1QjtBQUN2RCx3QkFBd0IsMERBQWlCO0FBQ3pDLDZDQUE2QyxtREFBVTtBQUN2RDtBQUNBO0FBQ0EsNkNBQTZDLG1EQUFVO0FBQ3ZEO0FBQ0E7QUFDQSx3QkFBd0IsdURBQWM7QUFDdEMsd0JBQXdCLHNEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsdUJBQXVCLHNEQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdnVsdHVyZXNnZW4vLi9zcmMvdHMvQnJ1dGVGb3JjZUVycm9yLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL0ZhY2luZy50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi8uL3NyYy90cy9Sb29tLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2Fic3RyYWN0TGF5b3V0R2VuZXJhdG9yLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2FycmF5cy50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi8uL3NyYy90cy9jYW52YXNSZW5kZXJlci50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi8uL3NyYy90cy9kZWJ1Z0NvbnRyb2xzLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2RpY3Rpb25hcnkudHMiLCJ3ZWJwYWNrOi8vdnVsdHVyZXNnZW4vLi9zcmMvdHMvZW5lbXlEaWN0aW9uYXJ5LnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2VuZW15UG9wdWxhdG9yLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2dlby50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi8uL3NyYy90cy9tZXJnZVJvb21zLnRzIiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL3JhbmQudHMiLCJ3ZWJwYWNrOi8vdnVsdHVyZXNnZW4vLi9zcmMvdHMvcmVsYXhSb29tcy50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi8uL3NyYy90cy9yb29tc01hdGVyaWFsaXplci50cyIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdnVsdHVyZXNnZW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92dWx0dXJlc2dlbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Z1bHR1cmVzZ2VuLy4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgQnJ1dGVGb3JjZUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCcnV0ZUZvcmNlRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnJ1dGVGb3JjZUVycm9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc2NyaXB0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5icnV0ZUZvcmNlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnJ1dGVGb3JjZUVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0IGRlZmF1bHQgQnJ1dGVGb3JjZUVycm9yO1xuIiwiZXhwb3J0IHZhciBGYWNpbmc7XG4oZnVuY3Rpb24gKEZhY2luZykge1xuICAgIEZhY2luZ1tGYWNpbmdbXCJVUFwiXSA9IDBdID0gXCJVUFwiO1xuICAgIEZhY2luZ1tGYWNpbmdbXCJET1dOXCJdID0gMV0gPSBcIkRPV05cIjtcbiAgICBGYWNpbmdbRmFjaW5nW1wiTEVGVFwiXSA9IDJdID0gXCJMRUZUXCI7XG4gICAgRmFjaW5nW0ZhY2luZ1tcIlJJR0hUXCJdID0gM10gPSBcIlJJR0hUXCI7XG59KShGYWNpbmcgfHwgKEZhY2luZyA9IHt9KSk7XG47XG4iLCJ2YXIgV2FsbFNwb3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2FsbFNwb3QoKSB7XG4gICAgfVxuICAgIHJldHVybiBXYWxsU3BvdDtcbn0oKSk7XG5leHBvcnQgeyBXYWxsU3BvdCB9O1xudmFyIEVuZW15ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVuZW15KCkge1xuICAgIH1cbiAgICByZXR1cm4gRW5lbXk7XG59KCkpO1xuZXhwb3J0IHsgRW5lbXkgfTtcbnZhciBJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEl0ZW0oKSB7XG4gICAgfVxuICAgIHJldHVybiBJdGVtO1xufSgpKTtcbmV4cG9ydCB7IEl0ZW0gfTtcbnZhciBSb29tID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvb20ocm9vbVR5cGUsIGRpZmZpY3VsdHlSYXRpbmcpIHtcbiAgICAgICAgdGhpcy5yb29tVHlwZSA9IHJvb21UeXBlO1xuICAgICAgICB0aGlzLmV4aXRzID0gW107XG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xuICAgICAgICB0aGlzLmhvdHNwb3RzID0gW107XG4gICAgICAgIHRoaXMuc2VxID0gUm9vbS5uZXh0SWQrKztcbiAgICAgICAgdGhpcy5pZCA9IHJvb21UeXBlICsgXCIgWyRcIiArIHRoaXMuc2VxICsgXCJdXCI7XG4gICAgICAgIHRoaXMudm9pZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5UmF0aW5nID0gZGlmZmljdWx0eVJhdGluZztcbiAgICB9XG4gICAgUm9vbS5wcm90b3R5cGUuY2xlYXJWb2lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZvaWRNYXAuY2xlYXIoKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnNldFZvaWQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB0aGlzLnZvaWRNYXAuc2V0KHggKyAnLCcgKyB5LCB0cnVlKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLmlzVm9pZCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZvaWRNYXAuZ2V0KHggKyAnLCcgKyB5KTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLmVubGFyZ2VMZWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLngtLTtcbiAgICAgICAgdGhpcy5ob3RzcG90cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS54Kys7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLncrKztcbiAgICAgICAgdGhpcy5kb0JveCgpO1xuICAgIH07XG4gICAgUm9vbS5wcm90b3R5cGUuZW5sYXJnZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnktLTtcbiAgICAgICAgLy90aGlzLmV4aXRzLmZvckVhY2goZSA9PiBlLnkrKyk7XG4gICAgICAgIC8vdGhpcy5lbmVtaWVzLmZvckVhY2goZSA9PiBlLnkrKyk7XG4gICAgICAgIHRoaXMuaG90c3BvdHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUueSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUueSsrO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oKys7XG4gICAgICAgIHRoaXMuZG9Cb3goKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLmVubGFyZ2VEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvL3RoaXMuZXhpdHMuZm9yRWFjaChlID0+IGUueSsrKTtcbiAgICAgICAgLy90aGlzLmVuZW1pZXMuZm9yRWFjaChlID0+IGUueSsrKTtcbiAgICAgICAgdGhpcy5ob3RzcG90cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS55ID09PSBfdGhpcy5oIC0gMSkge1xuICAgICAgICAgICAgICAgIGUueSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oKys7XG4gICAgICAgIHRoaXMuZG9Cb3goKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLmVubGFyZ2VSaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy90aGlzLmV4aXRzLmZvckVhY2goZSA9PiBlLnkrKyk7XG4gICAgICAgIC8vdGhpcy5lbmVtaWVzLmZvckVhY2goZSA9PiBlLnkrKyk7XG4gICAgICAgIHRoaXMuaG90c3BvdHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUueCA9PT0gX3RoaXMudyAtIDEpIHtcbiAgICAgICAgICAgICAgICBlLngrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudysrO1xuICAgICAgICB0aGlzLmRvQm94KCk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5kb0JveCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ib3ggPSBbdGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oXTsgLy8gVE9ETzogUGhhc2Ugb3V0IHJvb20uYm94XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5hZGRFbmVteURhdGEgPSBmdW5jdGlvbiAoZW5lbXlJZCwgcXVhbnRpdHkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGVuZW15SWQsXG4gICAgICAgICAgICAgICAgaWNvbjogZW5lbXlJZFswXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLmFkZEV4aXQgPSBmdW5jdGlvbiAocm9vbSwgc2Vjb25kKSB7XG4gICAgICAgIC8vdGhpcy5leGl0cy5wdXNoKHJvb20pOyBEaXNhYmxlZCB0byBhdm9pZCBjaXJjdWxhciBkZXBzIGZvciBub3dcbiAgICAgICAgdGhpcy5leGl0cy5wdXNoKHJvb20uaWQpO1xuICAgICAgICBpZiAoIXNlY29uZCkge1xuICAgICAgICAgICAgcm9vbS5hZGRFeGl0KHRoaXMsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5zZXRNaXJyb3IgPSBmdW5jdGlvbiAobWlycm9yUm9vbSkge1xuICAgICAgICAvLyB0aGlzLm1pcnJvclJvb20gPSBtaXJyb3JSb29tO1xuICAgICAgICB0aGlzLm1pcnJvclJvb20gPSBtaXJyb3JSb29tLmlkO1xuICAgIH07XG4gICAgUm9vbS5uZXh0SWQgPSAwO1xuICAgIHJldHVybiBSb29tO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFJvb207XG4iLCJpbXBvcnQgQnJ1dGVGb3JjZUVycm9yIGZyb20gXCIuL0JydXRlRm9yY2VFcnJvclwiO1xuaW1wb3J0IHJvb21EaWN0aW9uYXJ5IGZyb20gXCIuL2RpY3Rpb25hcnlcIjtcbmltcG9ydCBlbmVteVBvcHVsYXRvciBmcm9tIFwiLi9lbmVteVBvcHVsYXRvclwiO1xuaW1wb3J0IHJuZyBmcm9tIFwiLi9yYW5kXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi9Sb29tXCI7XG52YXIgV2VpZ2h0ZWRSb29tVHlwZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWlnaHRlZFJvb21UeXBlKCkge1xuICAgIH1cbiAgICByZXR1cm4gV2VpZ2h0ZWRSb29tVHlwZTtcbn0oKSk7XG52YXIgQWJzdHJhY3RMYXlvdXRHZW5lcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWJzdHJhY3RMYXlvdXRHZW5lcmF0b3IoKSB7XG4gICAgICAgIHRoaXMuQ0xPU0VfUk9PTV9UWVBFUyA9IFtcbiAgICAgICAgICAgIFwiYnJlYWtSb29tXCIsXG4gICAgICAgICAgICBcImluc3RydWN0aW9uUm9vbVwiLFxuICAgICAgICAgICAgXCJ3aW5nUm9vbVwiXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuRkFSX1JPT01fVFlQRVMgPSBbXG4gICAgICAgICAgICBcImludmVzdGlnYXRpb25Sb29tXCIsXG4gICAgICAgICAgICBcImV2aWRlbmNlUm9vbVwiLFxuICAgICAgICAgICAgXCJhcmNoaXZlXCIsXG4gICAgICAgICAgICBcImZpcmluZ1JhbmdlXCIsXG4gICAgICAgICAgICBcImdhcmRlblwiLFxuICAgICAgICAgICAgXCJwcmVzc1Jvb21cIlxuICAgICAgICBdO1xuICAgIH1cbiAgICBBYnN0cmFjdExheW91dEdlbmVyYXRvci5wcm90b3R5cGUuZ2VuZXJhdGVSb29tc0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByb29tcyA9IFtdO1xuICAgICAgICB2YXIgZW50cmFuY2UgPSBuZXcgUm9vbShcImVudHJhbmNlXCIsIDApO1xuICAgICAgICByb29tcy5wdXNoKGVudHJhbmNlKTtcbiAgICAgICAgdmFyIGxvYmJ5ID0gbmV3IFJvb20oXCJsb2JieVwiLCAyKTtcbiAgICAgICAgcm9vbXMucHVzaChsb2JieSk7XG4gICAgICAgIGVudHJhbmNlLmFkZEV4aXQobG9iYnkpO1xuICAgICAgICBsb2JieS5zcGVjcyA9IHtcbiAgICAgICAgICAgIHN5bW1ldHJpYzogcm5nLmNoYW5jZSg1MCksXG4gICAgICAgICAgICB0b3BBdHRhY2htZW50OiBybmcuY2hhbmNlKDUwKSxcbiAgICAgICAgICAgIGJvdHRvbUF0dGFjaG1lbnQ6IHJuZy5jaGFuY2UoNTApXG4gICAgICAgIH07XG4gICAgICAgIHZhciBjbG9zZVJvb21zID0gMiArIHJuZy5pbnQoNCwgNik7XG4gICAgICAgIHZhciBsb2JieUNvcmUgPSBbXTtcbiAgICAgICAgbG9iYnlDb3JlLnB1c2gobG9iYnkpO1xuICAgICAgICB2YXIgYXZhaWxhYmxlQ2xvc2VSb29tcyA9IHRoaXMuQ0xPU0VfUk9PTV9UWVBFUy5tYXAoZnVuY3Rpb24gKHJ0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvb21UeXBlOiBydCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IHJvb21EaWN0aW9uYXJ5KHJ0KS53ZWlnaHQgfHwgMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RyZXRjaChhdmFpbGFibGVDbG9zZVJvb21zLCAxMDApO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgcm9vbVR5cGUgPSBybmcud2VpZ2h0ZWRGcm9tKGF2YWlsYWJsZUNsb3NlUm9vbXMsIGZ1bmN0aW9uICh3cnQpIHsgcmV0dXJuIHdydC53ZWlnaHQ7IH0sIGZ1bmN0aW9uICh3cnQpIHsgcmV0dXJuIHdydC5yb29tVHlwZTsgfSwgMTAwKTtcbiAgICAgICAgICAgIGlmICghdGhpc18xLmNhbkFkZChyb29tcywgcm9vbVR5cGUsIGxvYmJ5LnNwZWNzLnN5bW1ldHJpYykpIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ2xvc2VSb29tcy5zcGxpY2UoYXZhaWxhYmxlQ2xvc2VSb29tcy5maW5kSW5kZXgoZnVuY3Rpb24gKHdydCkgeyByZXR1cm4gd3J0LnJvb21UeXBlID09PSByb29tVHlwZTsgfSksIDEpO1xuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVDbG9zZVJvb21zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyB0aGlzXzEucHJvY2dlbkVycm9yKFwiQXZhaWxhYmxlIHJvb20gc3RhcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc18xLnN0cmV0Y2goYXZhaWxhYmxlQ2xvc2VSb29tcywgMTAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0X2lfMSA9IGksIFwiY29udGludWVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjbG9zZVJvb20gPSBuZXcgUm9vbShyb29tVHlwZSwgMSk7XG4gICAgICAgICAgICByb29tcy5wdXNoKGNsb3NlUm9vbSk7XG4gICAgICAgICAgICBsb2JieUNvcmUucHVzaChjbG9zZVJvb20pO1xuICAgICAgICAgICAgbG9iYnkuYWRkRXhpdChjbG9zZVJvb20pO1xuICAgICAgICAgICAgaWYgKGxvYmJ5LnNwZWNzLnN5bW1ldHJpYykge1xuICAgICAgICAgICAgICAgIHZhciBtaXJyb3JSb29tID0gbmV3IFJvb20oY2xvc2VSb29tLnJvb21UeXBlLCAxKTtcbiAgICAgICAgICAgICAgICBtaXJyb3JSb29tLnNldE1pcnJvcihjbG9zZVJvb20pO1xuICAgICAgICAgICAgICAgIHJvb21zLnB1c2gobWlycm9yUm9vbSk7XG4gICAgICAgICAgICAgICAgbG9iYnlDb3JlLnB1c2gobWlycm9yUm9vbSk7XG4gICAgICAgICAgICAgICAgbG9iYnkuYWRkRXhpdChtaXJyb3JSb29tKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRfaV8xID0gaTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXMsIG91dF9pXzE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvc2VSb29tczsgaSsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICAgICAgaSA9IG91dF9pXzE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvcnJpZG9ycyA9IHJuZy5pbnQoMiwgMyk7XG4gICAgICAgIHZhciBmaXJzdExheWVyQ29ycmlkb3JzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29ycmlkb3JzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjbG9zZVJvb20gPSBybmcuZnJvbShsb2JieUNvcmUpO1xuICAgICAgICAgICAgdmFyIGNvcnJpZG9yXzEgPSBuZXcgUm9vbShcImNvcnJpZG9yXCIsIDIpO1xuICAgICAgICAgICAgY29ycmlkb3JfMS5hZGRFeGl0KGNsb3NlUm9vbSk7XG4gICAgICAgICAgICByb29tcy5wdXNoKGNvcnJpZG9yXzEpO1xuICAgICAgICAgICAgZmlyc3RMYXllckNvcnJpZG9ycy5wdXNoKGNvcnJpZG9yXzEpO1xuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmlkb3JFeHRlbnNpb24gPSBuZXcgUm9vbShcImNvcnJpZG9yXCIsIDIpO1xuICAgICAgICAgICAgICAgIGNvcnJpZG9yRXh0ZW5zaW9uLmFkZEV4aXQoY29ycmlkb3JfMSk7XG4gICAgICAgICAgICAgICAgcm9vbXMucHVzaChjb3JyaWRvckV4dGVuc2lvbik7XG4gICAgICAgICAgICAgICAgZmlyc3RMYXllckNvcnJpZG9ycy5wdXNoKGNvcnJpZG9yRXh0ZW5zaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3RMYXllclJvb21zID0gMiArIHJuZy5pbnQoMiwgMyk7XG4gICAgICAgIHZhciBmaXJzdExheWVyUm9vbXNMaXN0ID0gW107XG4gICAgICAgIHZhciBhdmFpbGFibGVGYXJSb29tVHlwZXMgPSB0aGlzLkZBUl9ST09NX1RZUEVTLm1hcChmdW5jdGlvbiAocnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcm9vbVR5cGU6IHJ0LFxuICAgICAgICAgICAgICAgIHdlaWdodDogcm9vbURpY3Rpb25hcnkocnQpLndlaWdodCB8fCAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdHJldGNoKGF2YWlsYWJsZUZhclJvb21UeXBlcywgMTAwKTtcbiAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdmFyIGNvcnJpZG9yXzIgPSBybmcuZnJvbShmaXJzdExheWVyQ29ycmlkb3JzKTtcbiAgICAgICAgICAgIHZhciByb29tVHlwZSA9IHJuZy53ZWlnaHRlZEZyb20oYXZhaWxhYmxlRmFyUm9vbVR5cGVzLCBmdW5jdGlvbiAod3J0KSB7IHJldHVybiB3cnQud2VpZ2h0OyB9LCBmdW5jdGlvbiAod3J0KSB7IHJldHVybiB3cnQucm9vbVR5cGU7IH0sIDEwMCk7XG4gICAgICAgICAgICBpZiAoIXRoaXNfMi5jYW5BZGQocm9vbXMsIHJvb21UeXBlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlRmFyUm9vbVR5cGVzLnNwbGljZShhdmFpbGFibGVGYXJSb29tVHlwZXMuZmluZEluZGV4KGZ1bmN0aW9uICh3cnQpIHsgcmV0dXJuIHdydC5yb29tVHlwZSA9PT0gcm9vbVR5cGU7IH0pLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRmFyUm9vbVR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyB0aGlzXzIucHJvY2dlbkVycm9yKFwiQXZhaWxhYmxlIHJvb20gc3RhcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc18yLnN0cmV0Y2goYXZhaWxhYmxlRmFyUm9vbVR5cGVzLCAxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBvdXRfaV8yID0gaSwgXCJjb250aW51ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZpcnN0TGF5ZXJSb29tID0gbmV3IFJvb20ocm9vbVR5cGUsIDMpO1xuICAgICAgICAgICAgY29ycmlkb3JfMi5hZGRFeGl0KGZpcnN0TGF5ZXJSb29tKTtcbiAgICAgICAgICAgIHJvb21zLnB1c2goZmlyc3RMYXllclJvb20pO1xuICAgICAgICAgICAgZmlyc3RMYXllclJvb21zTGlzdC5wdXNoKGZpcnN0TGF5ZXJSb29tKTtcbiAgICAgICAgICAgIG91dF9pXzIgPSBpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhpc18yID0gdGhpcywgb3V0X2lfMjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdExheWVyUm9vbXM7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMihpKTtcbiAgICAgICAgICAgIGkgPSBvdXRfaV8yO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXlSb29tcyA9IHRoaXMucGxhY2VLZXlBbmRMb2NrKHJvb21zLCBmaXJzdExheWVyUm9vbXNMaXN0LCAnazEnKTtcbiAgICAgICAgdmFyIHByaW9yUm9vbSA9IHJvb21zLmZpbmQoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuaWQgPT09IGtleVJvb21zLmtleS5leGl0c1swXTsgfSk7XG4gICAgICAgIGVuZW15UG9wdWxhdG9yLmFkZFBvbGljZUJvc3NFbmNvdW50ZXIocHJpb3JSb29tLnJvb21UeXBlID09PSAnY29ycmlkb3InID8ga2V5Um9vbXMua2V5IDogcHJpb3JSb29tKTtcbiAgICAgICAgdmFyIHNlY29uZExheWVyQ29ycmlkb3JzID0gW107XG4gICAgICAgIHZhciBjb3JyaWRvciA9IHJuZy5mcm9tKGZpcnN0TGF5ZXJDb3JyaWRvcnMpO1xuICAgICAgICB2YXIgb2ZmaWNlcyA9IG5ldyBSb29tKFwib2ZmaWNlc1wiLCA0KTtcbiAgICAgICAgY29ycmlkb3IuYWRkRXhpdChvZmZpY2VzKTtcbiAgICAgICAgcm9vbXMucHVzaChvZmZpY2VzKTtcbiAgICAgICAgdmFyIGNoaWVmT2ZmaWNlID0gbmV3IFJvb20oXCJjaGllZk9mZmljZVwiLCA0KTtcbiAgICAgICAgb2ZmaWNlcy5hZGRFeGl0KGNoaWVmT2ZmaWNlKTtcbiAgICAgICAgcm9vbXMucHVzaChjaGllZk9mZmljZSk7XG4gICAgICAgIHNlY29uZExheWVyQ29ycmlkb3JzLnB1c2goY2hpZWZPZmZpY2UpO1xuICAgICAgICB2YXIgY2VsbHMgPSBuZXcgUm9vbShcImNlbGxzXCIsIDUpO1xuICAgICAgICBvZmZpY2VzLmFkZEV4aXQoY2VsbHMpO1xuICAgICAgICBzZWNvbmRMYXllckNvcnJpZG9ycy5wdXNoKGNlbGxzKTtcbiAgICAgICAgcm9vbXMucHVzaChjZWxscyk7XG4gICAgICAgIHZhciBtb3JlQ29ycmlkb3JzID0gcm5nLmludCgyLCAzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3JlQ29ycmlkb3JzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjbG9zZUNvcnJpZG9yID0gcm5nLmZyb20oZmlyc3RMYXllckNvcnJpZG9ycyk7XG4gICAgICAgICAgICB2YXIgY29ycmlkb3JfMyA9IG5ldyBSb29tKFwiY29ycmlkb3JcIiwgMyk7XG4gICAgICAgICAgICBjbG9zZUNvcnJpZG9yLmFkZEV4aXQoY29ycmlkb3JfMyk7XG4gICAgICAgICAgICByb29tcy5wdXNoKGNvcnJpZG9yXzMpO1xuICAgICAgICAgICAgc2Vjb25kTGF5ZXJDb3JyaWRvcnMucHVzaChjb3JyaWRvcl8zKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2Vjb25kTGF5ZXJSb29tcyA9IHJuZy5pbnQoMiwgMyk7XG4gICAgICAgIHZhciBzZWNvbmRMYXllclJvb21zTGlzdCA9IFtdO1xuICAgICAgICB2YXIgX2xvb3BfMyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgY29ycmlkb3JfNCA9IHJuZy5mcm9tKHNlY29uZExheWVyQ29ycmlkb3JzKTtcbiAgICAgICAgICAgIHZhciByb29tVHlwZSA9IHJuZy53ZWlnaHRlZEZyb20oYXZhaWxhYmxlRmFyUm9vbVR5cGVzLCBmdW5jdGlvbiAod3J0KSB7IHJldHVybiB3cnQud2VpZ2h0OyB9LCBmdW5jdGlvbiAod3J0KSB7IHJldHVybiB3cnQucm9vbVR5cGU7IH0sIDEwMCk7XG4gICAgICAgICAgICBpZiAoIXRoaXNfMy5jYW5BZGQocm9vbXMsIHJvb21UeXBlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlRmFyUm9vbVR5cGVzLnNwbGljZShhdmFpbGFibGVGYXJSb29tVHlwZXMuZmluZEluZGV4KGZ1bmN0aW9uICh3cnQpIHsgcmV0dXJuIHdydC5yb29tVHlwZSA9PT0gcm9vbVR5cGU7IH0pLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRmFyUm9vbVR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyB0aGlzXzMucHJvY2dlbkVycm9yKFwiQXZhaWxhYmxlIHJvb20gc3RhcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc18zLnN0cmV0Y2goYXZhaWxhYmxlRmFyUm9vbVR5cGVzLCAxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBvdXRfaV8zID0gaSwgXCJjb250aW51ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNlY29uZExheWVyUm9vbSA9IG5ldyBSb29tKHJvb21UeXBlLCA0KTtcbiAgICAgICAgICAgIGNvcnJpZG9yXzQuYWRkRXhpdChzZWNvbmRMYXllclJvb20pO1xuICAgICAgICAgICAgcm9vbXMucHVzaChzZWNvbmRMYXllclJvb20pO1xuICAgICAgICAgICAgc2Vjb25kTGF5ZXJSb29tc0xpc3QucHVzaChzZWNvbmRMYXllclJvb20pO1xuICAgICAgICAgICAgb3V0X2lfMyA9IGk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0aGlzXzMgPSB0aGlzLCBvdXRfaV8zO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlY29uZExheWVyUm9vbXM7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMyhpKTtcbiAgICAgICAgICAgIGkgPSBvdXRfaV8zO1xuICAgICAgICB9XG4gICAgICAgIGtleVJvb21zID0gdGhpcy5wbGFjZUtleUFuZExvY2socm9vbXMsIHNlY29uZExheWVyUm9vbXNMaXN0LCAnazInLCAnU3UnKTtcbiAgICAgICAgcHJpb3JSb29tID0gcm9vbXMuZmluZChmdW5jdGlvbiAocikgeyByZXR1cm4gci5pZCA9PT0ga2V5Um9vbXMua2V5LmV4aXRzWzBdOyB9KTtcbiAgICAgICAgZW5lbXlQb3B1bGF0b3IuYWRkU2hhZG93RW5jb3VudGVyKHByaW9yUm9vbS5yb29tVHlwZSA9PT0gJ2NvcnJpZG9yJyA/IGtleVJvb21zLmtleSA6IHByaW9yUm9vbSk7XG4gICAgICAgIHZhciBfbG9vcF80ID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciByb29tID0gcm9vbXNbaV07XG4gICAgICAgICAgICBpZiAocm9vbS5yb29tVHlwZSA9PT0gJ2NvcnJpZG9yJyAmJiByb29tLmV4aXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tUm9vbUV4aXRzID0gcm9vbXMuZmluZChmdW5jdGlvbiAocikgeyByZXR1cm4gci5pZCA9PT0gcm9vbS5leGl0c1swXTsgfSkuZXhpdHM7XG4gICAgICAgICAgICAgICAgZnJvbVJvb21FeGl0cy5zcGxpY2UoZnJvbVJvb21FeGl0cy5pbmRleE9mKHJvb20uaWQpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gUmVtb3ZlIGNvcnJpZG9ycyBsZWFkaW5nIG5vd2hlcmUsIGxhc3QgdG8gZmlyc3RcbiAgICAgICAgZm9yICh2YXIgaSA9IHJvb21zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBfbG9vcF80KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb29tcztcbiAgICB9O1xuICAgIEFic3RyYWN0TGF5b3V0R2VuZXJhdG9yLnByb3RvdHlwZS5zdHJldGNoID0gZnVuY3Rpb24gKGFycmF5LCBtYXgpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGFycmF5WzBdLndlaWdodCA9IG1heDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGFycmF5W2ldLndlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmF0aW8gPSBtYXggLyBzdW07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5W2ldLndlaWdodCA9IGFycmF5W2ldLndlaWdodCAqIHJhdGlvO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBYnN0cmFjdExheW91dEdlbmVyYXRvci5wcm90b3R5cGUuY2FuQWRkID0gZnVuY3Rpb24gKHJvb21zLCByb29tVHlwZSwgc3ltbWV0cmljKSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHJvb21EaWN0aW9uYXJ5KHJvb21UeXBlKTtcbiAgICAgICAgaWYgKG1ldGFkYXRhICYmIG1ldGFkYXRhLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFJvb21zID0gcm9vbXMucmVkdWNlKGZ1bmN0aW9uIChhY3VtLCByKSB7IHJldHVybiBhY3VtICsgKHIucm9vbVR5cGUgPT09IHJvb21UeXBlID8gMSA6IDApOyB9LCAwKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Um9vbXMgKyAoc3ltbWV0cmljID8gMSA6IDApID49IG1ldGFkYXRhLm1heCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEFic3RyYWN0TGF5b3V0R2VuZXJhdG9yLnByb3RvdHlwZS5wbGFjZUtleUFuZExvY2sgPSBmdW5jdGlvbiAoYWxsUm9vbXMsIHJvb21zLCBrZXlDb2RlLCBsb2NrZWRSZXdhcmQpIHtcbiAgICAgICAgdmFyIGZhaWxzID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciByMSA9IHJuZy5mcm9tKHJvb21zKTtcbiAgICAgICAgICAgIHZhciByMiA9IHJuZy5mcm9tKHJvb21zKTtcbiAgICAgICAgICAgIGlmIChyMSA9PT0gcjIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByb29tRGlzdGFuY2UgPSB0aGlzLmdldFJvb21EaXN0YW5jZShhbGxSb29tcywgcjEsIHIyLCByMS5pZCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJvb20gZGlzdGFuY2UgXCIgKyByb29tRGlzdGFuY2UpO1xuICAgICAgICAgICAgaWYgKHJvb21EaXN0YW5jZSA8IDUpIHtcbiAgICAgICAgICAgICAgICBmYWlscysrO1xuICAgICAgICAgICAgICAgIGlmIChmYWlscyA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyB0aGlzLnByb2NnZW5FcnJvcihcIkZhaWxlZCBLZXkvTG9jayBQbGFjZW1lbnQhXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHIxLml0ZW1zID0gW3sgaWQ6IGtleUNvZGUgfV07XG4gICAgICAgICAgICByMi5sb2NrID0ga2V5Q29kZTtcbiAgICAgICAgICAgIGlmIChsb2NrZWRSZXdhcmQpIHtcbiAgICAgICAgICAgICAgICByMi5pdGVtcyA9IFt7IGlkOiBsb2NrZWRSZXdhcmQgfV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBrZXk6IHIxLCBsb2NrZWQ6IHIyIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFic3RyYWN0TGF5b3V0R2VuZXJhdG9yLnByb3RvdHlwZS5nZXRSb29tRGlzdGFuY2UgPSBmdW5jdGlvbiAocm9vbXMsIHIxLCByMiwgZnJvbVJvb21JZCkge1xuICAgICAgICBpZiAocjEgPT0gcjIpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5EaXN0YW5jZSA9IDk5OTk7XG4gICAgICAgIHZhciBfbG9vcF81ID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciBleGl0ID0gcjEuZXhpdHNbaV07XG4gICAgICAgICAgICBpZiAoZXhpdCA9PT0gZnJvbVJvb21JZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhpdCA9PT0gcjIuaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogMSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpc180LmdldFJvb21EaXN0YW5jZShyb29tcywgcm9vbXMuZmluZChmdW5jdGlvbiAocikgeyByZXR1cm4gci5pZCA9PT0gZXhpdDsgfSksIHIyLCByMS5pZCk7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0aGlzXzQgPSB0aGlzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIxLmV4aXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzUoaSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlXzEgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXzEudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDEgKyBtaW5EaXN0YW5jZTtcbiAgICB9O1xuICAgIEFic3RyYWN0TGF5b3V0R2VuZXJhdG9yLnByb3RvdHlwZS5wcm9jZ2VuRXJyb3IgPSBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCcnV0ZUZvcmNlRXJyb3IoZGVzY3JpcHRpb24pO1xuICAgIH07XG4gICAgcmV0dXJuIEFic3RyYWN0TGF5b3V0R2VuZXJhdG9yO1xufSgpKTtcbnZhciBhYnN0cmFjdExheW91dEdlbmVyYXRvciA9IG5ldyBBYnN0cmFjdExheW91dEdlbmVyYXRvcigpO1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3RMYXlvdXRHZW5lcmF0b3I7XG4iLCJpbXBvcnQgcm5nIGZyb20gXCIuL3JhbmRcIjtcbnZhciBBcnJheXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJyYXlzKCkge1xuICAgIH1cbiAgICBBcnJheXMucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoYXJyYXksIGMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGMoYXJyYXlbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBBcnJheXMucHJvdG90eXBlLnNodWZmbGUgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCByYW5kb21JbmRleDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3Iocm5nLnNlZWRlZCgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleC0tO1xuICAgICAgICAgICAgX2EgPSBbXG4gICAgICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdLCBhcnJheVtjdXJyZW50SW5kZXhdXG4gICAgICAgICAgICBdLCBhcnJheVtjdXJyZW50SW5kZXhdID0gX2FbMF0sIGFycmF5W3JhbmRvbUluZGV4XSA9IF9hWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuICAgIHJldHVybiBBcnJheXM7XG59KCkpO1xudmFyIGFycmF5cyA9IG5ldyBBcnJheXMoKTtcbmV4cG9ydCBkZWZhdWx0IGFycmF5cztcbiIsInZhciBTSE9XX1VOVVNFRF9ET09SUyA9IGZhbHNlO1xudmFyIENhbnZhc1JlbmRlcmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbnZhc1JlbmRlcmVyKCkge1xuICAgIH1cbiAgICBDYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZHJhd1NrZXRjaCA9IGZ1bmN0aW9uIChyb29tcywgY2FudmFzSWQsIG92ZXJsYXkpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29udGV4dC5mb250ID0gXCIxNnB4IENvdXJpZXJcIjtcbiAgICAgICAgaWYgKCFvdmVybGF5KVxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdmFyIHpvb20gPSAzMjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGFyZWEgPSByb29tc1tpXTtcbiAgICAgICAgICAgIGlmICghYXJlYS5ib3gpXG4gICAgICAgICAgICAgICAgY29udGludWU7IC8vIE9ubHkgZm9yIHRlc3RzXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IGFyZWEuYm94WzBdOyB4IDwgYXJlYS5ib3hbMF0gKyBhcmVhLmJveFsyXTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IGFyZWEuYm94WzFdOyB5IDwgYXJlYS5ib3hbMV0gKyBhcmVhLmJveFszXTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVhLmlzVm9pZCh4IC0gYXJlYS5ib3hbMF0sIHkgLSBhcmVhLmJveFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSBob2xlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoeCAqIHpvb20sIHkgKiB6b29tLCB6b29tLCB6b29tKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyM0NDQ0NDQnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYXJlYS5jb2xvciB8fCAnIzE5MmIxOSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE86IFNvbWVob3cgZml4IG91dGxpbmUgZm9yIGlycmVndWxhciByb29tc1xuICAgICAgICAgICAgaWYgKCFhcmVhLmlycmVndWxhcikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KGFyZWEuYm94WzBdICogem9vbSwgYXJlYS5ib3hbMV0gKiB6b29tLCBhcmVhLmJveFsyXSAqIHpvb20sIGFyZWEuYm94WzNdICogem9vbSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSA1O1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXJlYURlc2NyaXB0aW9uID0gYXJlYS5yb29tVHlwZTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQoYXJlYURlc2NyaXB0aW9uLCAoYXJlYS5ib3hbMF0pICogem9vbSArIDUsIChhcmVhLmJveFsxXSkgKiB6b29tICsgMjApO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChhcmVhLnNlcSArIFwiXCIsIChhcmVhLmJveFswXSkgKiB6b29tICsgNSwgKGFyZWEuYm94WzFdKSAqIHpvb20gKyA0MCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyZWEuaG90c3BvdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYnJpZGdlID0gYXJlYS5ob3RzcG90c1tqXTtcbiAgICAgICAgICAgICAgICBpZiAoIWJyaWRnZS50b1Jvb20gJiYgIVNIT1dfVU5VU0VEX0RPT1JTKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdCgoYXJlYS5ib3hbMF0gKyBicmlkZ2UueCkgKiB6b29tIC8qLSB6b29tIC8gMiovLCAoYXJlYS5ib3hbMV0gKyBicmlkZ2UueSkgKiB6b29tIC8qLSB6b29tIC8gMiovLCB6b29tLCB6b29tKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGJyaWRnZS50b1Jvb20gPyAneWVsbG93JyA6ICdibHVlJztcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGlmIChicmlkZ2UubG9jaykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGJyaWRnZS5sb2NrLCAoYXJlYS5ib3hbMF0gKyBicmlkZ2UueCkgKiB6b29tICsgNSwgKGFyZWEuYm94WzFdICsgYnJpZGdlLnkpICogem9vbSArIDIwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJlYS5pdGVtcylcbiAgICAgICAgICAgICAgICBhcmVhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KChhcmVhLmJveFswXSArIGkueCkgKiB6b29tICsgMiwgKGFyZWEuYm94WzFdICsgaS55KSAqIHpvb20gKyAyLCB6b29tIC0gNCwgem9vbSAtIDQpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChpLmlkLCAoYXJlYS5ib3hbMF0gKyBpLngpICogem9vbSArIDUsIChhcmVhLmJveFsxXSArIGkueSkgKiB6b29tICsgMjApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFyZWEuZW5lbWllcylcbiAgICAgICAgICAgICAgICBhcmVhLmVuZW1pZXMuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoKGFyZWEuYm94WzBdICsgaS54KSAqIHpvb20sIChhcmVhLmJveFsxXSArIGkueSkgKiB6b29tLCB6b29tLCB6b29tKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSAyO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3B1cnBsZSc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQoaS5pY29uLCAoYXJlYS5ib3hbMF0gKyBpLngpICogem9vbSArIDUsIChhcmVhLmJveFsxXSArIGkueSkgKiB6b29tICsgMjApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FudmFzUmVuZGVyZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgQ2FudmFzUmVuZGVyZXI7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IENhbnZhc1JlbmRlcmVyIGZyb20gXCIuL2NhbnZhc1JlbmRlcmVyXCI7XG52YXIgRGVidWdDb250cm9scyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWJ1Z0NvbnRyb2xzKHJlbmRlckZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRnVuY3Rpb24gPSByZW5kZXJGdW5jdGlvbjtcbiAgICB9XG4gICAgRGVidWdDb250cm9scy5wcm90b3R5cGUud2FpdENsaWNrID0gZnVuY3Rpb24gKHJvb21zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJGdW5jdGlvbihyb29tcyk7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hrQXV0b1wiKS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlc29sdmUoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xpY2tSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGVidWdDb250cm9scy5wcm90b3R5cGUuc3RlcEdlbmVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrUmVzb2x2ZSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja1Jlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERlYnVnQ29udHJvbHM7XG59KCkpO1xudmFyIGNhbnZhc1JlbmRlcmVyID0gbmV3IENhbnZhc1JlbmRlcmVyKCk7XG52YXIgZGVidWdDb250cm9scyA9IG5ldyBEZWJ1Z0NvbnRyb2xzKGZ1bmN0aW9uIChsZXZlbCkgeyByZXR1cm4gY2FudmFzUmVuZGVyZXIuZHJhd1NrZXRjaChsZXZlbCwgJ2xldmVsQ2FudmFzJywgZmFsc2UpOyB9KTtcbmV4cG9ydCBkZWZhdWx0IGRlYnVnQ29udHJvbHM7XG4iLCJ2YXIgUm9vbU1ldGFkYXRhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvb21NZXRhZGF0YSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFJvb21NZXRhZGF0YTtcbn0oKSk7XG5leHBvcnQgeyBSb29tTWV0YWRhdGEgfTtcbnZhciBtZXRhZGF0dW0gPSB7XG4gICAgZW50cmFuY2U6IHtcbiAgICAgICAgd2lkdGg6IFs1LCA3XSxcbiAgICAgICAgaGVpZ2h0OiBbOCwgMTBdLFxuICAgICAgICBleGl0U3BvdHM6ICd0b3BDZW50ZXInLFxuICAgICAgICBwbGFjZW1lbnQ6ICdib3JkZXInLFxuICAgICAgICBzdHJhaWdodFJvb206IHRydWVcbiAgICB9LFxuICAgIGxvYmJ5OiB7XG4gICAgICAgIHdpZHRoOiBbMTAsIDE0XSxcbiAgICAgICAgaGVpZ2h0OiBbMTAsIDE0XVxuICAgIH0sXG4gICAgb2ZmaWNlczoge1xuICAgICAgICB3aWR0aDogWzEwLCAxNF0sXG4gICAgICAgIGhlaWdodDogWzEwLCAxNF1cbiAgICB9LFxuICAgIGdhcmRlbjoge1xuICAgICAgICB3aWR0aDogWzYsIDhdLFxuICAgICAgICBoZWlnaHQ6IFs2LCA4XSxcbiAgICAgICAgbWF4OiAxXG4gICAgfSxcbiAgICBjZWxsczoge1xuICAgICAgICB3aWR0aDogWzEwLCAxNF0sXG4gICAgICAgIGhlaWdodDogWzEwLCAxNF1cbiAgICB9LFxuICAgIHByZXNzUm9vbToge1xuICAgICAgICB3aWR0aDogWzEwLCAxNF0sXG4gICAgICAgIGhlaWdodDogWzEwLCAxNF1cbiAgICB9LFxuICAgIGJyZWFrUm9vbToge1xuICAgICAgICB3aWR0aDogWzQsIDZdLFxuICAgICAgICBoZWlnaHQ6IFs0LCA2XSxcbiAgICAgICAgd2VpZ2h0OiAxLjVcbiAgICB9LFxuICAgIHdpbmdSb29tOiB7XG4gICAgICAgIHdpZHRoOiBbNCwgNl0sXG4gICAgICAgIGhlaWdodDogWzQsIDZdLFxuICAgICAgICBtYXg6IDIsXG4gICAgICAgIHdlaWdodDogMC41XG4gICAgfSxcbiAgICBpbnN0cnVjdGlvblJvb206IHtcbiAgICAgICAgd2lkdGg6IFs2LCA4XSxcbiAgICAgICAgaGVpZ2h0OiBbNiwgOF0sXG4gICAgICAgIG1heDogMlxuICAgIH0sXG4gICAgY29ycmlkb3I6IHtcbiAgICAgICAgd2lkdGg6IFszLCA0XSxcbiAgICAgICAgaGVpZ2h0OiBbOCwgMTJdLFxuICAgICAgICBzdHJhaWdodFJvb206IHRydWVcbiAgICB9LFxuICAgIGZpcmluZ1JhbmdlOiB7XG4gICAgICAgIHdpZHRoOiBbMywgNV0sXG4gICAgICAgIGhlaWdodDogWzgsIDEwXSxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdHJhaWdodFJvb206IHRydWVcbiAgICB9LFxuICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgd2lkdGg6IFs0LCA2XSxcbiAgICAgICAgaGVpZ2h0OiBbNCwgNl1cbiAgICB9XG59O1xuZnVuY3Rpb24gcm9vbURpY3Rpb25hcnkocm9vbVR5cGVJZCkge1xuICAgIGlmIChtZXRhZGF0dW1bcm9vbVR5cGVJZF0pIHtcbiAgICAgICAgcmV0dXJuIG1ldGFkYXR1bVtyb29tVHlwZUlkXTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGFkYXR1bS5kZWZhdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgcm9vbURpY3Rpb25hcnk7XG4iLCJ2YXIgZW5lbXlEaWN0aW9uYXJ5ID0gW1xuICAgIHtcbiAgICAgICAgaWQ6ICd6b21iaWUnLFxuICAgICAgICBkaWZmaWN1bHR5UmF0aW5nOiAxXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnZ3JlZW5ab21iaWUnLFxuICAgICAgICBkaWZmaWN1bHR5UmF0aW5nOiAyXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAncmVkWm9tYmllJyxcbiAgICAgICAgZGlmZmljdWx0eVJhdGluZzogM1xuICAgIH0sXG5dO1xuZXhwb3J0IGRlZmF1bHQgZW5lbXlEaWN0aW9uYXJ5O1xuIiwiaW1wb3J0IGFycmF5cyBmcm9tIFwiLi9hcnJheXNcIjtcbmltcG9ydCBCcnV0ZUZvcmNlRXJyb3IgZnJvbSBcIi4vQnJ1dGVGb3JjZUVycm9yXCI7XG5pbXBvcnQgZW5lbXlEaWN0aW9uYXJ5IGZyb20gXCIuL2VuZW15RGljdGlvbmFyeVwiO1xuaW1wb3J0IGdlbyBmcm9tIFwiLi9nZW9cIjtcbmltcG9ydCBybmcgZnJvbSBcIi4vcmFuZFwiO1xudmFyIEVuZW15UG9wdWxhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVuZW15UG9wdWxhdG9yKCkge1xuICAgIH1cbiAgICBFbmVteVBvcHVsYXRvci5wcm90b3R5cGUucG9wdWxhdGVMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBsZXZlbC5mb3JFYWNoKGZ1bmN0aW9uIChyb29tKSB7IHJldHVybiBfdGhpcy5hZGRFbmVtaWVzKHJvb20pOyB9KTtcbiAgICAgICAgbGV2ZWwuZm9yRWFjaChmdW5jdGlvbiAocm9vbSkgeyByZXR1cm4gX3RoaXMubWF0ZXJpYWxpemVFbmVtaWVzKHJvb20pOyB9KTtcbiAgICB9O1xuICAgIEVuZW15UG9wdWxhdG9yLnByb3RvdHlwZS5hZGRQb2xpY2VCb3NzRW5jb3VudGVyID0gZnVuY3Rpb24gKHJvb20pIHtcbiAgICAgICAgaWYgKHJuZy5jaGFuY2UoNTApKSB7XG4gICAgICAgICAgICAvLyBUaGUgYm9zcyBpcyBhbGl2ZVxuICAgICAgICAgICAgcm9vbS5hZGRFbmVteURhdGEoJ2Jvc3Nab21iaWUnLCAxKTtcbiAgICAgICAgICAgIHJvb20uYWRkRW5lbXlEYXRhKCdwb2xpY2Vab21iaWUnLCAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBib3NzIGlzIGRlYWRcbiAgICAgICAgICAgIHJvb20uYWRkRW5lbXlEYXRhKCdwb2xpY2Vab21iaWUnLCA2KTtcbiAgICAgICAgfVxuICAgICAgICByb29tLnBvcHVsYXRlZCA9IHRydWU7XG4gICAgfTtcbiAgICBFbmVteVBvcHVsYXRvci5wcm90b3R5cGUuYWRkU2hhZG93RW5jb3VudGVyID0gZnVuY3Rpb24gKHJvb20pIHtcbiAgICAgICAgaWYgKHJuZy5jaGFuY2UoNTApKSB7XG4gICAgICAgICAgICAvLyBUaGUgU2hhZG93XG4gICAgICAgICAgICByb29tLmFkZEVuZW15RGF0YSgnU2hhZG93JywgMSk7XG4gICAgICAgICAgICByb29tLmFkZEVuZW15RGF0YSgncG9saWNlWm9tYmllJywgMyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBObyBTaGFkb3dcbiAgICAgICAgICAgIHJvb20uYWRkRW5lbXlEYXRhKCdwb2xpY2Vab21iaWUnLCA5KTtcbiAgICAgICAgfVxuICAgICAgICByb29tLnBvcHVsYXRlZCA9IHRydWU7XG4gICAgfTtcbiAgICBFbmVteVBvcHVsYXRvci5wcm90b3R5cGUuYWRkRW5lbWllcyA9IGZ1bmN0aW9uIChyb29tKSB7XG4gICAgICAgIGlmIChyb29tLmRpZmZpY3VsdHlSYXRpbmcgPT09IDAgfHwgcm9vbS5wb3B1bGF0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVtYWluaW5nRGlmZmljdWx0eVBvd2VyID0gMiArIChyb29tLmRpZmZpY3VsdHlSYXRpbmcgLSAxKSAqIDI7XG4gICAgICAgIHdoaWxlIChyZW1haW5pbmdEaWZmaWN1bHR5UG93ZXIgPiAwKSB7XG4gICAgICAgICAgICB2YXIgcmFjZSA9IHRoaXMuc2VsZWN0RW5lbXkocm9vbS5kaWZmaWN1bHR5UmF0aW5nKTtcbiAgICAgICAgICAgIHJlbWFpbmluZ0RpZmZpY3VsdHlQb3dlciAtPSByYWNlLmRpZmZpY3VsdHlSYXRpbmc7XG4gICAgICAgICAgICByb29tLmFkZEVuZW15RGF0YShyYWNlLmlkLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByb29tLnBvcHVsYXRlZCA9IHRydWU7XG4gICAgfTtcbiAgICBFbmVteVBvcHVsYXRvci5wcm90b3R5cGUuc2VsZWN0RW5lbXkgPSBmdW5jdGlvbiAoZGlmZmljdWx0eUxldmVsKSB7XG4gICAgICAgIHZhciBwb3NzaWJsZSA9IGVuZW15RGljdGlvbmFyeS5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIChlLm1pbkxldmVsID09PSB1bmRlZmluZWQgfHwgZS5taW5MZXZlbCA+PSBkaWZmaWN1bHR5TGV2ZWwpICYmIChlLm1heExldmVsID09PSB1bmRlZmluZWQgfHwgZS5tYXhMZXZlbCA8PSBkaWZmaWN1bHR5TGV2ZWwpOyB9KTtcbiAgICAgICAgcmV0dXJuIHJuZy5mcm9tKHBvc3NpYmxlKTtcbiAgICB9O1xuICAgIEVuZW15UG9wdWxhdG9yLnByb3RvdHlwZS5tYXRlcmlhbGl6ZUVuZW1pZXMgPSBmdW5jdGlvbiAocm9vbSkge1xuICAgICAgICBpZiAocm9vbS5lbmVtaWVzKSB7XG4gICAgICAgICAgICB2YXIgcG9zc2libGVQbGFjZXNfMSA9IFtdO1xuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXJIb3RzcG90ID0gcm9vbS5ob3RzcG90cy5maW5kKGZ1bmN0aW9uIChoKSB7IHJldHVybiBoLnRvUm9vbSAmJiBnZW8ubWFuaGF0dGFuKGgueCwgaC55LCB4LCB5KSA8IDM7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmVhckhvdHNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvb20uaXNWb2lkKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb29tLml0ZW1zICYmIGFycmF5cy5maW5kKHJvb20uaXRlbXMsIGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnggPT09IHggJiYgaS55ID09PSB5OyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZVBsYWNlc18xLnB1c2goeyB4OiB4LCB5OiB5IH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDE7IHkgPCByb29tLmJveFszXSAtIDE7IHkrKykge1xuICAgICAgICAgICAgICAgICAgICBfbG9vcF8yKHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHJvb20uYm94WzJdIC0gMTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgX2xvb3BfMSh4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3NzaWJsZVBsYWNlc18xLmxlbmd0aCA8IHJvb20uZW5lbWllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQnJ1dGVGb3JjZUVycm9yKFwiRmFpbGVkIEVuZW1pZXMgUGxhY2VtZW50LCByb29tIHRvbyBzbWFsbCFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb29tLmVuZW1pZXMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciByYW5kUGxhY2VtZW50ID0gcm5nLmZyb20ocG9zc2libGVQbGFjZXNfMSk7XG4gICAgICAgICAgICAgICAgZS54ID0gcmFuZFBsYWNlbWVudC54O1xuICAgICAgICAgICAgICAgIGUueSA9IHJhbmRQbGFjZW1lbnQueTtcbiAgICAgICAgICAgICAgICBwb3NzaWJsZVBsYWNlc18xLnNwbGljZShwb3NzaWJsZVBsYWNlc18xLmZpbmRJbmRleChmdW5jdGlvbiAocCkgeyByZXR1cm4gcC54ID09PSBlLnggJiYgcC55ID09PSBlLnk7IH0pLCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRW5lbXlQb3B1bGF0b3I7XG59KCkpO1xudmFyIGVuZW15UG9wdWxhdG9yID0gbmV3IEVuZW15UG9wdWxhdG9yKCk7XG5leHBvcnQgZGVmYXVsdCBlbmVteVBvcHVsYXRvcjtcbiIsInZhciBSZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlY3QoKSB7XG4gICAgfVxuICAgIHJldHVybiBSZWN0O1xufSgpKTtcbmV4cG9ydCB7IFJlY3QgfTtcbnZhciBQb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2ludCgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFBvaW50O1xufSgpKTtcbmV4cG9ydCB7IFBvaW50IH07XG52YXIgR2VvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdlbygpIHtcbiAgICB9XG4gICAgR2VvLnByb3RvdHlwZS5nZXRCb3VuZGFyaWVzID0gZnVuY3Rpb24gKHJlY3RzKSB7XG4gICAgICAgIHZhciB1cHBlckJvdW5kYXJ5ID0gcmVjdHNbMF0ueTtcbiAgICAgICAgdmFyIGxvd2VyQm91bmRhcnkgPSByZWN0c1swXS55ICsgcmVjdHNbMF0uaDtcbiAgICAgICAgdmFyIGxlZnRCb3VuZGFyeSA9IHJlY3RzWzBdLng7XG4gICAgICAgIHZhciByaWdodEJvdW5kYXJ5ID0gcmVjdHNbMF0ueCArIHJlY3RzWzBdLnc7XG4gICAgICAgIGZvciAodmFyIHJpID0gMDsgcmkgPCByZWN0cy5sZW5ndGg7IHJpKyspIHtcbiAgICAgICAgICAgIHZhciByb29tID0gcmVjdHNbcmldO1xuICAgICAgICAgICAgaWYgKHJvb20ueCA8IGxlZnRCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIGxlZnRCb3VuZGFyeSA9IHJvb20ueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb29tLnkgPCB1cHBlckJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgdXBwZXJCb3VuZGFyeSA9IHJvb20ueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb29tLnkgKyByb29tLmggPiBsb3dlckJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgbG93ZXJCb3VuZGFyeSA9IHJvb20ueSArIHJvb20uaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb29tLnggKyByb29tLncgPiByaWdodEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgcmlnaHRCb3VuZGFyeSA9IHJvb20ueCArIHJvb20udztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdEJvdW5kYXJ5OiBsZWZ0Qm91bmRhcnksXG4gICAgICAgICAgICB1cHBlckJvdW5kYXJ5OiB1cHBlckJvdW5kYXJ5LFxuICAgICAgICAgICAgbG93ZXJCb3VuZGFyeTogbG93ZXJCb3VuZGFyeSxcbiAgICAgICAgICAgIHJpZ2h0Qm91bmRhcnk6IHJpZ2h0Qm91bmRhcnksXG4gICAgICAgICAgICB3OiByaWdodEJvdW5kYXJ5IC0gbGVmdEJvdW5kYXJ5ICsgMSxcbiAgICAgICAgICAgIGg6IGxvd2VyQm91bmRhcnkgLSB1cHBlckJvdW5kYXJ5ICsgMSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEdlby5wcm90b3R5cGUuZ2V0Um9vbUF0ID0gZnVuY3Rpb24gKHJvb21zLCB4LCB5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiByb29tcy5maW5kKGZ1bmN0aW9uIChyKSB7IHJldHVybiBfdGhpcy5wb2ludEluQm94KHIsIHgsIHkpOyB9KTtcbiAgICB9O1xuICAgIEdlby5wcm90b3R5cGUucG9pbnRJbkJveCA9IGZ1bmN0aW9uIChib3gsIHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHggPCBib3gueCArIGJveC53ICYmIHggPj0gYm94LnggJiYgeSA+PSBib3gueSAmJiB5IDwgYm94LnkgKyBib3guaDtcbiAgICB9O1xuICAgIEdlby5wcm90b3R5cGUubWFuaGF0dGFuID0gZnVuY3Rpb24gKHgsIHksIHgxLCB5MSkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMoeCAtIHgxKSArIE1hdGguYWJzKHkgLSB5MSk7XG4gICAgfTtcbiAgICByZXR1cm4gR2VvO1xufSgpKTtcbnZhciBnZW8gPSBuZXcgR2VvKCk7XG5leHBvcnQgZGVmYXVsdCBnZW87XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IGRlYnVnQ29udHJvbHMgZnJvbSBcIi4vZGVidWdDb250cm9sc1wiO1xuaW1wb3J0IGdlbyBmcm9tIFwiLi9nZW9cIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL1Jvb21cIjtcbnZhciBNZXJnZVJvb21zID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lcmdlUm9vbXMoKSB7XG4gICAgfVxuICAgIE1lcmdlUm9vbXMucHJvdG90eXBlLm1lcmdlUm9vbXMgPSBmdW5jdGlvbiAocm9vbXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9sb29wXzEsIHRoaXNfMSwgb3V0X2lfMSwgaTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb29tLCBuZXh0RXhpdElkLCBuZXh0Um9vbV8xLCBkb3VibGVCYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb20gPSByb29tc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFeGl0SWQgPSByb29tLmV4aXRzLmZpbmQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXRSb29tID0gcm9vbXMuZmluZChmdW5jdGlvbiAocikgeyByZXR1cm4gci5pZCA9PT0gZTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXhpdFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gVE9ETzogQ2xlYW51cCBzbyB3ZSBkb24ndCBoYXZlIGV4aXRzIHRvIGluZXhpc3RlbnQgcGxhY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXRSb29tLnJvb21UeXBlID09PSByb29tLnJvb21UeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEV4aXRJZCkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvb21fMSA9IHJvb21zLmZpbmQoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuaWQgPT09IG5leHRFeGl0SWQ7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdWJsZUJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9vbXMuZmluZEluZGV4KGZ1bmN0aW9uIChyKSB7IHJldHVybiByLmlkID09PSBuZXh0Um9vbV8xLmlkOyB9KSA8IGkgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdWJsZUJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEubWVyZ2VJbnRvKHJvb21zLCByb29tLCBuZXh0Um9vbV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZWJ1Z0NvbnRyb2xzLndhaXRDbGljayhyb29tcyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvdWJsZUJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0X2lfMSA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpIDwgcm9vbXMubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzUgLyp5aWVsZCoqLywgX2xvb3BfMShpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBvdXRfaV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWVyZ2VSb29tcy5wcm90b3R5cGUubWVyZ2VJbnRvID0gZnVuY3Rpb24gKHJvb21zLCByb29tLCBuZXh0Um9vbSkge1xuICAgICAgICB2YXIgYm91bmRhcmllcyA9IGdlby5nZXRCb3VuZGFyaWVzKFtyb29tLCBuZXh0Um9vbV0pO1xuICAgICAgICAvLyBSZWxvY2F0ZSBhbGwgY29udGVudHMsIGluY2x1ZGluZyBkb29yc1xuICAgICAgICB2YXIgcjFkeCA9IHJvb20ueCAtIGJvdW5kYXJpZXMubGVmdEJvdW5kYXJ5O1xuICAgICAgICB2YXIgcjFkeSA9IHJvb20ueSAtIGJvdW5kYXJpZXMudXBwZXJCb3VuZGFyeTtcbiAgICAgICAgdmFyIG5ld1Jvb20gPSBuZXcgUm9vbShyb29tLnJvb21UeXBlLCByb29tLmRpZmZpY3VsdHlSYXRpbmcpO1xuICAgICAgICByb29tLmhvdHNwb3RzLmZvckVhY2goZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICAgIGlmICghaC50b1Jvb20gfHwgaC50b1Jvb20gPT09IG5leHRSb29tLmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Um9vbS5ob3RzcG90cy5wdXNoKGgpO1xuICAgICAgICAgICAgaC54ICs9IHIxZHg7XG4gICAgICAgICAgICBoLnkgKz0gcjFkeTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJvb20uZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBuZXdSb29tLmVuZW1pZXMucHVzaChlKTtcbiAgICAgICAgICAgIGUueCArPSByMWR4O1xuICAgICAgICAgICAgZS55ICs9IHIxZHk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocm9vbS5pdGVtcykge1xuICAgICAgICAgICAgcm9vbS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbmV3Um9vbS5pdGVtcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGkueCArPSByMWR4O1xuICAgICAgICAgICAgICAgIGkueSArPSByMWR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRSb29tLmNvbG9yKSB7XG4gICAgICAgICAgICBuZXdSb29tLmNvbG9yID0gbmV4dFJvb20uY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHIyZHggPSBuZXh0Um9vbS54IC0gYm91bmRhcmllcy5sZWZ0Qm91bmRhcnk7XG4gICAgICAgIHZhciByMmR5ID0gbmV4dFJvb20ueSAtIGJvdW5kYXJpZXMudXBwZXJCb3VuZGFyeTtcbiAgICAgICAgbmV4dFJvb20uZXhpdHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUgIT09IHJvb20uaWQpIHtcbiAgICAgICAgICAgICAgICBuZXdSb29tLmV4aXRzLnB1c2goZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBuZXh0Um9vbS5ob3RzcG90cy5mb3JFYWNoKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICBpZiAoIWgudG9Sb29tIHx8IGgudG9Sb29tID09PSByb29tLmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Um9vbS5ob3RzcG90cy5wdXNoKGgpO1xuICAgICAgICAgICAgaC54ICs9IHIyZHg7XG4gICAgICAgICAgICBoLnkgKz0gcjJkeTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5leHRSb29tLmVuZW1pZXMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgbmV3Um9vbS5lbmVtaWVzLnB1c2goZSk7XG4gICAgICAgICAgICBlLnggKz0gcjJkeDtcbiAgICAgICAgICAgIGUueSArPSByMmR5O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5leHRSb29tLml0ZW1zKSB7XG4gICAgICAgICAgICBuZXh0Um9vbS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbmV3Um9vbS5pdGVtcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGkueCArPSByMmR4O1xuICAgICAgICAgICAgICAgIGkueSArPSByMmR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgeCA9IGJvdW5kYXJpZXMubGVmdEJvdW5kYXJ5OyB4IDwgYm91bmRhcmllcy5yaWdodEJvdW5kYXJ5OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSBib3VuZGFyaWVzLnVwcGVyQm91bmRhcnk7IHkgPCBib3VuZGFyaWVzLmxvd2VyQm91bmRhcnk7IHkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0aGVSb29tID0gZ2VvLmdldFJvb21BdChyb29tcywgeCwgeSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGVSb29tIHx8IC8vIFRoZXJlJ3Mgbm8gcm9vbSB0aGVyZSwgd2UgYXJlIGV4cGFuZGluZyBpbnRvIHRoZSB2b2lkXG4gICAgICAgICAgICAgICAgICAgICh0aGVSb29tICE9PSByb29tICYmIHRoZVJvb20gIT09IG5leHRSb29tKSB8fCAvLyBUaGVyZSBpcyBhbm90aGVyIHJvb20gdGhlcmUgd2UgYXJlIG5vdCBtZXJnaW5nIHdpdGgsIGl0J3Mgdm9pZFxuICAgICAgICAgICAgICAgICAgICB0aGVSb29tLmlzVm9pZCh4IC0gdGhlUm9vbS54LCB5IC0gdGhlUm9vbS55KSAvLyBUaGlzIHBvaW50IGJlbG9uZyB0byBvbmUgb2YgdGhlIHJvb21zIGJlaW5nIG1lcmdlZCwgc28gY29weSB0aGUgdm9pZG5lc3NcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Um9vbS5zZXRWb2lkKHggLSBib3VuZGFyaWVzLmxlZnRCb3VuZGFyeSwgeSAtIGJvdW5kYXJpZXMudXBwZXJCb3VuZGFyeSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvb20uaXJyZWd1bGFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV3Um9vbS54ID0gYm91bmRhcmllcy5sZWZ0Qm91bmRhcnk7XG4gICAgICAgIG5ld1Jvb20ueSA9IGJvdW5kYXJpZXMudXBwZXJCb3VuZGFyeTtcbiAgICAgICAgbmV3Um9vbS53ID0gYm91bmRhcmllcy53IC0gMTtcbiAgICAgICAgbmV3Um9vbS5oID0gYm91bmRhcmllcy5oIC0gMTtcbiAgICAgICAgbmV3Um9vbS5kb0JveCgpO1xuICAgICAgICBpZiAobmV4dFJvb20uc3RvcEdyb3d0aExlZnQpXG4gICAgICAgICAgICBuZXdSb29tLnN0b3BHcm93dGhMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5leHRSb29tLnN0b3BHcm93dGhSaWdodClcbiAgICAgICAgICAgIG5ld1Jvb20uc3RvcEdyb3d0aFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5leHRSb29tLnN0b3BHcm93dGhEb3duKVxuICAgICAgICAgICAgbmV3Um9vbS5zdG9wR3Jvd3RoRG93biA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0Um9vbS5zdG9wR3Jvd3RoVXApXG4gICAgICAgICAgICBuZXdSb29tLnN0b3BHcm93dGhVcCA9IHRydWU7XG4gICAgICAgIHJvb21zLnNwbGljZShyb29tcy5maW5kSW5kZXgoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIgPT09IHJvb207IH0pLCAxKTtcbiAgICAgICAgcm9vbXMuc3BsaWNlKHJvb21zLmZpbmRJbmRleChmdW5jdGlvbiAocikgeyByZXR1cm4gciA9PT0gbmV4dFJvb207IH0pLCAxKTtcbiAgICAgICAgcm9vbXMucHVzaChuZXdSb29tKTtcbiAgICAgICAgdmFyIGFkamFjZW50Um9vbXMgPSByb29tcy5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuaWQgIT09IHJvb20uaWQgJiYgci5pZCAhPT0gbmV4dFJvb20uaWQgJiYgKHIuZXhpdHMuaW5kZXhPZihyb29tLmlkKSA+IC0xIHx8IHIuZXhpdHMuaW5kZXhPZihuZXh0Um9vbS5pZCkgPiAtMSk7IH0pO1xuICAgICAgICAvLyBVcGRhdGUgZG9vcnMgcmVmZXJlbmNpbmcgdGhlIHJvb21zIHdlIGp1c3QgZGVzdHJveWVkXG4gICAgICAgIGFkamFjZW50Um9vbXMuZm9yRWFjaChmdW5jdGlvbiAoYWRqYWNlbnRSb29tKSB7XG4gICAgICAgICAgICBhZGphY2VudFJvb20uaG90c3BvdHMuZmlsdGVyKGZ1bmN0aW9uIChoKSB7IHJldHVybiBoLnRvUm9vbSA9PT0gcm9vbS5pZCB8fCBoLnRvUm9vbSA9PT0gbmV4dFJvb20uaWQ7IH0pLmZvckVhY2goZnVuY3Rpb24gKGgpIHsgcmV0dXJuIGgudG9Sb29tID0gbmV3Um9vbS5pZDsgfSk7XG4gICAgICAgICAgICBhZGphY2VudFJvb20uZXhpdHMgPSBhZGphY2VudFJvb20uZXhpdHMuZmlsdGVyKGZ1bmN0aW9uIChleGl0KSB7IHJldHVybiBleGl0ICE9PSByb29tLmlkICYmIGV4aXQgIT09IG5leHRSb29tLmlkOyB9KTtcbiAgICAgICAgICAgIGFkamFjZW50Um9vbS5leGl0cy5wdXNoKG5ld1Jvb20uaWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNZXJnZVJvb21zO1xufSgpKTtcbnZhciBtZXJnZVJvb21zID0gbmV3IE1lcmdlUm9vbXMoKTtcbmV4cG9ydCBkZWZhdWx0IG1lcmdlUm9vbXM7XG4iLCJ2YXIgUmFuZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSYW5kKCkge1xuICAgIH1cbiAgICAvLyAxOTkzIFBhcmstTWlsbGVyIExDRywgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYmxpeHQvZjE3YjQ3YzYyNTA4YmU1OTk4N2JcbiAgICBSYW5kLnByb3RvdHlwZS5MQ0cgPSBmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcyA9IE1hdGguaW11bCgxNjgwNywgcykgfCAwICUgMjE0NzQ4MzY0NztcbiAgICAgICAgICAgIHJldHVybiAocyAmIDIxNDc0ODM2NDcpIC8gMjE0NzQ4MzY0ODtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFJhbmQucHJvdG90eXBlLmRvU2VlZCA9IGZ1bmN0aW9uIChzZWVkKSB7XG4gICAgICAgIHRoaXMuc2VlZGVkID0gdGhpcy5MQ0coc2VlZCk7XG4gICAgfTtcbiAgICBSYW5kLnByb3RvdHlwZS5mcm9tID0gZnVuY3Rpb24gKGZyb21BcnJheSkge1xuICAgICAgICByZXR1cm4gZnJvbUFycmF5W3RoaXMuaW50KDAsIGZyb21BcnJheS5sZW5ndGggLSAxKV07XG4gICAgfTtcbiAgICBSYW5kLnByb3RvdHlwZS53ZWlnaHRlZEZyb20gPSBmdW5jdGlvbiAoZnJvbUFycmF5LCB3ZWlnaHRGdW5jdGlvbiwgaXRlbUZ1bmN0aW9uLCBtYXhOdW1iZXIpIHtcbiAgICAgICAgaWYgKG1heE51bWJlciA9PT0gdm9pZCAwKSB7IG1heE51bWJlciA9IDEwMDsgfVxuICAgICAgICB2YXIgc3VtID0gMCwgciA9IHRoaXMuc2VlZGVkKCkgKiBtYXhOdW1iZXI7XG4gICAgICAgIGZvciAodmFyIGkgaW4gZnJvbUFycmF5KSB7XG4gICAgICAgICAgICBzdW0gKz0gd2VpZ2h0RnVuY3Rpb24oZnJvbUFycmF5W2ldKTtcbiAgICAgICAgICAgIGlmIChyIDw9IHN1bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtRnVuY3Rpb24oZnJvbUFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgUmFuZC5wcm90b3R5cGUuaW50ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKChiIC0gYSArIDEpICogdGhpcy5zZWVkZWQoKSk7XG4gICAgfTtcbiAgICBSYW5kLnByb3RvdHlwZS5jaGFuY2UgPSBmdW5jdGlvbiAocFRvMTAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlZWRlZCgpIDw9IHBUbzEwMCAvIDEwMDtcbiAgICB9O1xuICAgIHJldHVybiBSYW5kO1xufSgpKTtcbnZhciBybmcgPSBuZXcgUmFuZCgpO1xuZXhwb3J0IGRlZmF1bHQgcm5nO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IEZhY2luZyB9IGZyb20gXCIuL0ZhY2luZ1wiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4vUm9vbVwiO1xuaW1wb3J0IGFycmF5cyBmcm9tIFwiLi9hcnJheXNcIjtcbmltcG9ydCBkZWJ1Z0NvbnRyb2xzIGZyb20gXCIuL2RlYnVnQ29udHJvbHNcIjtcbmltcG9ydCByb29tRGljdGlvbmFyeSBmcm9tIFwiLi9kaWN0aW9uYXJ5XCI7XG5pbXBvcnQgZ2VvIGZyb20gXCIuL2dlb1wiO1xuaW1wb3J0IHJuZyBmcm9tIFwiLi9yYW5kXCI7XG52YXIgUmFuZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmFuZ2UoKSB7XG4gICAgfVxuICAgIHJldHVybiBSYW5nZTtcbn0oKSk7XG52YXIgUm9vbVByb2plY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm9vbVByb2plY3Rpb24oKSB7XG4gICAgfVxuICAgIHJldHVybiBSb29tUHJvamVjdGlvbjtcbn0oKSk7XG52YXIgUmVsYXhSb29tcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWxheFJvb21zKCkge1xuICAgICAgICB0aGlzLk1JTl9GSUxMRVJfU0laRSA9IDM7XG4gICAgICAgIHRoaXMuc3RlcEdyb3d0aCA9IDM7XG4gICAgfVxuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLmdldFJlbGF4ZWRSb29tcyA9IGZ1bmN0aW9uIChsZXZlbFN0cnVjdHVyZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2h1ZmZsZWRMZXZlbFN0cnVjdHVyZSwgYm91bmRhcmllcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNodWZmbGVkTGV2ZWxTdHJ1Y3R1cmUgPSBhcnJheXMuc2h1ZmZsZShfX3NwcmVhZEFycmF5KFtdLCBsZXZlbFN0cnVjdHVyZSwgdHJ1ZSkpLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gci5ib3ggIT09IHVuZGVmaW5lZDsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaHVmZmxlZExldmVsU3RydWN0dXJlLmZvckVhY2goZnVuY3Rpb24gKHJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tLnggPSByb29tLmJveFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tLnkgPSByb29tLmJveFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tLncgPSByb29tLmJveFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tLmggPSByb29tLmJveFszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRhcmllcyA9IGdlby5nZXRCb3VuZGFyaWVzKGxldmVsU3RydWN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdEJvdW5kYXJ5ID0gYm91bmRhcmllcy5sZWZ0Qm91bmRhcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwcGVyQm91bmRhcnkgPSBib3VuZGFyaWVzLnVwcGVyQm91bmRhcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvd2VyQm91bmRhcnkgPSBib3VuZGFyaWVzLmxvd2VyQm91bmRhcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Qm91bmRhcnkgPSBib3VuZGFyaWVzLnJpZ2h0Qm91bmRhcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJzdCBydW4gb2YgZ3Jvd3RoLCBidXQgZmlyc3QgbWFyayB0aGUgYm91bmRhcmllcyB0aGF0IHNob3VsZG4ndCBncm93XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtTdG9wR3Jvd3RoKHNodWZmbGVkTGV2ZWxTdHJ1Y3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdHJldGNoUm9vbXMoc2h1ZmZsZWRMZXZlbFN0cnVjdHVyZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFkZEZpbGxlcnMoc2h1ZmZsZWRMZXZlbFN0cnVjdHVyZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtTdG9wR3Jvd3RoKHNodWZmbGVkTGV2ZWxTdHJ1Y3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdHJldGNoUm9vbXMoc2h1ZmZsZWRMZXZlbFN0cnVjdHVyZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFkZEZpbGxlcnMoc2h1ZmZsZWRMZXZlbFN0cnVjdHVyZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaHVmZmxlZExldmVsU3RydWN0dXJlLmZvckVhY2goZnVuY3Rpb24gKHJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tLmRvQm94KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzaHVmZmxlZExldmVsU3RydWN0dXJlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5nZXRSYW5nZUludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBtaW5SYW5nZSA9IChhLnN0YXJ0IDwgYi5zdGFydCA/IGEgOiBiKTtcbiAgICAgICAgdmFyIG1heFJhbmdlID0gKG1pblJhbmdlID09IGEgPyBiIDogYSk7XG4gICAgICAgIGlmIChtaW5SYW5nZS5lbmQgPCBtYXhSYW5nZS5zdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vdGhlIHJhbmdlcyBkb24ndCBpbnRlcnNlY3RcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IG1heFJhbmdlLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBtaW5SYW5nZS5lbmQgPCBtYXhSYW5nZS5lbmQgPyBtaW5SYW5nZS5lbmQgOiBtYXhSYW5nZS5lbmRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLmFkZFJvb20gPSBmdW5jdGlvbiAocm9vbXMsIHByb2plY3Rpb24sIGV4cGFuZEZhY2luZykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaG9yaXpvbnRhbEludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9uV2lkdGgsIG5ld1Jvb21fMSwgY29ycmlkb3JXaWR0aCwgdmVydGljYWxJbnRlcnNlY3Rpb24sIGludGVyc2VjdGlvbldpZHRoLCBuZXdSb29tXzIsIGNvcnJpZG9yV2lkdGgsIGZpbGxlclJvb21UeXBlSWQsIGZpbGxlclJvb21EZWYsIG5ld1Jvb207XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbSAmJiBleHBhbmRGYWNpbmcgIT09IHVuZGVmaW5lZCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZXhwYW5kRmFjaW5nID09IEZhY2luZy5ET1dOIHx8IGV4cGFuZEZhY2luZyA9PSBGYWNpbmcuVVApKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxJbnRlcnNlY3Rpb24gPSB0aGlzLmdldFJhbmdlSW50ZXJzZWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcHJvamVjdGlvbi5mcm9tUm9vbS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcHJvamVjdGlvbi5mcm9tUm9vbS54ICsgcHJvamVjdGlvbi5mcm9tUm9vbS53IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcHJvamVjdGlvbi5pbnRlcnNlY3RlZFJvb20ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHByb2plY3Rpb24uaW50ZXJzZWN0ZWRSb29tLnggKyBwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbS53IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFob3Jpem9udGFsSW50ZXJzZWN0aW9uKSByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbldpZHRoID0gaG9yaXpvbnRhbEludGVyc2VjdGlvbi5lbmQgLSBob3Jpem9udGFsSW50ZXJzZWN0aW9uLnN0YXJ0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGludGVyc2VjdGlvbldpZHRoID49IDMpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMSA9IG5ldyBSb29tKFwiY29ycmlkb3JcIiwgcHJvamVjdGlvbi5mcm9tUm9vbS5kaWZmaWN1bHR5UmF0aW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMS5jb2xvciA9ICcjNjU1ZTEzJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJpZG9yV2lkdGggPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8xLnggPSBybmcuaW50KGhvcml6b250YWxJbnRlcnNlY3Rpb24uc3RhcnQsIGhvcml6b250YWxJbnRlcnNlY3Rpb24uZW5kIC0gY29ycmlkb3JXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzEueSA9IHByb2plY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMS53ID0gY29ycmlkb3JXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMS5oID0gcHJvamVjdGlvbi5oO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8xLmRvQm94KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzEuc3RvcEdyb3d0aExlZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8xLnN0b3BHcm93dGhSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZG9vciBmcm9tIG5ld1Jvb20gdG8gY29ubmVjdGVkIHJvb21cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMS5ob3RzcG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IChleHBhbmRGYWNpbmcgPT0gRmFjaW5nLlVQID8gMCA6IG5ld1Jvb21fMS5oIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBleHBhbmRGYWNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Sb29tOiBwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzEuZXhpdHMucHVzaChwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tcy5wdXNoKG5ld1Jvb21fMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZG9vciBmcm9tIG9yaWdpbmFsUm9vbSB0byBuZXdSb29tXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLmZyb21Sb29tLmhvdHNwb3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IG5ld1Jvb21fMS54IC0gcHJvamVjdGlvbi5mcm9tUm9vbS54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAoZXhwYW5kRmFjaW5nID09IEZhY2luZy5VUCA/IDAgOiBwcm9qZWN0aW9uLmZyb21Sb29tLmggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IGV4cGFuZEZhY2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Jvb206IG5ld1Jvb21fMS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLmZyb21Sb29tLmV4aXRzLnB1c2gobmV3Um9vbV8xLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXdSb29tXzFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlcnNlY3Rpb24gdG9vIHNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjb3VsZCBwcm9iYWJseSBsb29rIGZvciBpbnRlcnNlY3Rpb25zIHdpdGggb3RoZXIgcm9vbXMsIGJ1dCBmb3Igbm93XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXRzIGRvIG5vdGhpbmcgYW5kIGhvcGUgYW5vdGhlciByb29tcyBpbnRlcnNlY3RzIGJhY2sgd2l0aCB1c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3Rpb24uaCA+IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IGEgSFVHRSBmaWxsZXIgcm9vbSB0byBzcGF3blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZXhwYW5kRmFjaW5nID09IEZhY2luZy5MRUZUIHx8IGV4cGFuZEZhY2luZyA9PSBGYWNpbmcuUklHSFQpKSByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsSW50ZXJzZWN0aW9uID0gdGhpcy5nZXRSYW5nZUludGVyc2VjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHByb2plY3Rpb24uZnJvbVJvb20ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHByb2plY3Rpb24uZnJvbVJvb20ueSArIHByb2plY3Rpb24uZnJvbVJvb20uaCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHByb2plY3Rpb24uaW50ZXJzZWN0ZWRSb29tLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbS55ICsgcHJvamVjdGlvbi5pbnRlcnNlY3RlZFJvb20uaCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmVydGljYWxJbnRlcnNlY3Rpb24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uV2lkdGggPSB2ZXJ0aWNhbEludGVyc2VjdGlvbi5lbmQgLSB2ZXJ0aWNhbEludGVyc2VjdGlvbi5zdGFydCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpbnRlcnNlY3Rpb25XaWR0aCA+PSAzKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzIgPSBuZXcgUm9vbShcImNvcnJpZG9yXCIsIHByb2plY3Rpb24uZnJvbVJvb20uZGlmZmljdWx0eVJhdGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzIuY29sb3IgPSAnIzY1NWUxMyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyaWRvcldpZHRoID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMi54ID0gcHJvamVjdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8yLnkgPSBybmcuaW50KHZlcnRpY2FsSW50ZXJzZWN0aW9uLnN0YXJ0LCB2ZXJ0aWNhbEludGVyc2VjdGlvbi5lbmQgLSBjb3JyaWRvcldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMi53ID0gcHJvamVjdGlvbi53O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8yLmggPSBjb3JyaWRvcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbV8yLmRvQm94KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tXzIuc3RvcEdyb3d0aFVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMi5zdG9wR3Jvd3RoRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZG9vciBmcm9tIG5ld1Jvb20gdG8gY29ubmVjdGVkIHJvb21cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMi5ob3RzcG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAoZXhwYW5kRmFjaW5nID09IEZhY2luZy5MRUZUID8gMCA6IG5ld1Jvb21fMi53IC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IGV4cGFuZEZhY2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Jvb206IHByb2plY3Rpb24uaW50ZXJzZWN0ZWRSb29tLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb21fMi5leGl0cy5wdXNoKHByb2plY3Rpb24uaW50ZXJzZWN0ZWRSb29tLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21zLnB1c2gobmV3Um9vbV8yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBkb29yIGZyb20gb3JpZ2luYWxSb29tIHRvIG5ld1Jvb21cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb24uZnJvbVJvb20uaG90c3BvdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogKGV4cGFuZEZhY2luZyA9PSBGYWNpbmcuTEVGVCA/IDAgOiBwcm9qZWN0aW9uLmZyb21Sb29tLncgLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBuZXdSb29tXzIueSAtIHByb2plY3Rpb24uZnJvbVJvb20ueSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBleHBhbmRGYWNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Sb29tOiBuZXdSb29tXzIuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGlvbi5mcm9tUm9vbS5leGl0cy5wdXNoKG5ld1Jvb21fMi5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZWJ1Z0NvbnRyb2xzLndhaXRDbGljayhyb29tcyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3Um9vbV8yXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW50ZXJzZWN0aW9uIHRvbyBzbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY291bGQgcHJvYmFibHkgbG9vayBmb3IgaW50ZXJzZWN0aW9ucyB3aXRoIG90aGVyIHJvb21zLCBidXQgZm9yIG5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGV0cyBkbyBub3RoaW5nIGFuZCBob3BlIGFub3RoZXIgcm9vbXMgaW50ZXJzZWN0cyBiYWNrIHdpdGggdXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0aW9uLncgPiA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCBhIEhVR0UgZmlsbGVyIHJvb20gdG8gc3Bhd25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDc7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxlclJvb21UeXBlSWQgPSBcIipcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxlclJvb21EZWYgPSByb29tRGljdGlvbmFyeShmaWxsZXJSb29tVHlwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0aW9uLncgPiBmaWxsZXJSb29tRGVmLndpZHRoWzFdIHx8IHByb2plY3Rpb24uaCA+IGZpbGxlclJvb21EZWYuaGVpZ2h0WzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbSA9IG5ldyBSb29tKGZpbGxlclJvb21UeXBlSWQsIHByb2plY3Rpb24uZnJvbVJvb20uZGlmZmljdWx0eVJhdGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLmNvbG9yID0gJyM2NTVlMTMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihuZXdSb29tLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogcHJvamVjdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHByb2plY3Rpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3OiBwcm9qZWN0aW9uLncsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDogcHJvamVjdGlvbi5oLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLmRvQm94KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwYW5kRmFjaW5nID09IEZhY2luZy5ET1dOIHx8IGV4cGFuZEZhY2luZyA9PSBGYWNpbmcuVVApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLmhvdHNwb3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBybmcuaW50KDEsIG5ld1Jvb20udyAtIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAoZXhwYW5kRmFjaW5nID09IEZhY2luZy5VUCA/IDAgOiBuZXdSb29tLmggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBleHBhbmRGYWNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUm9vbTogcHJvamVjdGlvbi5pbnRlcnNlY3RlZFJvb20uaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tcy5wdXNoKG5ld1Jvb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb24uZnJvbVJvb20uaG90c3BvdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IG5ld1Jvb20ueCAtIHByb2plY3Rpb24uZnJvbVJvb20ueCArIHJuZy5pbnQoMSwgbmV3Um9vbS53IC0gMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IChleHBhbmRGYWNpbmcgPT0gRmFjaW5nLlVQID8gMCA6IHByb2plY3Rpb24uZnJvbVJvb20uaCAtIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IGV4cGFuZEZhY2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Sb29tOiBuZXdSb29tLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZG9vciBmcm9tIG5ld1Jvb20gdG8gY29ubmVjdGVkIHJvb21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLmhvdHNwb3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAoZXhwYW5kRmFjaW5nID09IEZhY2luZy5MRUZUID8gMCA6IG5ld1Jvb20udyAtIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBybmcuaW50KDEsIG5ld1Jvb20uaCAtIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IGV4cGFuZEZhY2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Sb29tOiBwcm9qZWN0aW9uLmludGVyc2VjdGVkUm9vbS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb21zLnB1c2gobmV3Um9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGRvb3IgZnJvbSBvcmlnaW5hbFJvb20gdG8gbmV3Um9vbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb24uZnJvbVJvb20uaG90c3BvdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IChleHBhbmRGYWNpbmcgPT0gRmFjaW5nLkxFRlQgPyAwIDogcHJvamVjdGlvbi5mcm9tUm9vbS53IC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IG5ld1Jvb20ueSAtIHByb2plY3Rpb24uZnJvbVJvb20ueSArIHJuZy5pbnQoMSwgbmV3Um9vbS5oIC0gMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2luZzogZXhwYW5kRmFjaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Jvb206IG5ld1Jvb20uaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXdSb29tXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5zdHJlY2hMZWZ0ID0gZnVuY3Rpb24gKHJvb21zLCByb29tKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkrKyA8IHRoaXMuc3RlcEdyb3d0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhblN0cmV0Y2hMZWZ0KHJvb21zLCByb29tKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb20uZW5sYXJnZUxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5zdHJlY2hVcCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpKysgPCB0aGlzLnN0ZXBHcm93dGgpKSByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYW5TdHJldGNoVXAocm9vbXMsIHJvb20pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5lbmxhcmdlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5zdHJlY2hEb3duID0gZnVuY3Rpb24gKHJvb21zLCByb29tKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkrKyA8IHRoaXMuc3RlcEdyb3d0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhblN0cmV0Y2hEb3duKHJvb21zLCByb29tKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb20uZW5sYXJnZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5zdHJlY2hSaWdodCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpKysgPCB0aGlzLnN0ZXBHcm93dGgpKSByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYW5TdHJldGNoUmlnaHQocm9vbXMsIHJvb20pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5lbmxhcmdlUmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5jYW5TdHJldGNoTGVmdCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICBpZiAocm9vbS5zdG9wR3Jvd3RoTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXhXaWR0aCA9IHJvb21EaWN0aW9uYXJ5KHJvb20ucm9vbVR5cGUpLndpZHRoWzFdO1xuICAgICAgICBpZiAocm9vbS53ID49IG1heFdpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvb20ueCA9PT0gdGhpcy5sZWZ0Qm91bmRhcnkpIHtcbiAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aExlZnQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSByb29tLnk7IHkgPCByb29tLnkgKyByb29tLmg7IHkrKykge1xuICAgICAgICAgICAgdmFyIG92ZXJsYXBwaW5nUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHJvb20ueCAtIDEsIHkpO1xuICAgICAgICAgICAgaWYgKG92ZXJsYXBwaW5nUm9vbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLmNhblN0cmV0Y2hVcCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICBpZiAocm9vbS5zdG9wR3Jvd3RoVXApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gcm9vbURpY3Rpb25hcnkocm9vbS5yb29tVHlwZSkuaGVpZ2h0WzFdO1xuICAgICAgICBpZiAocm9vbS5oID49IG1heEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb29tLnkgPT09IHRoaXMudXBwZXJCb3VuZGFyeSkge1xuICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoVXAgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHggPSByb29tLng7IHggPCByb29tLnggKyByb29tLnc7IHgrKykge1xuICAgICAgICAgICAgdmFyIG92ZXJsYXBwaW5nUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHgsIHJvb20ueSAtIDEpO1xuICAgICAgICAgICAgaWYgKG92ZXJsYXBwaW5nUm9vbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLmNhblN0cmV0Y2hEb3duID0gZnVuY3Rpb24gKHJvb21zLCByb29tKSB7XG4gICAgICAgIGlmIChyb29tLnN0b3BHcm93dGhEb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heEhlaWdodCA9IHJvb21EaWN0aW9uYXJ5KHJvb20ucm9vbVR5cGUpLmhlaWdodFsxXTtcbiAgICAgICAgaWYgKHJvb20uaCA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9vbS55ICsgcm9vbS5oID49IHRoaXMubG93ZXJCb3VuZGFyeSkge1xuICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoRG93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgeCA9IHJvb20ueDsgeCA8IHJvb20ueCArIHJvb20udzsgeCsrKSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmxhcHBpbmdSb29tID0gZ2VvLmdldFJvb21BdChyb29tcywgeCwgcm9vbS55ICsgcm9vbS5oKTtcbiAgICAgICAgICAgIGlmIChvdmVybGFwcGluZ1Jvb20pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5jYW5TdHJldGNoUmlnaHQgPSBmdW5jdGlvbiAocm9vbXMsIHJvb20pIHtcbiAgICAgICAgaWYgKHJvb20uc3RvcEdyb3d0aFJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heFdpZHRoID0gcm9vbURpY3Rpb25hcnkocm9vbS5yb29tVHlwZSkud2lkdGhbMV07XG4gICAgICAgIGlmIChyb29tLncgPj0gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9vbS54ICsgcm9vbS53ID49IHRoaXMucmlnaHRCb3VuZGFyeSkge1xuICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSByb29tLnk7IHkgPCByb29tLnkgKyByb29tLmg7IHkrKykge1xuICAgICAgICAgICAgdmFyIG92ZXJsYXBwaW5nUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHJvb20ueCArIHJvb20udywgeSk7XG4gICAgICAgICAgICBpZiAob3ZlcmxhcHBpbmdSb29tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgUmVsYXhSb29tcy5wcm90b3R5cGUuY2FuU3RyZXRjaCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICBpZiAocm9vbS5zdG9wR3Jvd3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuU3RyZXRjaERvd24ocm9vbXMsIHJvb20pIHx8IHRoaXMuY2FuU3RyZXRjaFVwKHJvb21zLCByb29tKSB8fCB0aGlzLmNhblN0cmV0Y2hMZWZ0KHJvb21zLCByb29tKSB8fCB0aGlzLmNhblN0cmV0Y2hSaWdodChyb29tcywgcm9vbSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5wcm9qZWN0Um9vbUxlZnQgPSBmdW5jdGlvbiAocm9vbXMsIHJvb20pIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IHJvb20ueCAtIDE7IHggPj0gdGhpcy5sZWZ0Qm91bmRhcnk7IHgtLSkge1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHJvb20ueTsgeSA8IHJvb20ueSArIHJvb20uaDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyc2VjdGVkUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHgsIHkpO1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RlZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcm9vbS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgdzogcm9vbS54IC0geCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoOiByb29tLmgsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tUm9vbTogcm9vbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGVkUm9vbTogaW50ZXJzZWN0ZWRSb29tXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLmxlZnRCb3VuZGFyeSxcbiAgICAgICAgICAgIHk6IHJvb20ueSxcbiAgICAgICAgICAgIHc6IHJvb20ueCxcbiAgICAgICAgICAgIGg6IHJvb20uaCxcbiAgICAgICAgICAgIGZyb21Sb29tOiByb29tLFxuICAgICAgICAgICAgaW50ZXJzZWN0ZWRSb29tOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLnByb2plY3RSb29tUmlnaHQgPSBmdW5jdGlvbiAocm9vbXMsIHJvb20pIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IHJvb20ueCArIHJvb20udzsgeCA8PSB0aGlzLnJpZ2h0Qm91bmRhcnk7IHgrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHJvb20ueTsgeSA8IHJvb20ueSArIHJvb20uaDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyc2VjdGVkUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHgsIHkpO1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RlZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHJvb20ueCArIHJvb20udyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHJvb20ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHc6IHggLSAocm9vbS54ICsgcm9vbS53KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGg6IHJvb20uaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Sb29tOiByb29tLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0ZWRSb29tOiBpbnRlcnNlY3RlZFJvb21cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvb20ueCArIHJvb20udyxcbiAgICAgICAgICAgIHk6IHJvb20ueSxcbiAgICAgICAgICAgIHc6IHRoaXMucmlnaHRCb3VuZGFyeSAtIChyb29tLnggKyByb29tLncpLFxuICAgICAgICAgICAgaDogcm9vbS5oLFxuICAgICAgICAgICAgZnJvbVJvb206IHJvb20sXG4gICAgICAgICAgICBpbnRlcnNlY3RlZFJvb206IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUmVsYXhSb29tcy5wcm90b3R5cGUucHJvamVjdFJvb21VcCA9IGZ1bmN0aW9uIChyb29tcywgcm9vbSkge1xuICAgICAgICBmb3IgKHZhciB5ID0gcm9vbS55IC0gMTsgeSA+PSB0aGlzLnVwcGVyQm91bmRhcnk7IHktLSkge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHJvb20ueDsgeCA8IHJvb20ueCArIHJvb20udzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyc2VjdGVkUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHgsIHkpO1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RlZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHJvb20ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdzogcm9vbS53LFxuICAgICAgICAgICAgICAgICAgICAgICAgaDogcm9vbS55IC0geSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tUm9vbTogcm9vbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGVkUm9vbTogaW50ZXJzZWN0ZWRSb29tXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb29tLngsXG4gICAgICAgICAgICB5OiB0aGlzLnVwcGVyQm91bmRhcnksXG4gICAgICAgICAgICB3OiByb29tLncsXG4gICAgICAgICAgICBoOiByb29tLnksXG4gICAgICAgICAgICBmcm9tUm9vbTogcm9vbSxcbiAgICAgICAgICAgIGludGVyc2VjdGVkUm9vbTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5wcm9qZWN0Um9vbURvd24gPSBmdW5jdGlvbiAocm9vbXMsIHJvb20pIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IHJvb20ueSArIHJvb20uaDsgeSA8PSB0aGlzLmxvd2VyQm91bmRhcnk7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHJvb20ueDsgeCA8IHJvb20ueCArIHJvb20udzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyc2VjdGVkUm9vbSA9IGdlby5nZXRSb29tQXQocm9vbXMsIHgsIHkpO1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RlZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHJvb20ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHJvb20ueSArIHJvb20uaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHc6IHJvb20udyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGg6IHkgLSAocm9vbS55ICsgcm9vbS5oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Sb29tOiByb29tLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0ZWRSb29tOiBpbnRlcnNlY3RlZFJvb21cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvb20ueCxcbiAgICAgICAgICAgIHk6IHJvb20ueSArIHJvb20uaCxcbiAgICAgICAgICAgIHc6IHJvb20udyxcbiAgICAgICAgICAgIGg6IHRoaXMubG93ZXJCb3VuZGFyeSAtIChyb29tLnkgKyByb29tLmgpLFxuICAgICAgICAgICAgZnJvbVJvb206IHJvb20sXG4gICAgICAgICAgICBpbnRlcnNlY3RlZFJvb206IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUmVsYXhSb29tcy5wcm90b3R5cGUubWFya1N0b3BHcm93dGggPSBmdW5jdGlvbiAocm9vbXMpIHtcbiAgICAgICAgZm9yICh2YXIgcmkgPSAwOyByaSA8IHJvb21zLmxlbmd0aDsgcmkrKykge1xuICAgICAgICAgICAgdmFyIHJvb20gPSByb29tc1tyaV07XG4gICAgICAgICAgICBpZiAocm9vbURpY3Rpb25hcnkocm9vbS5yb29tVHlwZSkuc3RyYWlnaHRSb29tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvb20uZ2VuZXJhbEZhY2luZyA9PT0gRmFjaW5nLlVQIHx8IHJvb20uZ2VuZXJhbEZhY2luZyA9PT0gRmFjaW5nLkRPV04pIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocm9vbS5nZW5lcmFsRmFjaW5nID09PSBGYWNpbmcuTEVGVCB8fCByb29tLmdlbmVyYWxGYWNpbmcgPT09IEZhY2luZy5SSUdIVCkge1xuICAgICAgICAgICAgICAgICAgICByb29tLnN0b3BHcm93dGhVcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aERvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByb2plY3QgdGhlIHJvb20gdG8gdGhlIGxlZnQsIHNlZSBpZiB0aGUgcHJvamVjdGVkIHJvb20gdG91Y2hlcyB0aGUgYm91bmRhcmllc1xuICAgICAgICAgICAgdmFyIHByb2plY3RlZExlZnRSb29tID0gdGhpcy5wcm9qZWN0Um9vbUxlZnQocm9vbXMsIHJvb20pO1xuICAgICAgICAgICAgaWYgKHByb2plY3RlZExlZnRSb29tLncgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyb29tLnN0b3BHcm93dGhMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aExlZnQgPSBwcm9qZWN0ZWRMZWZ0Um9vbS54ID09PSB0aGlzLmxlZnRCb3VuZGFyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQcm9qZWN0IHRoZSByb29tIHRvIHRoZSByaWdodCwgc2VlIGlmIHRoZSBwcm9qZWN0ZWQgcm9vbSB0b3VjaGVzIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICB2YXIgcHJvamVjdGVkUmlnaHRSb29tID0gdGhpcy5wcm9qZWN0Um9vbVJpZ2h0KHJvb21zLCByb29tKTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0ZWRSaWdodFJvb20udyA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJvb20uc3RvcEdyb3d0aFJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aFJpZ2h0ID0gcHJvamVjdGVkUmlnaHRSb29tLncgKyBwcm9qZWN0ZWRSaWdodFJvb20ueCA9PT0gdGhpcy5yaWdodEJvdW5kYXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9qZWN0ZWRVcFJvb20gPSB0aGlzLnByb2plY3RSb29tVXAocm9vbXMsIHJvb20pO1xuICAgICAgICAgICAgaWYgKHByb2plY3RlZFVwUm9vbS5oID4gMCkge1xuICAgICAgICAgICAgICAgIGlmICghcm9vbS5zdG9wR3Jvd3RoVXApIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoVXAgPSBwcm9qZWN0ZWRVcFJvb20ueSA9PT0gdGhpcy51cHBlckJvdW5kYXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9qZWN0ZWREb3duUm9vbSA9IHRoaXMucHJvamVjdFJvb21Eb3duKHJvb21zLCByb29tKTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0ZWREb3duUm9vbS5oID4gMCkge1xuICAgICAgICAgICAgICAgIGlmICghcm9vbS5zdG9wR3Jvd3RoRG93bikge1xuICAgICAgICAgICAgICAgICAgICByb29tLnN0b3BHcm93dGhEb3duID0gcHJvamVjdGVkRG93blJvb20uaCArIHByb2plY3RlZERvd25Sb29tLnkgPT09IHRoaXMubG93ZXJCb3VuZGFyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlbGF4Um9vbXMucHJvdG90eXBlLmFkZEZpbGxlcnMgPSBmdW5jdGlvbiAocm9vbXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJpLCByb29tLCBwcm9qZWN0ZWRMZWZ0Um9vbSwgbmV3Um9vbSwgcHJvamVjdGVkUmlnaHRSb29tLCBuZXdSb29tLCBwcm9qZWN0ZWRVcFJvb20sIG5ld1Jvb20sIGxlZnRDaGVjaywgcmlnaHRDaGVjaywgcHJvamVjdGVkRG93blJvb20sIG5ld1Jvb20sIGxlZnRDaGVjaywgcmlnaHRDaGVjaztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEocmkgPCByb29tcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCAxMF07XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tID0gcm9vbXNbcmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcm9vbS5zdG9wR3Jvd3RoTGVmdCkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0ZWRMZWZ0Um9vbSA9IHRoaXMucHJvamVjdFJvb21MZWZ0KHJvb21zLCByb29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHByb2plY3RlZExlZnRSb29tLncgPiB0aGlzLk1JTl9GSUxMRVJfU0laRSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hZGRSb29tKHJvb21zLCBwcm9qZWN0ZWRMZWZ0Um9vbSwgRmFjaW5nLkxFRlQpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXJvb20uc3RvcEdyb3d0aFJpZ2h0KSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RlZFJpZ2h0Um9vbSA9IHRoaXMucHJvamVjdFJvb21SaWdodChyb29tcywgcm9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShwcm9qZWN0ZWRSaWdodFJvb20udyA+IHRoaXMuTUlOX0ZJTExFUl9TSVpFKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFkZFJvb20ocm9vbXMsIHByb2plY3RlZFJpZ2h0Um9vbSwgRmFjaW5nLlJJR0hUKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb20gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3Um9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb20uc3RvcEdyb3d0aFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcm9vbS5zdG9wR3Jvd3RoVXApIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGVkVXBSb29tID0gdGhpcy5wcm9qZWN0Um9vbVVwKHJvb21zLCByb29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHByb2plY3RlZFVwUm9vbS5oID4gdGhpcy5NSU5fRklMTEVSX1NJWkUpKSByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWRkUm9vbShyb29tcywgcHJvamVjdGVkVXBSb29tLCBGYWNpbmcuVVApXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoVXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDaGVjayA9IHRoaXMucHJvamVjdFJvb21MZWZ0KHJvb21zLCBuZXdSb29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdENoZWNrLncgPiAwICYmIGxlZnRDaGVjay54ID09PSB0aGlzLmxlZnRCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLnN0b3BHcm93dGhMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDaGVjayA9IHRoaXMucHJvamVjdFJvb21SaWdodChyb29tcywgbmV3Um9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hlY2sudyA+IDAgJiYgcmlnaHRDaGVjay53ICsgcmlnaHRDaGVjay54ID09PSB0aGlzLnJpZ2h0Qm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbS5zdG9wR3Jvd3RoUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcm9vbS5zdG9wR3Jvd3RoRG93bikgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0ZWREb3duUm9vbSA9IHRoaXMucHJvamVjdFJvb21Eb3duKHJvb21zLCByb29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHByb2plY3RlZERvd25Sb29tLmggPiB0aGlzLk1JTl9GSUxMRVJfU0laRSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hZGRSb29tKHJvb21zLCBwcm9qZWN0ZWREb3duUm9vbSwgRmFjaW5nLkRPV04pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vbSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5zdG9wR3Jvd3RoRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENoZWNrID0gdGhpcy5wcm9qZWN0Um9vbUxlZnQocm9vbXMsIG5ld1Jvb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0Q2hlY2sudyA+IDAgJiYgbGVmdENoZWNrLnggPT09IHRoaXMubGVmdEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb20uc3RvcEdyb3d0aExlZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodENoZWNrID0gdGhpcy5wcm9qZWN0Um9vbVJpZ2h0KHJvb21zLCBuZXdSb29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGVjay53ID4gMCAmJiByaWdodENoZWNrLncgKyByaWdodENoZWNrLnggPT09IHRoaXMucmlnaHRCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb29tLnN0b3BHcm93dGhSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA5O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICByaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWxheFJvb21zLnByb3RvdHlwZS5zdHJldGNoUm9vbXMgPSBmdW5jdGlvbiAocm9vbXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVJvb21zLCBfbG9vcF8xLCB0aGlzXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVSb29tcyA9IF9fc3ByZWFkQXJyYXkoW10sIHJvb21zLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvb20sIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb20gPSBybmcuZnJvbShhdmFpbGFibGVSb29tcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBybmcuaW50KDAsIDMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzMgLypicmVhayovLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXNfMS5zdHJlY2hVcChyb29tcywgcm9vbSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpc18xLnN0cmVjaERvd24ocm9vbXMsIHJvb20pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXNfMS5zdHJlY2hMZWZ0KHJvb21zLCByb29tKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzXzEuc3RyZWNoUmlnaHQocm9vbXMsIHJvb20pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzXzEuY2FuU3RyZXRjaChyb29tcywgcm9vbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlUm9vbXMuc3BsaWNlKGF2YWlsYWJsZVJvb21zLmZpbmRJbmRleChmdW5jdGlvbiAocikgeyByZXR1cm4gciA9PT0gcm9vbTsgfSksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShhdmFpbGFibGVSb29tcy5sZW5ndGggPiAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzUgLyp5aWVsZCoqLywgX2xvb3BfMSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWxheFJvb21zO1xufSgpKTtcbnZhciByZWxheFJvb21zID0gbmV3IFJlbGF4Um9vbXMoKTtcbmV4cG9ydCBkZWZhdWx0IHJlbGF4Um9vbXM7XG4iLCJpbXBvcnQgQnJ1dGVGb3JjZUVycm9yIGZyb20gXCIuL0JydXRlRm9yY2VFcnJvclwiO1xuaW1wb3J0IHJvb21EaWN0aW9uYXJ5IGZyb20gXCIuL2RpY3Rpb25hcnlcIjtcbmltcG9ydCB7IEZhY2luZyB9IGZyb20gXCIuL0ZhY2luZ1wiO1xuaW1wb3J0IHJuZyBmcm9tIFwiLi9yYW5kXCI7XG52YXIgUm9vbXNNYXRlcmlhbGl6ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm9vbXNNYXRlcmlhbGl6ZXIoKSB7XG4gICAgfVxuICAgIFJvb21zTWF0ZXJpYWxpemVyLnByb3RvdHlwZS5tYXRlcmlhbGl6ZVJvb21zID0gZnVuY3Rpb24gKGZpcnN0TGV2ZWwpIHtcbiAgICAgICAgdmFyIGR3YXJmID0ge1xuICAgICAgICAgICAgeDogMzIsIHk6IDBcbiAgICAgICAgfTtcbiAgICAgICAgLy9jb25zdCBmYWNpbmcgPSBybmcuaW50KDEsIDQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGZpcnN0TGV2ZWwubGVuZ3RoKTtcbiAgICAgICAgdmFyIGZhY2luZyA9IEZhY2luZy5VUDtcbiAgICAgICAgdmFyIGRlcHRoID0gZmlyc3RMZXZlbC5sZW5ndGg7IC8vIGp1c3QgZm9yIHRlc3RpbmdcbiAgICAgICAgdmFyIGNyb3BwZWRMZXZlbCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHRoOyBpKyspIHtcbiAgICAgICAgICAgIGNyb3BwZWRMZXZlbC5wdXNoKGZpcnN0TGV2ZWxbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxhY2VSb29tKGNyb3BwZWRMZXZlbCwgY3JvcHBlZExldmVsWzBdLCB1bmRlZmluZWQsIGZhY2luZywgZHdhcmYpO1xuICAgICAgICBjb25zb2xlLmxvZygnZG9uZSBlbmQgbGV2ZWwgJyk7XG4gICAgfTtcbiAgICBSb29tc01hdGVyaWFsaXplci5wcm90b3R5cGUucGxhY2VSb29tID0gZnVuY3Rpb24gKHJvb21zLCByb29tLCBmcm9tUm9vbSwgZW50cmFuY2VGYWNpbmcsIGR3YXJmKSB7XG4gICAgICAgIGlmICghcm9vbSkge1xuICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoJ05vIHJvb20nKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtYXRlcmlhbGl6aW5nIHJvb20gJyArIHJvb20uaWQpO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSByb29tRGljdGlvbmFyeShyb29tLnJvb21UeXBlKTtcbiAgICAgICAgdmFyIHBvc3NpYmxlQm94ID0gdGhpcy5yYW5kb21Cb3gobWV0YWRhdGEsIGVudHJhbmNlRmFjaW5nLCBkd2FyZi54LCBkd2FyZi55KTtcbiAgICAgICAgaWYgKHRoaXMuaXNPY2N1cGllZChyb29tcywgcG9zc2libGVCb3gpKSB7XG4gICAgICAgICAgICBmcm9tUm9vbS5ob3RzcG90cy5maW5kKGZ1bmN0aW9uIChoKSB7IHJldHVybiBoLnRvUm9vbSA9PT0gcm9vbS5pZDsgfSkudG9Sb29tID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJvb20uYm94ID0gcG9zc2libGVCb3g7XG4gICAgICAgIHJvb20uZ2VuZXJhbEZhY2luZyA9IGVudHJhbmNlRmFjaW5nO1xuICAgICAgICAvLyBTcGVjaWFsIG5vbi1yYW5kb20gcGxhY2VtZW50c1xuICAgICAgICBzd2l0Y2ggKG1ldGFkYXRhLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgY2FzZSAnYm9yZGVyJzpcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHZvaWQgMCwgeSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVudHJhbmNlRmFjaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjaW5nLlVQOlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3Iocm9vbS5ib3hbMl0gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSByb29tLmJveFszXSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNpbmcuRE9XTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHJvb20uYm94WzJdIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEZhY2luZy5SSUdIVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSByb29tLmJveFsyXSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihyb29tLmJveFszXSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjaW5nLkxFRlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHJvb20uYm94WzNdIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm9vbS5ob3RzcG90cy5wdXNoKHsgeDogeCwgeTogeSwgZmFjaW5nOiBlbnRyYW5jZUZhY2luZyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeHggPSAxOyB4eCA8IHJvb20uYm94WzJdIC0gMTsgeHgrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tPY2N1cGllZChyb29tcywgcm9vbS5ib3hbMF0gKyB4eCwgcm9vbS5ib3hbMV0gLSAxLCBGYWNpbmcuRE9XTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb20uaG90c3BvdHMucHVzaCh7IHg6IHh4LCB5OiAwLCBmYWNpbmc6IEZhY2luZy5ET1dOIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja09jY3VwaWVkKHJvb21zLCByb29tLmJveFswXSArIHh4LCByb29tLmJveFsxXSArIHJvb20uYm94WzNdLCBGYWNpbmcuVVApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tLmhvdHNwb3RzLnB1c2goeyB4OiB4eCwgeTogcm9vbS5ib3hbM10gLSAxLCBmYWNpbmc6IEZhY2luZy5VUCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB5eSA9IDE7IHl5IDwgcm9vbS5ib3hbM10gLSAxOyB5eSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja09jY3VwaWVkKHJvb21zLCByb29tLmJveFswXSAtIDEsIHJvb20uYm94WzFdICsgeXksIEZhY2luZy5MRUZUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbS5ob3RzcG90cy5wdXNoKHsgeDogMCwgeTogeXksIGZhY2luZzogRmFjaW5nLkxFRlQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrT2NjdXBpZWQocm9vbXMsIHJvb20uYm94WzBdICsgcm9vbS5ib3hbMl0sIHJvb20uYm94WzFdICsgeXksIEZhY2luZy5SSUdIVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb20uaG90c3BvdHMucHVzaCh7IHg6IHJvb20uYm94WzJdIC0gMSwgeTogeXksIGZhY2luZzogRmFjaW5nLlJJR0hUIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmYWlscyA9IDA7XG4gICAgICAgIGlmIChyb29tLml0ZW1zKSB7XG4gICAgICAgICAgICByb29tLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhblggPSBybmcuaW50KDIsIHJvb20uYm94WzJdIC0gMyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5ZID0gcm5nLmludCgyLCByb29tLmJveFszXSAtIDMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdJdGVtID0gcm9vbS5pdGVtcy5maW5kKGZ1bmN0aW9uIChqKSB7IHJldHVybiBqLnggPT09IHJhblggJiYgai55ID09PSByYW5ZOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWlscyA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCcnV0ZUZvcmNlRXJyb3IoXCJGYWlsZWQgSXRlbXMgUGxhY2VtZW50IVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaS54ID0gcmFuWDtcbiAgICAgICAgICAgICAgICAgICAgaS55ID0gcmFuWTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlXzIgPSBfbG9vcF8yKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZV8yID09PSBcImJyZWFrXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZhaWxzID0gMDtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdmFyIGV4aXQgPSByb29tLmV4aXRzW2ldO1xuICAgICAgICAgICAgaWYgKGZyb21Sb29tICYmIGV4aXQgPT09IGZyb21Sb29tLmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dF9pXzEgPSBpLCBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkaW5nIGV4aXQgdG8gWycgKyBleGl0ICsgJ10gZm9yIHJvb20gJyArIHJvb20uaWQpO1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZUhvdHNwb3RzID0gcm9vbS5ob3RzcG90cy5maWx0ZXIoZnVuY3Rpb24gKGgpIHsgcmV0dXJuIGgudG9Sb29tID09PSB1bmRlZmluZWQ7IH0pO1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUhvdHNwb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIEZBSUwhXG4gICAgICAgICAgICAgICAgZnJvbVJvb20uaG90c3BvdHMuZmluZChmdW5jdGlvbiAoaCkgeyByZXR1cm4gaC50b1Jvb20gPT09IHJvb20uaWQ7IH0pLnRvUm9vbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogZmFsc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBob3RzcG90ID0gcm5nLmZyb20oYXZhaWxhYmxlSG90c3BvdHMpO1xuICAgICAgICAgICAgaG90c3BvdC50b1Jvb20gPSBleGl0O1xuICAgICAgICAgICAgdmFyIGV4aXRUb1Jvb20gPSByb29tcy5maW5kKGZ1bmN0aW9uIChyKSB7IHJldHVybiByLmlkID09PSBleGl0OyB9KTtcbiAgICAgICAgICAgIGlmIChleGl0VG9Sb29tID09PSBmcm9tUm9vbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvdXRfaV8xID0gaSwgXCJjb250aW51ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzXzEucGxhY2VSb29tKHJvb21zLCBleGl0VG9Sb29tLCByb29tLCBob3RzcG90LmZhY2luZywgeyB4OiByb29tLmJveFswXSArIGhvdHNwb3QueCwgeTogcm9vbS5ib3hbMV0gKyBob3RzcG90LnkgfSkpIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgZmFpbHMrKztcbiAgICAgICAgICAgICAgICBpZiAoZmFpbHMgPiAxMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCcnV0ZUZvcmNlRXJyb3IoXCJGYWlsZWQgRXhpdCBQbGFjZW1lbnQhXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChleGl0VG9Sb29tLmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaG90c3BvdC5sb2NrID0gZXhpdFRvUm9vbS5sb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dF9pXzEgPSBpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhpc18xID0gdGhpcywgb3V0X2lfMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tLmV4aXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzEoaSk7XG4gICAgICAgICAgICBpID0gb3V0X2lfMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGVfMSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVfMS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFJvb21zTWF0ZXJpYWxpemVyLnByb3RvdHlwZS5yYW5kb21Cb3ggPSBmdW5jdGlvbiAobWV0YWRhdGEsIGZhY2luZywgcHgsIHB5KSB7XG4gICAgICAgIHZhciB3LCBoO1xuICAgICAgICBzd2l0Y2ggKGZhY2luZykge1xuICAgICAgICAgICAgY2FzZSBGYWNpbmcuVVA6XG4gICAgICAgICAgICBjYXNlIEZhY2luZy5ET1dOOlxuICAgICAgICAgICAgICAgIHcgPSBybmcuaW50KG1ldGFkYXRhLndpZHRoWzBdLCBtZXRhZGF0YS53aWR0aFsxXSk7XG4gICAgICAgICAgICAgICAgaCA9IHJuZy5pbnQobWV0YWRhdGEuaGVpZ2h0WzBdLCBtZXRhZGF0YS5oZWlnaHRbMV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGYWNpbmcuTEVGVDpcbiAgICAgICAgICAgIGNhc2UgRmFjaW5nLlJJR0hUOlxuICAgICAgICAgICAgICAgIGggPSBybmcuaW50KG1ldGFkYXRhLndpZHRoWzBdLCBtZXRhZGF0YS53aWR0aFsxXSk7XG4gICAgICAgICAgICAgICAgdyA9IHJuZy5pbnQobWV0YWRhdGEuaGVpZ2h0WzBdLCBtZXRhZGF0YS5oZWlnaHRbMV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJveCh3LCBoLCBmYWNpbmcsIHB4LCBweSk7XG4gICAgfTtcbiAgICBSb29tc01hdGVyaWFsaXplci5wcm90b3R5cGUuY2hlY2tPY2N1cGllZCA9IGZ1bmN0aW9uIChyb29tcywgeCwgeSwgZmFjaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzT2NjdXBpZWQocm9vbXMsIHRoaXMuYm94KDUsIDUsIGZhY2luZywgeCwgeSkpO1xuICAgIH07XG4gICAgUm9vbXNNYXRlcmlhbGl6ZXIucHJvdG90eXBlLmlzT2NjdXBpZWQgPSBmdW5jdGlvbiAocm9vbXMsIGJveCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocm9vbXMuZmluZChmdW5jdGlvbiAocikgeyByZXR1cm4gci5ib3ggJiYgX3RoaXMucmVjdE92ZXJsYXAoci5ib3gsIGJveCk7IH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm94WzBdIDwgMCB8fCBib3hbMV0gPCAwIHx8IGJveFswXSArIGJveFsyXSA+PSA2NCB8fCBib3hbMV0gKyBib3hbM10gPiA2NCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIENoZWNrIGlmIHdpdGhpbiBsZXZlbCBib3VuZGluZyBib3hcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBSb29tc01hdGVyaWFsaXplci5wcm90b3R5cGUucmVjdE92ZXJsYXAgPSBmdW5jdGlvbiAocjEsIHIyKSB7XG4gICAgICAgIHJldHVybiAhKHIyWzBdID4gcjFbMF0gKyByMVsyXSAtIDEgfHxcbiAgICAgICAgICAgIHIyWzBdICsgcjJbMl0gLSAxIDwgcjFbMF0gfHxcbiAgICAgICAgICAgIHIyWzFdID4gcjFbMV0gKyByMVszXSAtIDEgfHxcbiAgICAgICAgICAgIHIyWzFdICsgcjJbM10gLSAxIDwgcjFbMV0pO1xuICAgIH07XG4gICAgUm9vbXNNYXRlcmlhbGl6ZXIucHJvdG90eXBlLmJveCA9IGZ1bmN0aW9uICh3LCBoLCBmYWNpbmcsIHB4LCBweSkge1xuICAgICAgICBzd2l0Y2ggKGZhY2luZykge1xuICAgICAgICAgICAgY2FzZSBGYWNpbmcuRE9XTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW01hdGguZmxvb3IocHggLSB3IC8gMiksIHB5IC0gaCwgdywgaF07XG4gICAgICAgICAgICBjYXNlIEZhY2luZy5VUDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW01hdGguZmxvb3IocHggLSB3IC8gMiksIHB5ICsgMSwgdywgaF07XG4gICAgICAgICAgICBjYXNlIEZhY2luZy5SSUdIVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3B4ICsgMSwgTWF0aC5mbG9vcihweSAtIGggLyAyKSwgdywgaF07XG4gICAgICAgICAgICBjYXNlIEZhY2luZy5MRUZUOlxuICAgICAgICAgICAgICAgIHJldHVybiBbcHggLSB3LCBNYXRoLmZsb29yKHB5IC0gaCAvIDIpLCB3LCBoXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFJvb21zTWF0ZXJpYWxpemVyO1xufSgpKTtcbnZhciByb29tc01hdGVyaWFsaXplciA9IG5ldyBSb29tc01hdGVyaWFsaXplcigpO1xuZXhwb3J0IGRlZmF1bHQgcm9vbXNNYXRlcmlhbGl6ZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgYWJzdHJhY3RMYXlvdXRHZW5lcmF0b3IgZnJvbSBcIi4vYWJzdHJhY3RMYXlvdXRHZW5lcmF0b3JcIjtcbmltcG9ydCBkZWJ1Z0NvbnRyb2xzIGZyb20gXCIuL2RlYnVnQ29udHJvbHNcIjtcbmltcG9ydCBlbmVteVBvcHVsYXRvciBmcm9tIFwiLi9lbmVteVBvcHVsYXRvclwiO1xuaW1wb3J0IG1lcmdlUm9vbXMgZnJvbSBcIi4vbWVyZ2VSb29tc1wiO1xuaW1wb3J0IHJuZyBmcm9tIFwiLi9yYW5kXCI7XG5pbXBvcnQgcmVsYXhSb29tcyBmcm9tIFwiLi9yZWxheFJvb21zXCI7XG5pbXBvcnQgcm9vbXNNYXRlcmlhbGl6ZXIgZnJvbSBcIi4vcm9vbXNNYXRlcmlhbGl6ZXJcIjtcbnZhciBHZW5lcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge1xuICAgIH1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlLmNoYW5nZUNoZWNrZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYXV0b1N0ZXBcIiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGtBdXRvXCIpLmNoZWNrZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgfTtcbiAgICBHZW5lcmF0b3IucHJvdG90eXBlLmNoYW5nZVNlZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2VlZFwiLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNlZWRcIikudmFsdWUpO1xuICAgIH07XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZS5yZXRyeUNsZWFuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInNlZWRcIik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH07XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZS50b2dnbGVNZXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWV0YVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcbiAgICAgICAgbWV0YVRleHQuc3R5bGUudmlzaWJpbGl0eSA9IG1ldGFUZXh0LnN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XG4gICAgfTtcbiAgICBHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXV0b1N0ZXAsIHNlZWQsIHJvb21zLCBiaWdGYWlscywgZXJyb3JfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TdGVwID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhdXRvU3RlcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXRvU3RlcCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoa0F1dG9cIikuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZWVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWVkIHx8IHNlZWQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTMwMDApICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlZWRcIiwgc2VlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNlZWRcIikudmFsdWUgPSBzZWVkICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJuZy5kb1NlZWQocGFyc2VJbnQoc2VlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmlnRmFpbHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzIsIDUsICwgNl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbXMgPSBhYnN0cmFjdExheW91dEdlbmVyYXRvci5nZW5lcmF0ZVJvb21zTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbXNNYXRlcmlhbGl6ZXIubWF0ZXJpYWxpemVSb29tcyhyb29tcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZWxheFJvb21zLmdldFJlbGF4ZWRSb29tcyhyb29tcyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG1lcmdlUm9vbXMubWVyZ2VSb29tcyhyb29tcyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteVBvcHVsYXRvci5wb3B1bGF0ZUxldmVsKHJvb21zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnQ29udHJvbHMud2FpdENsaWNrKHJvb21zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnJvcl8xLmJydXRlRm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcl8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYmlnRmFpbHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiaWdGYWlscyA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb21zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0JykuaW5uZXJIVE1MID0gXCJGQUlMXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0JykuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkocm9vbXMsIG51bGwsIDMpICsgXCJcXG5cXG5Sb29tczogXCIgKyByb29tcy5sZW5ndGggKyBcIlxcblxcbkJpZyBGYWlsczogXCIgKyBiaWdGYWlscztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gR2VuZXJhdG9yO1xufSgpKTtcbndpbmRvdy5nZW5lcmF0b3IgPSBuZXcgR2VuZXJhdG9yKCk7XG53aW5kb3cuZGVidWdDb250cm9scyA9IGRlYnVnQ29udHJvbHM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=