import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Alert,
} from "react-native";

async function askForPermissions() {
	const { status } =
		await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (status !== "granted") {
		Alert.alert(
			"Sorry, we need camera roll permissions to make this work!"
		);
		return false;
	}
	return true;
}
export const PhotoPicker = ({ onPick }) => {
	const [image, setImage] = useState(null);
	const takePhoto = async () => {
		const hasPermissions =
			await askForPermissions();
		if (!hasPermissions) {
			return;
		}
		const img =
			await ImagePicker.launchCameraAsync({
				quality: 0.7,
				allowsEditing: false,
				aspect: [16, 9],
			});
		setImage(img.uri);
		onPick(img.uri);
	};
	return (
		<View style={styles.wrapper}>
			<Button
				title="Сделать фото"
				onPress={takePhoto}
			></Button>
			{image && (
				<Image
					style={styles.image}
					source={{ uri: image }}
				></Image>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: 200,
		marginTop: 10,
	},
});
