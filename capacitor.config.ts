import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.para.controle.de.tarefas',
  appName: 'Tarefas',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },

  "plugins": {
  "AdMob": {
    "appId": "ca-app-pub-9861532517570088~6368273007"
  }
}


};

export default config;
