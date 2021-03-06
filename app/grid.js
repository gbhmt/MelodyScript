const Cell = require('./cell.js');
import KEYS from './key_constants.js';
import { demoPositions } from './demo.js';

class Grid {
  constructor(container, synth) {
    this.element = document.createElement("DIV");
    this.element.id = "grid";
    container.appendChild(this.element);
    this.cells = new Array(16);
    this.synth = synth;
    this.createGrid();
    this.mousedown = false;
    this.activateDemo = this.activateDemo.bind(this);
    this.demoPositions = demoPositions;
  }

  createGrid () {
    for (let i = 0; i < 16; i++) {
      this.cells[i] = [];
      for (let j = 0; j < 16; j++) {
        const cellDiv = document.createElement("DIV");
        const cell = new Cell(KEYS["Major"][i], this.synth, cellDiv);
        cellDiv.cell = cell;
        this.cells[i][j] = cell;
        this.addListeners(cellDiv);
        cellDiv.className = "cell";
        this.element.appendChild(cellDiv);
      }
    }
  }

  addListeners (cellDiv) {
    cellDiv.addEventListener('mouseenter', (e) => {
      if (this.mousedown) {
        e.currentTarget.cell.toggleActive();
      }
    });
    cellDiv.addEventListener('click', (e) => {
      e.currentTarget.cell.toggleActive();
    });
  }

  clear () {
    this.cells.forEach((row) => {
      return row.forEach((cell) => {
        cell.active = false;
        cell.container.className = "cell";
      });
    });
  }

  changeKey (key) {
    this.cells.forEach((row, idx) => {
      return row.forEach((cell) => {
        cell.note = KEYS[key][idx];
      });
    });
  }

  activateDemo () {
    this.demoPositions.forEach((pos) => {
      this.cells[pos[0]][pos[1]].toggleActive();
    });
  }
}

export default Grid;
