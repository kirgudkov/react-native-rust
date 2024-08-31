#include <jsi/jsi.h>

namespace facebook {
	namespace jsi {
		class Runtime;
	}
}

#ifndef RUSTMODULE_H
#define RUSTMODULE_H

namespace rustmodule {
	void install(facebook::jsi::Runtime &jsiRuntime);
}

#endif /* RUSTMODULE_H */
