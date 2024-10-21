#import "RustModule.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>

@implementation RustModule

@synthesize bridge = _bridge;

// This macro is used to register the module with React Native.
// It exposes this Objective-C++ class as a native module that JavaScript can interact with.
// The module name is automatically inferred from the class name, but we can pass a custom name as an argument if needed.
RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
	return YES;
}

- (void)setBridge:(RCTBridge *)bridge
{
	_bridge = bridge;
	
	[self.bridge dispatchBlock:^{
		RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
		if (!cxxBridge.runtime) {
			return;
		}
		
		install(*(facebook::jsi::Runtime *)cxxBridge.runtime);
	} queue:RCTJSThread];
}

@end
