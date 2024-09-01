package com.rustmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RustModuleModule.NAME)
class RustModuleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private external fun initialize(jsiPtr: Long, docDir: String)

  override fun getName(): String {
    return NAME
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun install(): Boolean {
    return try {
      initialize(
        reactApplicationContext.javaScriptContextHolder!!.get(),
        reactApplicationContext.filesDir.absolutePath
      )
      true
    } catch (exception: Exception) {
      false
    }
  }

  companion object {
    init {
      System.loadLibrary("react-native-rust-module")
    }

    const val NAME = "RustModule"
  }
}
