// eslint-disable-next-line no-undef
const peer = new Peer();
let conn = null;

peer.on('open', function(id) {
    log(`peer open! id: ${id}`);
    renderPeerId(id);
});

peer.on('connection', (revConn) => {
    log(`connection received from other peer!`);
    setConn(revConn);
});

peer.on('error', (err) => {
    log(`self error! type: ${err.type}`);
});

document.querySelector('#connectBtn').addEventListener('click', () => {
    const connId = document.querySelector('#connectInput').value;
    const estConn = peer.connect(connId);

    if (estConn.open) {
        setConn(estConn);
        log(`connection established to other peer! (method 2)`);
    }
    
    estConn.on('open', () => {
        setConn(estConn);
        log(`connection established to other peer!`);    
    });

    estConn.on('close', () => {
        log('estConn close!');
    });

    estConn.on('error', (err) => {
        alert(`estConn error! ${err.type}`);
    });
});

document.querySelector('#sendMsgBtn').addEventListener('click', () => {
    if (conn === null) {
        log('cannot send to nonexistent peer');
        return;
    }
    
    const message = document.querySelector('#messageInput').value;
    conn.send(message);
});

function log(str) {
    const logP = document.createElement('p');
    logP.innerText = str;

    document.querySelector('#logContainer').appendChild(logP);
}

function setConn(connection) {
    conn = connection;

    conn.on('data', data => {
        log(`data received from other peer! ${data}`);
    });
}

function renderPeerId(id) {
    document.querySelector('#peerIdSpan').innerText = id;
}