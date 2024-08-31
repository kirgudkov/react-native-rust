import { NativeModules } from "react-native";

if (NativeModules.RustModule && typeof NativeModules.RustModule.install === "function") {
	NativeModules.RustModule.install();
}

const RustModule = {
	multiply(a: number, b: number): number {
		return (global as any).multiply(a, b);
	},
	sayHello(): string {
		return (global as any).sayHello();
	}
};

export default RustModule;
