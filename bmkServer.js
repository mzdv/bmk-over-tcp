/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var _ = require("lodash");

var switches = require("./switches");
var primer = require("./fire");
var fire = new primer();

const LAG = 2000;               // because Baja Mali Knindza needs some time to think
const DELIMETER = "\\/|\\|\\/"; // if you look closely, it spells out VNV, as in VNV Nation

var incomingData = '';
var messageBag = '';            // structure used for storing data (PoC)
var message = [];               // parsing structure
var ids = [];                   // id holder

var port = process.env.port || 1389;    // the only patriotic port

net.createServer(function(socket) {
    socket.setEncoding("utf8");

    socket
        .on("data", function(data) {
            if (data.toString() !== '~') {
                socket.write(data.toString());
                incomingData += data.toString();
            } else {
                message = incomingData.split(DELIMETER);
                var id = Math.floor(Math.random() * 100);
                var payload =_.chain(switches)
                    .find(function(pair) { return _.isEqual(pair.value, message[0])})
                    .result("answer")
                    .value();

                switch (message[0]) {
                    case "DJE_SI_GRGA_DRUZE_STARI":
                        _.contains(ids, id) ? id += Math.floor(Math.random() * 100) : ids.push(id);

                        fire.modifiedPayload(socket, payload, LAG, id);
                        break;

                    case "IMA_JEDNA_KRCMA_STARA_TAMO_NASRED_BULEVARA":
                        fire.modifiedPayload(socket, payload, LAG, ids);
                        break;

                    case "VOZI_ME_ZA_SURCIN_PREKO_LEDINA":
                        messageBag += message[1] + '\n';

                        fire.rawPayload(socket, payload, LAG);
                        break;

                    case "VREME_BRZO_PROLAZI":
                        fire.rawPayload(socket, payload, LAG);
                        break;

                    case "DUNI_VJETRE_MALO_PREKO_JETRE":            //symbolic meaning, not the same song as above
                        fire.modifiedPayload(socket, payload, LAG, messageBag);
                        break;

                    case "RAKIJA_MI_SE_PRIBLIZILA_DUSI":               //same as above
                        fire.finalPayload(socket, payload, LAG);
                        break;

                    default:
                        fire.rawPayload(socket, "KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC\n", LAG);
                        break;
                }
                incomingData = '';
                message = [];
            }
        })

        .on("close", function() {
            socket.end();
        })
        .on("error", function(error) {
            console.log(error.toString());
        })
}).listen(port, '127.0.0.1');

console.log("BMK server is operational at 127.0.0.1:1389 .");