const fs = require('fs');

require('dotenv').config();

const targetPath = './src/app/config/api.config.ts';
const configFile = `export const API_CONFIGURATION = {
   url: '${process.env.PAPERLESS_URL}',
   username: '${process.env.PAPERLESS_USERNAME}',
   password: '${process.env.PAPERLESS_PASSWORD}',
};
`;

fs.writeFile(targetPath, configFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular api.config.ts file generated correctly at ${targetPath} \n`);
  }
});
