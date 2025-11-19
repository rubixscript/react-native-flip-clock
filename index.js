"use strict";
/**
 * React Native Flip Clock Library
 *
 * A premium aesthetic flip clock timer component with smooth animations.
 * Designed for React Native and Expo applications.
 *
 * @author OnePage Team
 * @version 1.0.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlipClockModal = exports.FlipClock = void 0;
// Export main components
var FlipClock_1 = require("./components/FlipClock");
Object.defineProperty(exports, "FlipClock", { enumerable: true, get: function () { return __importDefault(FlipClock_1).default; } });
var FlipClockModal_1 = require("./components/FlipClockModal");
Object.defineProperty(exports, "FlipClockModal", { enumerable: true, get: function () { return __importDefault(FlipClockModal_1).default; } });
