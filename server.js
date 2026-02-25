/**
 * @file Minimal Node.js HTTP server built with Express.js that exposes two endpoints:
 * a root endpoint returning 'Hello, World!' and a '/good-morning' endpoint returning
 * 'Good Morning'. This file is the sole runtime component of the hao-backprop-test
 * project, serving as a test fixture for Backprop integration.
 * @module server
 * @author hxu
 * @version 1.0.0
 * @license MIT
 * @see {@link https://expressjs.com/} Express.js Documentation
 * @see {@link https://nodejs.org/api/http.html} Node.js HTTP Module Documentation
 */

// Import the Express.js framework for declarative HTTP routing and middleware support
const express = require('express');

/**
 * The Express application instance used to define routes and start the server.
 * @type {express.Application}
 */
// Create the Express application — the central object that registers route handlers
const app = express();

// Security boundary — limits access to local connections only
/**
 * The hostname/IP address the server binds to. Set to '127.0.0.1' (IPv4 loopback)
 * to restrict access to the local machine only, preventing external network exposure.
 * @constant {string}
 * @default '127.0.0.1'
 */
const hostname = '127.0.0.1';

// Conventional development port, above the privileged port range (< 1024)
/**
 * The TCP port number the server listens on. Port 3000 is a conventional choice
 * for Node.js development servers.
 * @constant {number}
 * @default 3000
 */
const port = 3000;

/**
 * @description Handles GET requests to the root path ('/'). Responds with a plain-text
 * 'Hello, World!' message and a 200 OK status. This is the original endpoint of the
 * project, preserved for backward compatibility.
 * @param {express.Request} req - The Express request object. Not used — the response
 *   is static regardless of request content.
 * @param {express.Response} res - The Express response object used to send the reply
 *   back to the client.
 * @returns {void}
 * @example
 * // curl http://127.0.0.1:3000/
 * // => Hello, World!
 */
app.get('/', (req, res) => {
  // Set Content-Type to plain text and send the greeting response
  // Using res.type() shorthand instead of res.setHeader() for Express best practices
  res.type('text/plain').send('Hello, World!\n');
});

/**
 * @description Handles GET requests to the '/good-morning' path. Responds with a
 * plain-text 'Good Morning' message and a 200 OK status. This endpoint was added
 * to demonstrate multi-route capability with Express.js.
 * @param {express.Request} req - The Express request object. Not used — the response
 *   is static regardless of request content.
 * @param {express.Response} res - The Express response object used to send the reply
 *   back to the client.
 * @returns {void}
 * @example
 * // curl http://127.0.0.1:3000/good-morning
 * // => Good Morning
 */
app.get('/good-morning', (req, res) => {
  // Respond with a plain-text morning greeting
  res.type('text/plain').send('Good Morning\n');
});

/**
 * @description Binds the Express server to the specified hostname and port, then
 * executes the callback to log a startup notification. The server begins accepting
 * incoming connections once binding is successful.
 * @example
 * // Start the server:
 * // $ node server.js
 * // Expected output: Server running at http://127.0.0.1:3000/
 */
app.listen(port, hostname, () => {
  // Log the server URL to confirm successful startup and inform the developer where to send requests
  console.log(`Server running at http://${hostname}:${port}/`);
});
