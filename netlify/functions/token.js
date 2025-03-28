exports.handler = async function (request, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: request.QueryStringParameters["token"] }),
    };
  };