import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Platform } from "react-native";
import RustModule from "react-native-rust-module";

if (Platform.OS === "android") {
	StatusBar.setBackgroundColor("rgb(125,122,255)");
}

function App() {
	const [result, setResult] = React.useState<string>("");

	const onPress = () => {
		const a = Math.floor(Math.random() * 100);
		const b = Math.floor(Math.random() * 100);

		setResult(`${a} * ${b} = ${RustModule.multiply(a, b)}`);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: "ferris" }}
				/>
				<Text style={[styles.text, styles.hello]}>
					{RustModule.sayHello()}
				</Text>

				<Text style={[styles.text, styles.description]}>
					<Text
						onPress={onPress}
						style={[styles.text, styles.link]}
					>
						Press here
					</Text>
					{" to ask Rust to synchronously multiply two random numbers"}
				</Text>

				<Text style={styles.text}>
					{result}
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "rgb(125,122,255)"
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 18
	},
	text: {
		fontSize: 18,
		color: "#ffffff",
		textAlign: "center"
	},
	image: {
		height: 200, width: 300,
		resizeMode: "contain"
	},
	description: {
		marginVertical: 16
	},
	hello: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 16
	},
	link: {
		textDecorationLine: "underline"
	}
});

export default App;
