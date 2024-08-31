#include <jni.h>
#include "react-native-rust-module.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_rustmodule_RustModuleModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return rustmodule::multiply(a, b);
}
