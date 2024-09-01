#include <jsi/jsi.h>

namespace facebook::jsi {
    class Runtime;
}

#ifndef RUSTMODULE_H
#define RUSTMODULE_H

namespace rust_module {
    void install(facebook::jsi::Runtime &jsiRuntime);
}

#endif /* RUSTMODULE_H */
