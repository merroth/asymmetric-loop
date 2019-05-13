function awhile(callback, timestep, delayMethod) {
    if (timestep === void 0) { timestep = 100; }
    if (delayMethod === void 0) { delayMethod = (window.setImmediate || window.setTimeout); }
    var t = Date.now();
    var tt = t + timestep;
    function _step(res) {
        t = Date.now();
        var done = function () {
            if (t > tt) {
                delayMethod(function () {
                    t = Date.now();
                    tt = t + timestep;
                    _step(res);
                }, 0);
            }
            else {
                _step(res);
            }
        };
        var delayed = false;
        while (Date.now() < tt) {
            var cb = callback();
            if (cb === false) {
                res();
                return false;
            }
            else if (cb instanceof Promise) {
                cb.then(done);
                delayed = true;
                return false;
            }
        }
        if (!delayed) {
            done();
        }
    }
    return new Promise(function (res) {
        _step(res);
    });
}
