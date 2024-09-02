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

# ------ Patch fast_qr Cargo.toml to change its crate-type --------
CRATE_NAME="fast_qr"
CARGO_REGISTRY="${HOME}/.cargo/registry/src"

DEP_DIR=$(find "$CARGO_REGISTRY" -maxdepth 2 -type d | grep "$CRATE_NAME")

if [ -z "$DEP_DIR" ]; then
    echo "Error: Could not find directory for $CRATE_NAME"
    exit 1
fi

DEP_CARGO_TOML="$DEP_DIR/Cargo.toml"

cp "$DEP_CARGO_TOML" "$DEP_CARGO_TOML.bak"
sed -i '' 's/cdylib/staticlib/' "$DEP_CARGO_TOML"
sed -i '' 's/rlib/lib/' "$DEP_CARGO_TOML"
# ------ End patch ------------------------------------------------

for TARGET in "${TARGETS[@]}"; do
    echo "Building for $TARGET"
    cargo build --target "$TARGET"
done

# Undo patch
mv "$DEP_CARGO_TOML.bak" "$DEP_CARGO_TOML"

cbindgen --config cbindgen.toml -o "target/include/librust.h"
