# Minimal Three.js + WebAssembly + WebSocket Demo

## Features
- 3D spinning cube (Three.js)
- C++ WebAssembly function, called from JS
- Node.js WebSocket server (ping/pong)

## Setup Instructions

### 1. Compile WebAssembly (requires Emscripten)

```
cd public/wasm
emcc hello.cpp -o hello.js -s MODULARIZE -s EXPORT_NAME=createModule -s EXPORTED_FUNCTIONS="['_getNumber']" -s EXPORTED_RUNTIME_METHODS="['cwrap']"
```

### 2. Install Node.js dependencies

```
npm install
```

### 3. Start the WebSocket server

```
npm run start:ws
```

This will run the WebSocket server on port 8000.

### 4. Serve the frontend

You can use any static file server. For example, to serve on port 5000:

```
npx serve public -l 5000
# or
python -m http.server 5000 --directory public
```

Visit [http://localhost:5000](http://localhost:5000) in your browser.

---

- The 3D demo and WASM result are shown on the page.
- WebSocket status is shown and also logged in the browser console.

---

## Notes
- Download `three.min.js` from [Three.js releases](https://unpkg.com/three@0.150.1/build/three.min.js) and place it in `public/` if not already present.
- Make sure to compile `hello.cpp` before opening the site.
- The WebSocket server must be running for full demo functionality.
