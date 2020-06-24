export default function handler(lambda) {
    return async function (event, context) {
        let result;
        try {
            await Promise.resolve();
            const responseBody = lambda(event);
            result = [200, responseBody];
        } catch (e) {
            result = [500, { error: e.message }];
        }
        const [statusCode, bodyPromise] = result;
        const body = await bodyPromise;
        return ({
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(body)
        });
    };
}