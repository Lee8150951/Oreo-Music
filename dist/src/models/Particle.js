"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Particle {
    constructor(color, canvasWidth, canvasHeight) {
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speedX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speedY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "virtualBoundary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.size = 800;
        this.color = color;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.virtualBoundary = {
            left: -600,
            right: canvasWidth + 600,
            top: -600,
            bottom: canvasHeight + 600,
        };
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.size / 2 > this.virtualBoundary.right || this.x - this.size / 2 < this.virtualBoundary.left) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size / 2 > this.virtualBoundary.bottom || this.y - this.size / 2 < this.virtualBoundary.top) {
            this.speedY = -this.speedY;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
exports.default = Particle;
//# sourceMappingURL=Particle.js.map