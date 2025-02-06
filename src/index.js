import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="360145225602-qhu48a285kg2as3n6m1q5em1q080rmbt.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
