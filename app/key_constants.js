const KEYS = {
  "Major": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5",
          "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6"].reverse(),
  "Harmonic Minor": ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "B4", "C5",
                "D5", "Eb5", "F5", "G5", "Ab5", "B5", "C6", "D6"].reverse(),
  "Melodic Minor": ["C4", "D4", "Eb4", "F4", "G4", "A4", "B4", "C5",
              "D5", "Eb5", "F5", "G5", "A5", "B5", "C6", "D6"].reverse(),
  "Harmonic Major": ["C4", "D4", "E4", "F4", "G4", "Ab4", "B4", "C5",
              "D5", "E5", "F5", "G5", "Ab5", "B5", "C6", "D6"].reverse(),
  "Diminished": ["C4", "D4", "Eb4", "F4", "Gb4", "Ab4", "A4", "B4",
               "C5", "D5", "Eb5", "F5", "Gb5", "Ab5", "A5", "B5"].reverse(),
  "Major Pentatonic": ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5",
              "G5", "A5", "C6", "D6", "E6", "G6", "A6", "C7"].reverse(),
  "Lydian Pentatonic": ["C4", "E4", "F#4", "A4", "B4", "C5", "E5", "F#5",
                 "A5", "B5", "C6", "E6", "F#6", "A6", "B6", "C7"].reverse(),
  "Whole Tone": ["C4", "D4", "E4", "F#4", "G#4", "A#4","C5", "D5",
                "E5", "F#5", "G#5", "A#5", "C6", "D6", "E6", "F#6"].reverse(),
  "Chromatic": ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4",
                        "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5"].reverse(),
};

export default KEYS;
