class Cell {
  constructor(note, synth, container) {
    this.note = note;
    this.synth = synth;
    this.active = false;
    this.container = container;
  }

  toggleActive () {
    this.active = !this.active;
    this.container.classList.toggle('active');
  }

  addHighlight () {
    this.container.classList.add('highlight');
  }

  removeHighlight () {
    this.container.classList.remove('highlight');
  }


  play () {
    this.synth.triggerAttackRelease(this.note, '8n');
  }
}

module.exports = Cell;
