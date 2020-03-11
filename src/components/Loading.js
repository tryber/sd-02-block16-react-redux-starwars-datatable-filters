import React from 'react';
import '../styles/Loading.css';

const skull = require('../images/90.gif');

const Loading = () => (
  <div className="Initial_Loading">
    <h2>Loading...</h2>
    <img src={skull} alt="loading Skull" />
  </div>
);

export default Loading;
