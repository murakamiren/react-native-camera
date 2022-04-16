import { Camera } from "expo-camera";
import {
    Box,
    Button,
    Center,
    HStack,
    Icon,
    IconButton,
    Image,
    Text,
    useToast,
    View,
} from "native-base";
import { useEffect, useState, VFC } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const Index: VFC = () => {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState<null | Camera>(null);
    const [pic, setPic] = useState<null | string>(null);
    const toast = useToast();

    const iconSize: number = 12;

    const handleType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const takePic = async () => {
        if (camera) {
            const image = await camera.takePictureAsync();
            setPic(image.uri);
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(image.uri);
                toast.show({
                    title: "save photo",
                    placement: "bottom",
                    description: "your photo is successfully saved!",
                });
            }
        }
    };

    const backToCamera = () => {
        setPic(null);
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
            {!pic ? (
                <Camera
                    type={type}
                    style={{ flex: 1 }}
                    ref={(ref) => {
                        setCamera(ref);
                    }}
                />
            ) : (
                <Image source={{ uri: pic }} alt="cant load image" flex={1} />
            )}
            <HStack
                w="full"
                h="24"
                justifyContent="center"
                alignItems="center"
                space={24}
            >
                {!pic ? (
                    <>
                        <IconButton
                            icon={
                                <Icon
                                    as={Ionicons}
                                    name="camera-reverse"
                                    size={iconSize}
                                    color="muted.900"
                                />
                            }
                            onPress={handleType}
                        />
                        <IconButton
                            icon={
                                <Icon
                                    as={Ionicons}
                                    name="camera-outline"
                                    size={iconSize}
                                    color="muted.900"
                                />
                            }
                            onPress={takePic}
                        />
                    </>
                ) : (
                    <Button
                        bgColor="muted.900"
                        size="lg"
                        leftIcon={
                            <Icon
                                as={Ionicons}
                                name="arrow-back-outline"
                                color="white"
                            />
                        }
                        onPress={backToCamera}
                    >
                        back to camera
                    </Button>
                )}
            </HStack>
        </View>
    );
};

export default Index;
