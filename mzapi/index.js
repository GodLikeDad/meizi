'use strict'

exports.handler = async (event, ctx, callback) => {
    const { body, httpMethod, headers, path } = event
    const isHttp = typeof httpMethod === 'string'

    if (httpMethod === 'GET' && path === '/feed') {
        return callback(null, {
            body: await require('./feed')(),
            statusCode: 200,
            headers: {
                'Content-Type': 'text/xml'
            },
            isBase64Encoded: false
        })
    }

    try {
        const now = Date.now()
        let result = await reducer(
            httpMethod ? body : event,
            headers
        )
        return callback(null, Object.assign({ used: Date.now() - now }, result))
    } catch (err) {
        return callback(err)
        return {
            error: typeof err === 'string' ? err : err.message
        }
    }
}

async function reducer(event, headers) {
    if (typeof event === 'string') {
        event = JSON.parse(event)
    }
    if (typeof event.api !== 'string') {
        return { error: 'Invalid Api', event }
    }

    const router = {
        ...require('./pictures'),
        ...require('./logs'),
        ...require('./ads')
    }

    if (typeof router[event.api] !== 'function') {
        return { error: 'Invalid Api', event }
    }

    return await router[event.api](event, headers || {})
}

if (require.main.filename === __filename) {
    exports.handler(
        require('./invoke.json'),
        {},
        console.log
    )
}