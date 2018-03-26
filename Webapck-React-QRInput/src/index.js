// const React = require('react');
// const ReactDom = require('react-dom');
import React from 'react';
import ReactDom from 'react-dom';
import IdInput from './components/IdInput.jsx';


const app = document.createElement('div');
app.id = 'app';
app.className = 'app';
document.body.appendChild(app);


ReactDom.render(
    <IdInput />,
    document.getElementById('app')
);
