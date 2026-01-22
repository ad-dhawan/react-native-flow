// src/Flow.tsx => EWFlow
// src/index.ts => exports RNFlow, types, examples
// export { default } from './src/Flow'
// export { RNFlowProps, RNFlowNode } from './src/Flow';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);