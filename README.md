# hao-backprop-test

[![Node.js](https://img.shields.io/badge/Node.js-any_LTS-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-7%2B-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A minimal Node.js HTTP server serving a static "Hello, World!" response, used as a test fixture for Backprop integration.

---

## Table of Contents

- [About](#about)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Code Overview](#code-overview)
- [License](#license)

---

## About

**hao-backprop-test** is a minimal Node.js HTTP server designed as a test fixture for Backprop integration. It serves a static "Hello, World!" response to every incoming HTTP request, regardless of method, path, or headers.

The project deliberately maintains a **zero-dependency architecture** — no external npm packages are used. The server relies exclusively on the Node.js built-in `http` module, keeping the footprint as small as possible and eliminating supply-chain complexity.

| Field       | Value                    |
|-------------|--------------------------|
| Package     | `hello_world`            |
| Version     | `1.0.0`                  |
| Author      | `hxu`                    |
| License     | MIT                      |
| Description | Hello world in Node.js   |

---

## Project Structure

The repository is intentionally minimal with no subdirectories (no `src/`, `lib/`, `docs/`, or `test/` folders):

```text
hao-backprop-test/
├── server.js          # Node.js HTTP server (sole runtime component, 67 lines)
├── package.json       # npm package manifest (zero dependencies)
├── package-lock.json  # npm lockfile (lockfileVersion 3, empty dependency tree)
└── README.md          # Project documentation (this file)
```

> **Note:** The `"main"` field in `package.json` is set to `"index.js"`, which does not exist in the repository. The actual entry point is `server.js`. This discrepancy does not affect server operation since the server is started directly via `node server.js` rather than through the `main` field.

---

## Prerequisites

| Requirement | Minimum                                  | Recommended                              |
|-------------|------------------------------------------|------------------------------------------|
| Node.js     | Any version with CommonJS + `http` module | Node.js 20.x LTS                        |
| npm         | 7+ (required for lockfileVersion 3)      | 11.x (bundled with Node.js 20)           |
| Port 3000   | Must be available                        | Must be available                        |

**Why npm 7+?** The `package-lock.json` file uses `lockfileVersion: 3`, which is only supported by npm 7 and later. Earlier versions of npm will either fail to parse the lockfile or silently downgrade it.

Download Node.js (which includes npm) from the official website: [https://nodejs.org/](https://nodejs.org/)

---

## Installation

```bash
git clone <repository-url>
cd hao-backprop-test
npm install
```

> **Note:** Since the project has zero dependencies, `npm install` will produce an empty `node_modules` directory (or no directory at all). The install step is included for completeness and to validate the lockfile integrity.

---

## Usage

### Start the Server

```bash
node server.js
```

**Expected console output:**

```text
Server running at http://127.0.0.1:3000/
```

### Verify the Server

Open a new terminal and run:

```bash
curl http://127.0.0.1:3000/
```

**Expected output:**

```text
Hello, World!
```

### Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

---

## API Reference

### Endpoint Specification

| Property              | Value                          |
|-----------------------|--------------------------------|
| URL                   | `http://127.0.0.1:3000/`      |
| Accepted Methods      | Any (GET, POST, PUT, DELETE, etc.) |
| Accepted Paths        | Any (`/`, `/foo`, `/bar/baz`, etc.) |
| Accepted Headers      | Any                            |
| Response Status       | `200 OK`                       |
| Response Content-Type | `text/plain`                   |
| Response Body         | `Hello, World!\n`              |

### Example Request

```bash
curl -v http://127.0.0.1:3000/
```

**Expected output (key lines):**

```text
> GET / HTTP/1.1
> Host: 127.0.0.1:3000
>
< HTTP/1.1 200 OK
< Content-Type: text/plain
<
Hello, World!
```

### Known Limitations

- **Localhost only** — The server binds to `127.0.0.1` and is not accessible from other machines on the network.
- **No routing** — All paths return the same response. Requesting `/`, `/foo`, or `/any/path` all produce identical output.
- **No error responses** — Every request succeeds with HTTP 200. There are no 404, 500, or other error status codes.
- **No request body parsing** — The server ignores request bodies entirely. POST data, JSON payloads, and form submissions are all disregarded.

### Request/Response Flow

```mermaid
sequenceDiagram
    participant Client as HTTP Client
    participant Server as Node.js Server (127.0.0.1:3000)
    Client->>Server: Any HTTP Request (any method, any path)
    Server->>Server: Set statusCode = 200
    Server->>Server: Set Content-Type: text/plain
    Server-->>Client: 200 OK "Hello, World!\n"
```

---

## Deployment Guide

### Local Execution

Start the server in the foreground:

```bash
node server.js
```

The server will bind to `127.0.0.1:3000` and begin accepting HTTP requests. The process runs in the foreground and can be stopped with `Ctrl+C`.

### Production Considerations

The server binds to `127.0.0.1` (localhost only), which means it is **not accessible from external machines**. This is by design for a test fixture. To allow external access, the `hostname` constant in `server.js` would need to be changed to `'0.0.0.0'` — however, this modification is outside the scope of this project.

### Process Management

For long-running deployments, consider using a process manager:

**PM2:**

```bash
npx pm2 start server.js
npx pm2 status
```

**systemd (Linux):**

Create a systemd service unit file to manage the server as a system service. Refer to the [systemd documentation](https://www.freedesktop.org/software/systemd/man/systemd.service.html) for details.

> **Note:** Process managers are informational suggestions, not project requirements.

### Port Configuration

Port `3000` is hardcoded in `server.js` (line 31: `const port = 3000`). To change the port:

1. Open `server.js`
2. Modify the `port` constant to the desired port number
3. Restart the server

There is no environment variable support for port configuration.

### Shutdown Procedures

| Scenario              | Command                    |
|-----------------------|----------------------------|
| Foreground process    | `Ctrl+C`                   |
| Background process    | `kill <PID>` or `kill %1`  |
| PM2 managed process   | `npx pm2 stop server`      |

---

## Troubleshooting

### ERR-001: Port Already in Use

**Symptom:**

```text
Error: listen EADDRINUSE: address already in use 127.0.0.1:3000
```

**Cause:** Another process is already using port 3000.

**Resolution:**

Find and stop the conflicting process:

```bash
# macOS / Linux
lsof -i :3000
kill <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Alternatively, change the `port` constant in `server.js` to an available port.

---

### ERR-002: Node.js Not Installed

**Symptom:**

```text
command not found: node
```

or on Windows:

```text
'node' is not recognized as an internal or external command
```

**Cause:** Node.js is not installed or is not in the system PATH.

**Resolution:** Install Node.js from [https://nodejs.org/](https://nodejs.org/) and ensure it is added to your PATH.

---

### ERR-003: Permission Denied

**Symptom:**

```text
Error: listen EACCES: permission denied 127.0.0.1:3000
```

**Cause:** Insufficient permissions to bind to the specified port.

**Resolution:** Use a port number above 1024 (which does not require elevated privileges), or run the server with elevated permissions (`sudo` on macOS/Linux). Port 3000 should not normally require elevated privileges, so this error typically indicates a system policy restriction.

---

### ERR-004: Module Not Found

**Symptom:**

```text
Error: Cannot find module '/wrong/path/server.js'
```

**Cause:** The `node server.js` command was run from a directory that does not contain `server.js`.

**Resolution:** Navigate to the project root directory before starting the server:

```bash
cd /path/to/hao-backprop-test
node server.js
```

---

### ERR-005: Connection Refused

**Symptom:**

```text
curl: (7) Failed to connect to 127.0.0.1 port 3000: Connection refused
```

**Cause:** The server is not running.

**Resolution:** Start the server before making requests:

```bash
node server.js
```

Then, in a separate terminal:

```bash
curl http://127.0.0.1:3000/
```

---

## Code Overview

The server is a **single-file server** built on the Node.js built-in `http` module with no external dependencies. It follows a synchronous startup sequence with asynchronous request handling. The request handler is **stateless** — every request receives the identical response regardless of method, path, or headers.

### Architecture Summary

| Aspect              | Detail                                              |
|---------------------|-----------------------------------------------------|
| Runtime             | Node.js with CommonJS modules (`require()`)         |
| Dependencies        | Zero — uses only the built-in `http` module         |
| Startup             | Synchronous (module load → constants → bind)        |
| Request Handling    | Asynchronous (event-driven via `http.createServer`) |
| State               | Stateless — no data persistence between requests    |

### Server Lifecycle

```mermaid
flowchart TD
    A[node server.js] --> B[Load http module]
    B --> C[Define hostname and port constants]
    C --> D[Create HTTP server with request handler]
    D --> E[Bind server to 127.0.0.1:3000]
    E --> F[Log startup notification to console]
    F --> G[Server listening for incoming requests]
    G --> H{Incoming HTTP request}
    H --> I[Set status 200]
    I --> J[Set Content-Type: text/plain]
    J --> K["Send 'Hello, World!' response"]
    K --> G
```

### Source Code Walkthrough

The following references correspond to the current JSDoc-annotated `server.js` line numbers:

- **Line 13** — `const http = require('http')`: Imports the Node.js built-in `http` module, which provides the HTTP server functionality.
- **Lines 22, 31** — `const hostname` / `const port`: Defines the server binding address (`127.0.0.1`) and listening port (`3000`) as named constants.
- **Lines 45–53** — `http.createServer((req, res) => {...})`: Creates the HTTP server with a request handler that sets a 200 status code, a `text/plain` content type, and sends the `"Hello, World!\n"` response body.
- **Lines 64–67** — `server.listen(port, hostname, () => {...})`: Binds the server to the specified hostname and port, then logs a startup notification to the console once the server is ready to accept connections.

---

## License

This project is licensed under the **MIT License**.

**Author:** hxu

See `package.json` for license metadata. No standalone `LICENSE` file exists in this repository.
