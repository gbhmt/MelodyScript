const Grid = require('./grid.js');
import Tone from 'Tone';

document.addEventListener("DOMContentLoaded", () => {
  const freeverb = new Tone.Freeverb(0.8).toMaster();
  const synth = new Tone.PolySynth(6).connect(freeverb);
  const grid = new Grid(document.body, synth);
  const slider = document.getElementById("slider");

  slider.addEventListener('change', () => {
    Tone.Transport.bpm.value = slider.value;
  });

  document.body.addEventListener('mousedown', (e) => {
    grid.mousedown = true;
  });
  document.body.addEventListener('mouseup', (e) => {
    grid.mousedown = false;
  });

  const columns = grid.cells[0].map((col, idx) => {
    return grid.cells.map((row) => {
      return row[idx];
    });
  });

  const loop = new Tone.Sequence((time, col) => {
    const column = columns[col];
    for (var i = 0; i < 16; i++) {
      if (column[i].active) {
        column[i].play();
      }
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");

  Tone.Transport.start();
  Tone.Transport.bpm.value = 130;
  loop.start();
});
