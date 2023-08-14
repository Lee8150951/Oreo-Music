import React, { useEffect } from 'react';
import Particle from '../models/Particle';
import '../style/components/LyricsBackground.scss';

interface Props {
  children?: React.ReactNode;
  colors: string[];
}

const LyricsBackground: React.FC<Props> = (props): JSX.Element => {
  const { colors } = props;

  /** state **/

  /** effect **/
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById('particleCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw(ctx);
      }
    }

    for (let i = 0; i < colors.length; i++) {
      particles.push(new Particle(colors[i], canvas.width, canvas.height));
    }

    animate();
  }, []);

  /** methods **/

  /** render **/
  return (
    <div className={'lyrics-overlay'}>
      <canvas
        className={'lyrics-canvas'}
        id="particleCanvas"
        style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
      ></canvas>
    </div>
  );
};

export default LyricsBackground;
