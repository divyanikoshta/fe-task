// 4.2 Bundle Optimization & SSR Hydration

// Task: 

// Configure a simple React or Angular app with:
// Code splitting using dynamic imports.
// Lazy loading for routes/components.
// SSR hydration for the first page load.

// Focus: 
// Bundle optimization, SSR hydration, lazy loading, and code-splitting.


// Bundle Optimization
// webpack.client.js
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};


// React Code Splitting
// src/App.tsx
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// Server-Side Rendering
// server.tsx
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';
import { StaticRouter } from 'react-router-dom/server';

const server = express();

server.use(express.static('dist'));

server.get('*', (req, res) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>SSR Example</title></head>
      <body>
        <div id="root">${content}</div>
        <script src="/main.[hash].js"></script>
      </body>
    </html>
  `);
});

server.listen(3000);

// Hydration on the Client
// src/index.tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
