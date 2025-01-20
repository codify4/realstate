import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

const Properties = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Properties</Text>
        </View>
    )
}
export default Properties