function sendSuccess(res, data, status = 200) {
  return res.status(status).send({
    success: true,
    payload: data,
  });
}

function sendError(res, code, message, status = 500, fields, stack = null) {
  return res.status(status).send({
    success: false,
    code,
    message,
    fields,
    stack,
  });
}

module.exports = { sendSuccess, sendError };
