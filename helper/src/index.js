import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { mergeStyles } from '@fluentui/react';

// Application Insights - https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-react-js
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// Config
// TODO: Can we iterate over every json file in the configpresets directory?
import baseConfig from "./config.json";
import principalConfig from "./configpresets/principals.json"
import entScaleConfig from "./configpresets/entScale.json"
import baselineConfig from "./configpresets/baselines.json"

const configData = {
  ...baseConfig,
  presets: {
    ...principalConfig,
    ...entScaleConfig,
    ...baselineConfig
  }
};

export const appInsights = new ApplicationInsights({
  config: { instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY }
});
if (process.env.REACT_APP_APPINSIGHTS_KEY) {
  appInsights.loadAppInsights();
}

export const ConfigContext = React.createContext()

// Inject some global styles
mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

ReactDOM.render(
  <React.StrictMode>
      <ConfigContext.Provider value={configData}>
        <App />
      </ConfigContext.Provider>
    </React.StrictMode>, document.getElementById('root'));

