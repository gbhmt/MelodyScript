class Cell {
  constructor(note, synth) {
    this.note = note;
    this.synth = synth;
    this.active = false;
  }

  toggleActive () {
    this.active = !this.active;
  }

  play () {
    this.synth.triggerAttackRelease(this.note, .5);
  }
}

module.exports = Cell;
