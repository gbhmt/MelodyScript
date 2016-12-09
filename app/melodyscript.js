import Grid from './grid.js';
import Tone from 'Tone';
import Buttons from './buttons.js';
import { demo } from './demo.js';

document.addEventListener("DOMContentLoaded", () => {
  const freeverb = new Tone.Freeverb(0.9).toMaster();
  const synth = new Tone.PolySynth(6).connect(freeverb);
  synth.volume.value = -10;

  const gridAndButtons = document.getElementById('grid-and-buttons');
  const grid = new Grid(gridAndButtons, synth);
  const slider = document.getElementById("slider");

  const buttons = new Buttons(grid);
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
    grid.clear();
  });

  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeButton = document.getElementById("close-button");
  const openButton = document.getElementById("open-button");
  const demoButton = document.getElementById("demo");


  closeButton.addEventListener("click", () => {
    modal.className = "closed";
    modalOverlay.className = "closed";
  });

  openButton.addEventListener("click", () => {
    modal.className = "";
    modalOverlay.className = "";
  });

  demoButton.addEventListener("click", () => {
    grid.clear();
    grid.activateDemo();
  });

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
    for (var i = 0; i < 16; i++) {
      const currentColumn = columns[col];
      let prevColumn;
      if (col === 0) {
        prevColumn = columns[15];
      } else {
        prevColumn = columns[col - 1];
      }
      currentColumn[i].addHighlight();
      prevColumn[i].removeHighlight();
      if (currentColumn[i].active) {
        currentColumn[i].play();
      }
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");

  Tone.Transport.start();
  Tone.Transport.bpm.value = 130;
  loop.start();
});
