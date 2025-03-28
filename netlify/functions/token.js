exports.handler = async function (request, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: new URL(request.url).searchParams.get("token") }),
    };
  };