/// html element to display progress
var output = document.body.appendChild(document.createElement("pre"))
output.style.backgroundColor = `#eee`;
// number of outer operations to run
var outerCount = 10;
// start outer loop
awhile(function () {
	//If not "0" yet
	if (outerCount--) {
		// output current outer loop state
		output.textContent += `outerstep ${outerCount}` + "\n";
		// setup inner loop operations
		let innerCount = 3000000;
		// return inner loop callback
		return awhile(function () {

			if (--innerCount < 0) {
				// if done in inner loop, return "false" to terminate
				output.textContent += "\t" + `innerstep done` + "\n";
				return false;
			}

		})
	} else {
		// output end of outer loop
		output.textContent += `end outerstep` + "\n";
		// return "false" to terminate
		return false;
	}
})
	.then(function () {
		// output "done" when outer loop callback returns
		output.textContent += `done` + "\n";
	})