## Code hilite Me

A userscript that automatically detects when you view code in your browser, and applies 
syntax highlighting to the code to make it look readable. The highlighting is done using
[highlight.js](https://highlightjs.org/).

Gone are the days of black and white code, now you can take that colorful look you like
anywhere you go.

## Installation
- Install [TamperMonkey](https://tampermonkey.net/) for your browser, or any derivative of greasemonkey
- [Download](https://raw.githubusercontent.com/smac89/userscripts/master/codehiliteme/CodeHiliteMe.user.js) the script
- Enable and enjoy!

## Future plans/maybe...
- Strip off any get parameters to further determine if the file loaded is code
- Ability to choose different styles rather than the default
- Ability to choose styles based on language
- Code formatting ([Clang Format](http://clang.llvm.org/docs/ClangFormat.html))
- Toggle line numbers
- Automatically detect all code snippets in html document and apply styling
if not already applied
 - Don't wanna mess with people's already existing stylings
- GUI for messing with settings