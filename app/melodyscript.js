const Grid = require('./grid.js');
import Tone from 'Tone';

document.addEventListener("DOMContentLoaded", () => {
  const synth = new Tone.Synth().toMaster();
  const grid = new Grid(document.body, synth);
});
