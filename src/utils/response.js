const Util = function () {};

// eslint-disable-next-line camelcase
Util.prototype.success = function (payload, message, message_code) {
  return { success: true, message, message_code, result: payload };
};
// eslint-disable-next-line camelcase
Util.prototype.error = function (payload, message, message_code) {
  return { success: false, message, message_code, result: payload };
};
module.exports = new Util();
