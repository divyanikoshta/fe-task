// 4.1 Micro-Frontend Router Strategy
// Task:
// Design a micro-frontend router strategy (can be Angular or React).
// Each micro-frontend should have its own route and be loaded dynamically at runtime.
// Implement a shell app that lazy-loads remote apps based on route.

// Focus: 
// Dynamic routing, lazy-loading, inter-app communicationsolution// AppRouter.tsx (Shell app)

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const RemoteApp1 = lazy(() => import('remoteApp1/App'));
const RemoteApp2 = lazy(() => import('remoteApp2/App'));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/app1/*" element={<RemoteApp1 />} />
          <Route path="/app2/*" element={<RemoteApp2 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// webpack.config.js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remoteApp1: 'remoteApp1@http://localhost:3001/remoteEntry.js',
    remoteApp2: 'remoteApp2@http://localhost:3002/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});


new ModuleFederationPlugin({
  name: 'remoteApp1',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});