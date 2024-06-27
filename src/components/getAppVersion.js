import appJson from '../../app.json'; 

//Get the version of app from app.json file

const getAppVersion = () => {
  if (appJson && appJson.expo && appJson.expo.version) {
    return appJson.expo.version;
  } else {
    return 'Version not found';
  }
};

export default getAppVersion;
