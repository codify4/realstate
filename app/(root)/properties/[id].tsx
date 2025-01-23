import icons from '@/app/constants/icons'
import images from '@/app/constants/images'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'

const Properties = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();

    const windowHeight = Dimensions.get("window").height;

    const { data: property, loading: propertyLoading } = useAppwrite({
      fn: getPropertyById,
      params: {
        id: id!,
      },
    })
    
    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 bg-white h-full"
            >
                <View className="relative w-full" style={{ height: windowHeight / 2 }}>
                    <Image source={{ uri: property?.image }} className='size-full' resizeMode='cover'/>
                    <Image source={images.whiteGradient} className="absolute top-0 w-full z-40"/>

                    <View 
                        className="z-50 absolute inset-x-7" 
                        style={{
                            top: Platform.OS === "ios" ? 70 : 20,
                        }}
                    >
                        <View className="flex flex-row items-center justify-between mt-5 w-full">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image source={icons.backArrow} className="size-5"/>
                            </TouchableOpacity>

                            <View className="flex flex-row items-center gap-5">
                                <Image
                                    source={icons.heart}
                                    className="size-7"
                                    tintColor={"#191D31"}
                                />
                                <Image source={icons.bell} className="size-7" tintColor={'#191d31'}/>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default Properties