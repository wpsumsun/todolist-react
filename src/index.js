import React from 'react';
import {render} from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Welcome from './welcome';

render(
    <Welcome name='summer'/>,
    document.getElementById('root')
)

