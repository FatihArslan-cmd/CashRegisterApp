import appJson from '../app.json'; 

const getAppVersion = () => {
  if (appJson && appJson.expo && appJson.expo.version) {
    return appJson.expo.version;
  } else {
    return 'Version not found';
  }
};

export default getAppVersion;
