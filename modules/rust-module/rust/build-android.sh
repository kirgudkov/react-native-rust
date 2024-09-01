#!/bin/bash

set -e
export PATH="$HOME/.cargo/bin:/usr/bin:/usr/local/bin:$PATH"

cd "$(dirname "$0")"

if [ -z "$ANDROID_NDK_HOME" ]; then
    echo "Error: ANDROID_NDK_HOME is not set. Please set it to your Android NDK path."
    exit 1
fi

TARGETS=(
    "aarch64-linux-android"
    "armv7-linux-androideabi"
    "x86_64-linux-android"
    "i686-linux-android"
)

for TARGET in "${TARGETS[@]}"; do
    echo "Building for $TARGET"
    cargo build --target "$TARGET"
done

cbindgen --config cbindgen.toml -o "target/include/librust.h"
