import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import mockTree from './mockData';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App categoryTree={mockTree} />
    </BrowserRouter>,
    document.getElementById('root')
);
