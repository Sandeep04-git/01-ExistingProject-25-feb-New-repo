/**
 * @file Minimal Node.js HTTP server that responds to every request with a plain-text
 * 'Hello, World!' message. This file is the sole runtime component of the
 * hao-backprop-test project, serving as a test fixture for Backprop integration.
 * @module server
 * @author hxu
 * @version 1.0.0
 * @license MIT
 * @see {@link https://nodejs.org/api/http.html} Node.js HTTP Module Documentation
 */

// Import Node.js built-in HTTP module — no external dependencies required
const http = require('http');

/**
 * The hostname/IP address the server binds to. Set to '127.0.0.1' (IPv4 loopback)
 * to restrict access to the local machine only, preventing external network exposure.
 * @constant {string}
 * @default '127.0.0.1'
 */
// Security boundary — limits access to local connections only
const hostname = '127.0.0.1';

/**
 * The TCP port number the server listens on. Port 3000 is a conventional choice
 * for Node.js development servers.
 * @constant {number}
 * @default 3000
 */
// Conventional development port, above the privileged port range (< 1024)
const port = 3000;

/**
 * @description Creates an HTTP server that responds to every incoming request with a
 * 200 OK status, plain-text content type, and a 'Hello, World!' message body. The
 * request handler is intentionally simple — it ignores the request method, URL,
 * headers, and body, returning an identical response for every request.
 * @type {http.Server}
 * @param {http.IncomingMessage} req - The incoming HTTP request object. Intentionally
 *   unused — the server returns the same response regardless of request content.
 * @param {http.ServerResponse} res - The HTTP response object used to send the reply
 *   back to the client.
 * @see {@link https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener}
 */
const server = http.createServer((req, res) => {
  // Set HTTP 200 OK status — indicates successful request processing
  res.statusCode = 200;
  // Indicate the response body is plain text, not HTML or JSON
  res.setHeader('Content-Type', 'text/plain');
  // Send the response body and signal that the response is complete.
  // Using res.end() instead of res.write() + res.end() for single-shot responses
  res.end('Hello, World!\n');
});

/**
 * @description Binds the HTTP server to the specified hostname and port, then executes
 * the callback to log a startup notification. The server begins accepting incoming
 * connections once binding is successful.
 * @example
 * // Start the server:
 * // $ node server.js
 * // Expected output: Server running at http://127.0.0.1:3000/
 */
server.listen(port, hostname, () => {
  // Log the server URL to confirm successful startup and inform the developer where to send requests
  console.log(`Server running at http://${hostname}:${port}/`);
});
