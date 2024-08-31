#import <React/RCTBridgeModule.h>

#ifdef __cplusplus
#import "react-native-rust-module.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRustModuleSpec.h"

@interface RustModule : NSObject <NativeRustModuleSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RustModule : NSObject <RCTBridgeModule>
#endif

@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
