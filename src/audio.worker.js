let interval;

// eslint-disable-next-line no-restricted-globals
self.onmessage = function (msg) {
    if (msg.data === 'start') {
        interval = setInterval(() => postMessage("TICK"), 500)
    }
    if (msg.data === 'stop') {
        clearInterval(interval)
        interval = undefined
    }
}

postMessage('worker ready')
