#!/bin/bash

set -e
export PATH="$HOME/.cargo/bin:/usr/bin:/usr/local/bin:$PATH"

cd "$(dirname "$0")"

OUTPUT_DIR="target/universal"

mkdir -p $OUTPUT_DIR

# Build for iOS devices (arm64)
cargo build --target aarch64-apple-ios
# Build for iOS simulator on Apple Silicon Macs (arm64)
cargo build --target aarch64-apple-ios-sim

# Create a universal binary
lipo -create \
    target/aarch64-apple-ios-sim/debug/librust.a \
    -output $OUTPUT_DIR/librust.a

# Generate C headers
cbindgen --config cbindgen.toml -o $OUTPUT_DIR/librust.h

echo "Rust library built successfully"
