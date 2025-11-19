"use strict";
/**
 * @component FlipClockModal
 * @description Full-screen modal wrapper for the FlipClock component
 * Locks orientation to landscape when opened
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ScreenOrientation = __importStar(require("expo-screen-orientation"));
const FlipClock_1 = __importDefault(require("./FlipClock"));
const FlipClockModal = ({ visible, onClose, time, isRunning, isPaused, onStart, onPause, onResume, onStop, phase, }) => {
    (0, react_1.useEffect)(() => {
        const lockLandscape = async () => {
            if (visible) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            }
            else {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            }
        };
        lockLandscape();
        return () => {
            // Restore portrait on unmount
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, [visible]);
    const handleClose = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        onClose();
    };
    return (<react_native_1.Modal visible={visible} animationType="fade" presentationStyle="fullScreen" statusBarTranslucent onRequestClose={handleClose}>
      <react_native_1.StatusBar hidden/>
      <FlipClock_1.default time={time} isRunning={isRunning} isPaused={isPaused} onStart={onStart} onPause={onPause} onResume={onResume} onStop={onStop} onClose={handleClose} phase={phase}/>
    </react_native_1.Modal>);
};
exports.default = (0, react_1.memo)(FlipClockModal);
