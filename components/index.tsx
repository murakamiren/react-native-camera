import { Camera } from "expo-camera";
import { View } from "native-base";
import { useEffect, useState, VFC } from "react";

const Index: VFC = () => {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    return <View></View>;
};

export default Index;
