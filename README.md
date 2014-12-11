bmk-over-ip
===========

Application protocol based on the song "Grga taksista" from Baja Mali Knindza, commonly called as "Vozi me za Surcin"
or "Vozi me na Pale".

This repository contains both the server and client implementations of the protocl draft.

BMK protocol is used for transporting data, mostly textual, via TCP using a form of additional encapsulation.

The protocol syntax is as follows:

VOZI_ME_ZA_SURCIN - announces the existence to the server

PREKO_LEDINA - server response to the announcement

TAMO_ZIVI|[data] - where [data] is the transmitting data from the client

MOJA_JEDINA - server response to accepted data

VREME_BRZO_PROLAZI - checking if the server has gotten a timeout

GODINE_ME_STIZU - server response to a negative timeout

Have fun.