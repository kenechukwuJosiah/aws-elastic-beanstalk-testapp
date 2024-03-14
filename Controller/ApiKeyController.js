const { v4: uuidv4 } = require('uuid');
const ApiKeyModel = require('../Models/ApiKey');

exports.genApiKey = async (req, res) => {

  const {projectName, projectManager} = req.body;

  if(!projectManager) return res.status(200).json({code: 'e404', message: 'project name is required', status: false});
  if(!projectName) return res.status(200).json({code: 'e404', message: 'project name is required', status: false});

  const apiKey =  uuidv4();
  const appSecret = uuidv4();

  //invalidate all api keys that belongs to the project manager
  await ApiKeyModel.updateMany({projectName, projectManager, status: 1}, {status: 0});

  //Create a new api key
  const newApikey = await ApiKeyModel.create({
    projectManager,
    projectName,
    apiKey,
    appSecret
  });

  return res.status(200).json({code: 's200', message: newApikey, status: true})
}