/**
 * Require commands only when called.
 *
 * Running `commandFactory(id)` is equivalent to `require(id)`. Both calls return
 * a command function. The difference is that `cmd = commandFactory()` and `cmd()`
 * return as soon as possible and load and execute the command asynchronously.
 */
function commandFactory(id) {
    function command() {
        var commandArgs = [].slice.call(arguments);
        return require(id).apply(undefined, commandArgs);
    }
    return command;
}
module.exports = {
    run: commandFactory('./run'),
    help:commandFactory('./help'),
    debug:commandFactory('./debug'),
    reload:commandFactory('./reload')
};
