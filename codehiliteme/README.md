## Code hilite Me

A userscript that automatically detects when you view code in your browser, and applies 
syntax highlighting to the code to make it look readable. The highlighting is done using
[highlight.js](https://highlightjs.org/).

Gone are the days of black and white code, now you can take that colorful look you like
anywhere you go.

## Installation
- Install [TamperMonkey](https://tampermonkey.net/) for your browser, or any derivative of greasemonkey. If you need help, look [here](https://greasyfork.org/en/help/installing-user-scripts)
- [Download](https://greasyfork.org/scripts/26343-code-hiliteme/code/Code%20HiliteMe.user.js) the script
- Enable and enjoy!

## Common issues
- **It does not highlight local files, i.e. not running on non-webserver location, like "file:///..."**
 - This is not an issue with the script, but rather the extension. Depending on the extension you use,
 you will have to search for a way to allow the extension to have access to file urls. For TamperMonkey, the solution
 is [here](http://tampermonkey.net/faq.php#Q204).


## Future plans/maybe...
- ~~Strip off any http GET (?x=y&v=k) parameters to further determine if the file loaded is code~~
- Ability to choose different styles rather than the default
- Ability to choose styles based on language
- Code formatting ([Clang Format](http://clang.llvm.org/docs/ClangFormat.html))
- ~~Toggle line numbers~~
- Automatically detect all code snippets in html document and apply styling
if not already applied
 - Don't wanna mess with people's already existing stylings
- GUI for messing with settings
