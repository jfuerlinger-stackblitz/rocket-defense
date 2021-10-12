import './style.css';
import p5 = require('p5');
import { Firework, delay } from './firework';

const fireworks: Firework[] = [];

export let p: p5;
new p5((p5: p5) => {
  p = p5;
  p.setup = setup;
  p.draw = draw;
});

async function setup() {
  p.createCanvas(p.windowWidth, p.windowHeight);
  Firework.gravity = p.createVector(0, 0.005);

  // Zum Ausprobieren schießen wir am Beginn
  // eine einzelne Rakete ab. Das werden wir in unseren
  // Übungen ändern, damit das Feuerwerk spannender wird.
  //
  // Größe der Explosion -------------------------------+
  // Höhe (0 bis 100) ------------------------------+   |
  // X-Position (horizontal) ----------+            |   |
  // Farbe -------------------+        |            |   |
  //                          V        V            V   V
  for (let i = 0; i < 100; i++) {
    const numberOfRockets = 10;
    for (let j = 0; j < numberOfRockets; j++) {
      fireworks.push(
        new Firework(
          p.random(360),
          (p.width * j) / (numberOfRockets - 1),
          p.random(100),
          p.random(25)
        )
      );
    }

    await delay(1500);
  }
}

function draw() {
  p.colorMode(p.RGB);
  p.background(0, 0, 0, 25);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].draw();

    if (fireworks[i].isDone) {
      fireworks.splice(i, 1);
    }
  }
}
