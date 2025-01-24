import icons from '../app/constants/icons';
import { View, Text, Image } from 'react-native'
import { Models } from 'react-native-appwrite';

interface Props {
    item: Models.Document;
}

const Comment = ({ item }: Props) => {
    return (
        <View className='flex flex-col items-start bg-primary-100 rounded-2xl py-5 px-4'>
            <View className='flex flex-row items-center gap-4'>
                <Image source={{ uri: item.avatar }} className="size-12 rounded-full"/>
                <Text className='text-xl font-rubik-bold text-black-300'>{item.name}</Text> 
            </View>

            <View className='flex flex-col mt-2'>
                <Text className='text-lg font-rubik-regular text-black-300'>
                    {item.review}
                </Text>

                <View className='flex flex-row items-center justify-between mt-2 w-full'>
                    <View className='flex flex-row items-center gap-2'>
                        <Image source={icons.heart} className="size-5" tintColor={"#0061FF"}/>
                        <Text className='text-sm font-rubik-bold text-black-300'>{item.rating}</Text>
                    </View>
                    <Text className='text-sm font-rubik text-black-200 mt-3'>
                        {new Date(item.$createdAt).toDateString()}
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default Comment