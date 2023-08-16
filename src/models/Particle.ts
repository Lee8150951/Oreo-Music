class Particle {
  private readonly size: number;
  private readonly color: string;
  private x: number;
  private y: number;
  private speedX: number;
  private speedY: number;
  private readonly virtualBoundary: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };

  constructor(color: string, canvasWidth: number, canvasHeight: number) {
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

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size / 2 > this.virtualBoundary.right || this.x - this.size / 2 < this.virtualBoundary.left) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.size / 2 > this.virtualBoundary.bottom || this.y - this.size / 2 < this.virtualBoundary.top) {
      this.speedY = -this.speedY;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Particle;
