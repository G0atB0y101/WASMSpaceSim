@echo off
REM Compile WebAssembly with Emscripten
REM FIX: Compiles logic.cpp to WebAssembly with proper exports for JavaScript
REM FIX: Fixed quote escaping for Windows batch file
emcc public/wasm/logic.cpp -o public/wasm/logic.js -s EXPORTED_FUNCTIONS="[\"_Simulate\", \"_getBodyData\"]" -s EXPORTED_RUNTIME_METHODS="[\"ccall\", \"cwrap\"]" -s ALLOW_MEMORY_GROWTH=1
echo WebAssembly compilation complete! 