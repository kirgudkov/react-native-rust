import React from "react";
import { StyleSheet, Text, View, Image, StatusBar, Platform, SafeAreaView, TouchableOpacity } from "react-native";
import RustModule from "react-native-rust-module";
import { SvgXml } from "react-native-svg";

if (Platform.OS === "android") {
	StatusBar.setBackgroundColor("rgb(125,122,255)");
}

function App() {
	const [qr, setQR] = React.useState<QR | undefined>();

	const generate = () => {
		const a = Math.floor(Math.random() * 100);
		const b = Math.floor(Math.random() * 100);

		const product = RustModule.multiply(a, b).toString();

		setQR({
			svg: RustModule.generateQR(product),
			text: `The product of ${a} and ${b} is encoded in the QR code above using Rust!`
		});
	};

	React.useEffect(generate, []);

	return (
		<SafeAreaView style={styles.sav}>
			<View style={styles.container}>
				<Image
					style={styles.ferris}
					source={{ uri: "ferris" }}
				/>
				<Text style={[styles.text, styles.header]}>
					{RustModule.sayHello()}
				</Text>

				<View style={styles.svg}>
					{qr ? <SvgXml xml={qr.svg} /> : null}
				</View>
				<Text style={styles.text}>
					{qr?.text}
				</Text>

				<TouchableOpacity
					onPress={generate}
					style={styles.button}
				>
					<Text style={[styles.text, styles.buttonText]}>
						Generate random product
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

type QR = {
	svg: string;
	text: string;
}

const ACCENT = "rgb(248,99,125)";
const PRIMARY = "rgb(125,122,255)";
const SECONDARY = "rgb(151,150,244)";

const styles = StyleSheet.create({
	sav: {
		flex: 1,
		backgroundColor: PRIMARY
	},
	container: {
		flex: 1, top: -30,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 18
	},
	ferris: {
		width: 350,
		aspectRatio: 2,
		resizeMode: "contain"
	},
	header: {
		fontSize: 36,
		fontWeight: "bold"
	},
	text: {
		fontSize: 16,
		color: "#ffffff",
		textAlign: "center"
	},
	svg: {
		marginVertical: 18,
		borderColor: SECONDARY,
		borderWidth: 2,
		borderCurve: "continuous",
		borderRadius: 20,
		width: 300,
		aspectRatio: 1
	},
	button: {
		marginTop: 18,
		paddingVertical: 12,
		paddingHorizontal: 24,
		backgroundColor: ACCENT,
		borderRadius: 12,
		borderCurve: "continuous"
	},
	buttonText: {
		fontWeight: "bold"
	}
});

export default App;
