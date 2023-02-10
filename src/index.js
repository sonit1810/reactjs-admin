import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import AppTest from './AppTest';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<AppTest />, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App.js', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
}
registerServiceWorker();
