import { NativeBaseProvider } from "native-base";
import { VFC } from "react";
import Index from "./components";

const App: VFC = () => {
    return (
        <NativeBaseProvider>
            <Index />
        </NativeBaseProvider>
    );
};

export default App;
