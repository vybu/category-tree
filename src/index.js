import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import testTree from './mockData';

ReactDOM.render(<App testTree={testTree}/>, document.getElementById('root'));
