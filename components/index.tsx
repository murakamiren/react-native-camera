import { Camera } from "expo-camera";
import { Button, Text, View } from "native-base";
import { useEffect, useState, VFC } from "react";
import { TouchableOpacity } from "react-native";

const Index: VFC = () => {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const handleType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>no access to camera</Text>;
    }
    return (
        <View flex="1">
            <Camera type={type} style={{ flex: 1 }} />
            <View>
                <Button onPress={handleType}>flip</Button>
            </View>
        </View>
    );
};

export default Index;
