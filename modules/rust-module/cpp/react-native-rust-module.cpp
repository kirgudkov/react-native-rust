#include "react-native-rust-module.h"
#include "librust.h"

#include <string>

using namespace facebook;
using namespace std;

void install(jsi::Runtime &jsiRuntime) {
	// use std::move() if the result of jsi::Function::createFromHostFunction() is stored in a variable
	jsiRuntime.global().setProperty(jsiRuntime, "multiply", jsi::Function::createFromHostFunction(jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, "multiply"), 2, [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments, size_t count) -> jsi::Value {
		// {} is a shorthand for jsi::Value(double) constructor
		return {rust::multiply(arguments[0].getNumber(), arguments[1].getNumber())};
	}));
	
	jsiRuntime.global().setProperty(jsiRuntime, "sayHello", jsi::Function::createFromHostFunction(jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, "say_hello"), 0, [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments, size_t count) -> jsi::Value {
		char *rustStr = rust::say_hello();
		string cppStr(rustStr);
		rust::free_string(rustStr);
		
		return jsi::String::createFromUtf8(runtime, cppStr);
	}));
	
	jsiRuntime.global().setProperty(jsiRuntime, "generateQR", jsi::Function::createFromHostFunction(jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, "generateQR"), 1, [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments, size_t count) -> jsi::Value {
		char *rustSvgStr = rust::generate_qr(arguments[0].getString(runtime).utf8(runtime).c_str());
		string cppSvgStr(rustSvgStr);
		rust::free_string(rustSvgStr);
		
		return jsi::String::createFromUtf8(runtime, cppSvgStr);
	}));
}
