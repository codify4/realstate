import { ActivityIndicator, SafeAreaView } from "react-native";
import { useGlobalContext } from "../../lib/global-provider";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    if(loading) {
        return(
            <SafeAreaView className="bg-white h-full flex items-center justify-center">
                <ActivityIndicator size="large" className="text-primary-300"/>
            </SafeAreaView>
        );
    }

    if(!isLoggedIn) return <Redirect href="/sign-in" />

    return <Slot />;
}