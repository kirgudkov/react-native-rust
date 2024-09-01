#!/bin/bash

set -e

export PATH="$HOME/.cargo/bin:/usr/bin:/usr/local/bin:$PATH"

cd "$(dirname "$0")"

OUTPUT_DIR="target/universal"

mkdir -p $OUTPUT_DIR

cargo build --target aarch64-apple-ios-sim --release

lipo -create \
    target/aarch64-apple-ios-sim/release/librust.a \
    -output $OUTPUT_DIR/librust.a

cbindgen --config cbindgen.toml -o target/include/librust.h
