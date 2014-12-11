/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var incomingData = '';

net.createServer(function(socket) {
    socket.setEncoding("utf8");


    socket
        .on("data", function(data) {
            socket.write(data.toString());
            console.log(data.toString());

            incomingData += data.toString();
        })
        .on("end", function() {
            var message = incomingData.split('|');

            switch(message[0]) {
                case "VOZI_ME_ZA_SURCIN":
                    console.log("Aktivirano");
                    //slanje soketa
                    break;
                case "TAMO_ZIVI":
                    console.log("Dolaze podaci");
                    break;
                case "VREME_BRZO_PROLAZI":
                    console.log("Stvarno brzo prolazi");
                    //salje da nije timeout
                    break;
                default:
                    console.log("Invalid BMK syntax");
                    break;
            }

        })
        .on("error", function(error) {
            console.log(error.toString());
        })

}).listen(1337);