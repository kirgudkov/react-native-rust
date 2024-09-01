cmake_minimum_required(VERSION 3.4.1)
project(RustModule)

set(PACKAGE_NAME "react-native-rust-module")
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

add_library(${PACKAGE_NAME} SHARED
        ../cpp/react-native-rust-module.cpp
        cpp-adapter.cpp
)

include_directories(
        ../cpp
        ../rust/target/include
)

find_package(
        ReactAndroid REQUIRED CONFIG
)

if("${ANDROID_ABI}" STREQUAL "armeabi-v7a")
    target_link_libraries(${PACKAGE_NAME}
            ${CMAKE_SOURCE_DIR}/../rust/target/armv7-linux-androideabi/debug/librust.a
    )
elseif("${ANDROID_ABI}" STREQUAL "arm64-v8a")
    target_link_libraries(${PACKAGE_NAME}
            ${CMAKE_SOURCE_DIR}/../rust/target/aarch64-linux-android/debug/librust.a
    )
elseif("${ANDROID_ABI}" STREQUAL "x86")
    target_link_libraries(${PACKAGE_NAME}
            ${CMAKE_SOURCE_DIR}/../rust/target/i686-linux-android/debug/librust.a
    )
elseif("${ANDROID_ABI}" STREQUAL "x86_64")
    target_link_libraries(${PACKAGE_NAME}
            ${CMAKE_SOURCE_DIR}/../rust/target/x86_64-linux-android/debug/librust.a
    )
endif()

target_link_libraries(
        ${PACKAGE_NAME}
        ReactAndroid::jsi
        android
)
