/**
 * Created by Milos on 16.2.2015..
 */
function fire(){};
const DELIMETER = "\\/|\\|\\/"; // if you look closely, it spells out VNV, as in VNV Nation

fire.prototype.rawPayload = function(socket, payload, lag) {
    setTimeout(function() {
        socket.write(payload + '\n');
    }, lag);
};

fire.prototype.modifiedPayload = function(socket, payload, lag, modifier) {
    setTimeout(function() {
        socket.write(payload + DELIMETER + modifier + '\n');
    }, lag);
};

fire.prototype.finalPayload = function(socket, payload, lag) {
    setTimeout(function() {
        socket.end(payload + '\n');
    }, lag);
};

module.exports = fire;
