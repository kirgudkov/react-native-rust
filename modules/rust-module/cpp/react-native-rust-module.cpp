#include "react-native-rust-module.h"
#include "librust.h"
#include <string>

using namespace facebook;
using namespace std;

namespace rust_module {
    void install(jsi::Runtime &jsiRuntime) {
        auto multiply = jsi::Function::createFromHostFunction(jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, "multiply"), 2, [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments, size_t count) -> jsi::Value {
            return {rust::multiply(arguments[0].getNumber(), arguments[1].getNumber())};
        });

        jsiRuntime.global().setProperty(jsiRuntime, "multiply", std::move(multiply));

        auto say_hello = jsi::Function::createFromHostFunction(jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, "say_hello"), 0, [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments, size_t count) -> jsi::Value {
            char *rust_string = rust::say_hello();
            string cpp_string(rust_string);
            rust::free_string(rust_string);

            return jsi::String::createFromUtf8(runtime, cpp_string);
        });

        jsiRuntime.global().setProperty(jsiRuntime, "sayHello", std::move(say_hello));
    }
}
