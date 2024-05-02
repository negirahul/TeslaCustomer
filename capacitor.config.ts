import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teslacustomer.app',
  appName: 'Tesla Customer',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
