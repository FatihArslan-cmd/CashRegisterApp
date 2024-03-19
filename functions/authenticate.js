import * as LocalAuthentication from "expo-local-authentication";

const authenticate = async () => {
  // Cihaz biyometrik kimlik doğrulama için uyumlu mu?
  const isCompatible = await LocalAuthentication.hasHardwareAsync();
  if (!isCompatible) {
    console.warn(
      "Your device is not compatible with biometric authentication."
    );
    return false;
  }

 
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) {
    console.warn("No biometric credentials found on this device.");
    return false;
  }

  try {
    // Biyometrik kimlik doğrulama isteği
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with your Face ID",
      fallbackLabel: "Use your passcode instead",
    });

    return success;
  } catch (error) {
    console.error("Authentication error:", error.message);
    return false;
  }
};

export default authenticate;
