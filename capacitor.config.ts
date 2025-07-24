import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9831c0f46e044161837bc1f45a18e93e',
  appName: 'EthioLegal AI - Ethiopian Legal Assistant',
  webDir: 'dist',
  server: {
    url: 'https://9831c0f4-6e04-4161-837b-c1f45a18e93e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#2D5016",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;