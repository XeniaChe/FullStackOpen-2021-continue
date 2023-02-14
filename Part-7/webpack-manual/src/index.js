// Before React added
/* import { App } from './App';

const hello = (name) => {
  console.log(`Hello, ${name}`);
};

App();
 */

// After React added
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
