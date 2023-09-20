"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Particle_1 = __importDefault(require("../models/Particle"));
require("../style/components/LyricsBackground.scss");
const LyricsBackground = (props) => {
    const { colors } = props;
    /** state **/
    const [randomBG, setRandomBG] = (0, react_1.useState)(0);
    /** effect **/
    (0, react_1.useEffect)(() => {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particles) {
                particle.update();
                particle.draw(ctx);
            }
        }
        for (let i = 0; i < colors.length; i++) {
            particles.push(new Particle_1.default(colors[i], canvas.width, canvas.height));
        }
        animate();
    }, []);
    (0, react_1.useEffect)(() => {
        const number = Math.floor(Math.random() * colors.length);
        setRandomBG(number);
    }, []);
    /** methods **/
    /** render **/
    return (<div className={'lyrics-overlay'}>
      <canvas className={'lyrics-canvas'} id="particleCanvas" style={{ backgroundColor: colors[randomBG] }}></canvas>
    </div>);
};
exports.default = LyricsBackground;
//# sourceMappingURL=LyricsBackground.jsx.map