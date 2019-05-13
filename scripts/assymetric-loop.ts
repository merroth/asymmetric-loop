function awhile(callback: () => any): Promise<{}>
function awhile(callback: () => any, timestep?: number, delayMethod?: (Function, delay?: number) => any): Promise<{}>
function awhile(callback: () => any, timestep = 100, delayMethod: (Function, delay?: number) => any = (window.setImmediate || window.setTimeout)): Promise<{}> {

	var t = Date.now();
	var tt = t + timestep;

	function _step(res: Function) {
		t = Date.now();
		var done = () => {
			if (t > tt) {
				delayMethod(
					() => {
						t = Date.now();
						tt = t + timestep;
						_step(res);
					},
					0
				);
			} else {
				_step(res);
			}
		}
		var delayed = false;
		while (Date.now() < tt) {
			var cb = callback()
			if (cb === false) {
				res();
				return false;
			} else if (cb instanceof Promise) {
				cb.then(done);
				delayed = true;
				return false;
			}
		}
		if (!delayed) {
			done();
		}

	}
	return new Promise((res) => {
		_step(res);
	});
}
