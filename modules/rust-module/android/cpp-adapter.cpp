#include <jni.h>
#include "react-native-rust-module.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_rustmodule_RustModuleModule_initialize(JNIEnv *env, jobject thiz, jlong jsi, jstring doc_dir) {
    auto runtime = reinterpret_cast<facebook::jsi::Runtime *>(jsi);

    if (runtime) {
        rust_module::install(*runtime);
    }
}
