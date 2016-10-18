# MelodyScript


### Background

MelodyScript is an interactive game that allows users to activate cells representing musical notes to be played by the program. The user can add notes to columns on the screen, which will be played in time from left to right in a loop. The speed of playback can be controlled by a slider, and playback can be toggled by the user. 


### MVP

Once completed, users should be able to:

* Add notes to display
* Toggle playback
* Reset grid
* Adjust playback speed with slider
* View sleep visual representation of playback

In addition, this project will include:

* A production README
* An about section with links to github repo and portfolio site


### Architecture and Technologies

This project will be implemented with the following technologies: 

* Vanilla JS and jQuery for DOM manipulation
* Tone.js Web Audio framework for producing musical notes
* Webpack to bundle javascript files

Additional scripts:

`grid.js`: main component of the display, holds `Cell`s that play the tones

`cell.js`: subcomponents of the `grid`, internal state keeps track of whether or not it's activated

### Wireframe

![wireframe](https://soundscape.mybalsamiq.com/mockups/5083418.png?key=ccde912f08f213435a62ec90ce7d4cf2d78eebcc)


### Implementation Timeline

**Day 1**: Set up skeleton for project- `package.json`, `webpack.config.js`, and each script to be included in the project. Get acclimated with the Tone.js framework. Get webpack successfully bundling. Get some notes playing with Tone.js. Start working on the `Cell` class.

**Day 2**: Finish `Cell` class. Connect with `Board`. Add ability to toggle cells on and off. Start implementing left-to-right sequencing with variable speeds. Implement grid reset button.

**Day 3**: Lots of CSS styling. Implement tempo slider. Add links and instructions modal.
