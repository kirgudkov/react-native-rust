#import "RustModule.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>

@implementation RustModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (void)setBridge:(RCTBridge *)bridge
{
  _bridge = bridge;
  _setBridgeOnMainQueue = RCTIsMainQueue();

  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
  if (!cxxBridge.runtime) {
	return;
  }

  [bridge dispatchBlock:^{
	rustmodule::install(*(facebook::jsi::Runtime *)cxxBridge.runtime);
  } queue:RCTJSThread];
}

@end
