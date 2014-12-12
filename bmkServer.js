/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");

const LAG = 2000;     //because Baja Mali Knindza needs some time to think
const DELIMETER = "\\/|\\|\\/"; //if you look closely, it spells out VNV, as in VNV nation

var incomingData = '';
var messageBag = '';        //structure used for storing data (PoC)
var reqNumber;      //request number used for logging

net.createServer(function(socket) {
    socket.setEncoding("utf8");

    socket
        .on("data", function(data) {
            socket.write(data.toString());
            socket.write('');
            console.log(data.toString());

            incomingData += data.toString();
            reqNumber++;
        })
        .on("end", function() {
            var message = incomingData.split();

            switch(message[0]) {
                case "VOZI_ME_ZA_SURCIN":
                    setTimeout(function() {
                        socket.write("PREKO_LEDINA");
                    }, LAG);
                    break;

                case "TAMO_ZIVI":
                    setTimeout(function() {
                        messageBag += message[1] + "//" + reqNumber + '\n';
                        socket.write("MOJA_JEDINA");
                    }, LAG);
                    break;

                case "VREME_BRZO_PROLAZI":
                    setTimeout(function() {
                        socket.write("GODINE_ME_STIZU");
                    }, LAG);
                    break;

                case "DUNI_VJETRE_MALO_PREKO_JETRE":            //symbolic meaning, not the same song as above
                    setTimeout(function() {
                        socket.write("UMRIJECU_OD_BOLA_IZGORJELO_SVE_OD_ALKOHOLA" + DELIMETER + messageBag + '\n');
                    }, LAG);
                    break;

                default:
                    socket.write("KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC");
                    break;
            }

        })
        .on("error", function(error) {
            console.log(error.toString());
        })
}).listen(1337);