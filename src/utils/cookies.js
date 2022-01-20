const encode = (cookieObject) => {
  return Object.keys(cookieObject)
    .map((key) => `${key}=${cookieObject[key]}`)
    .join(";");
};

module.exports = { encode };
