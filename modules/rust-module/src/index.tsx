import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-rust-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RustModule = NativeModules.RustModule
  ? NativeModules.RustModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return RustModule.multiply(a, b);
}
