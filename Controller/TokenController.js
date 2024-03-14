const TokenModel = require("../Models/Token");
const jwt = require("jsonwebtoken");
const ApiKeyModel = require("../Models/ApiKey");

exports.genToken = async (req, res, next) => {
  try {
    const { appSecret, apiKey } = req.body;

    if (!appSecret)
      return res
        .status(200)
        .json({
          code: "e404",
          message: "appSecret is required",
          status: false,
        });
    if (!apiKey)
      return res
        .status(200)
        .json({ code: "e404", message: "apiKey is required", status: false });

    //validate apikey and appSecret
    const isApikey = await ApiKeyModel.findOne({
      appSecret,
      apiKey,
      status: 1,
    });

    if (!isApikey)
      return res
        .status(200)
        .json({ code: "e404", message: "Invalid Api key", status: false });

    //Generate token
    const token = jwt.sign(
      {
        projectName: isApikey.projectName,
        projectManager: isApikey.projectManager,
      },
      process.env.JWT_PKEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    // jwt.sign({
    //   data: 'foobar'
    // }, 'secret', { expiresIn: '1h' });

    //persist token
    await TokenModel.create({
      token,
      generatedAt: Date.now(),
      expiresAt: Date.now() + 86400,
    });

    return res.status(200).json({ code: "s200", message: token, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ code: "e500", message: "Service not available", status: false });
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res
        .status(200)
        .json({ code: "e404", message: "Authorization failed", status: false });

    const istoken = await TokenModel.findOne({ token });

    if (!istoken)
      return res
        .status(200)
        .json({ code: "e404", message: "Invalid token", status: false });

    //Verify token
    const decode = jwt.verify(token, process.env.JWT_PKEY);

    const projectManager = await ApiKeyModel.findOne({
      projectManager: decode.projectManager,
      projectName: decode.projectName,
    });

    if (!projectManager)
      return res
        .status(200)
        .json({ code: "e404", message: "Invalid token", status: false });

    next();
  } catch (error) {
    console.log(error);
    if(error.name === 'TokenExpiredError') {
      return res.status(200).json({code:'e402', message: 'token has expired', status: false});
    }
    return res
      .status(200)
      .json({ code: "e500", message: "error occured", status: false });
  }
};

exports.test = (req, res) => {
  return res
    .status(200)
    .json({ code: "s200", message: "successful", status: true });
};
