import { facilities } from '@/app/constants/data'
import icons from '@/app/constants/icons'
import images from '@/app/constants/images'
import Comment from '@/components/comment'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Platform, FlatList } from 'react-native'

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
        <View className='bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 bg-white"
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
                                <Image source={icons.send} className="size-7" tintColor={'#191d31'}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='mx-5 mt-10'>
                    <Text className='text-3xl font-rubik-bold'>{property?.name}</Text>
                    <View className='flex flex-row items-center gap-6 mt-3'>
                        <View className='bg-primary-100 rounded-full px-4 py-2'>
                            <Text className='text-sm font-rubik-bold text-primary-300'>{property?.type.toUpperCase()}</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center gap-1'>
                            <Image source={icons.star} className="size-6"/>
                            <Text className='text-base font-rubik-bold text-black-100'>{property?.rating} ({property?.reviews.length} reviews)</Text>
                        </View>
                    </View>
                    <View className='flex flex-row items-center justify-between gap-6 mt-5 mx-3'>
                        <View className='flex flex-row items-center justify-center gap-3'>
                            <Image source={icons.bed} className="size-6"/>
                            <Text className='text-lg font-rubik-bold text-black-300'>{property?.bedrooms} Beds</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center gap-3'>
                            <Image source={icons.bath} className="size-6"/>
                            <Text className='text-lg font-rubik-bold text-black-300'>{property?.bathrooms} Baths</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center gap-3'>
                            <Image source={icons.area} className="size-6"/>
                            <Text className='text-lg font-rubik-bold text-black-300'>{property?.area} sqft</Text>
                        </View>
                    </View>
                </View>

                <View className='mx-5 mt-10'>
                    <Text className='text-2xl font-rubik-bold text-black-300'>Agent</Text>
                    <View className='flex flex-row items-center justify-between gap-3 mt-3'>
                        <View className='flex flex-row items-center gap-3'>
                            <Image source={{ uri: property?.agent?.avatar }} className="size-20 rounded-full"/>
                            <View>
                                <Text className='text-lg font-rubik-bold text-black-300'>{property?.agent?.name}</Text>
                                <Text className='text-base font-rubik-regular text-black-300'>Owner</Text>
                            </View>
                        </View>
                        <View className='flex flex-row gap-5'>
                            <TouchableOpacity>
                                <Image source={icons.chat} className="size-8"/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={icons.phone} className="size-8"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View>
                    <Text className='text-2xl font-rubik-bold text-black-300 mx-5 mt-10'>Overview</Text>
                    <Text className='text-lg font-rubik-regular text-black-300 mx-5 mt-3'>{property?.description}</Text>
                </View>

                <View>
                    <Text className='text-2xl font-rubik-bold text-black-300 mx-5 mt-10'>Facilities</Text>
                    {property?.facilities.length > 0 && (
                        <View className='flex flex-row flex-wrap items-center justify-start mt-4 gap-5 mx-5'>
                            {property?.facilities.map((item: string, index: number) => {
                                const facility = facilities.find(
                                    (facility) => facility.title === item
                                );

                                return (
                                    <View
                                        key={index}
                                        className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                                    >
                                        <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                                            <Image
                                                source={facility ? facility.icon : icons.info}
                                                className="size-6"
                                            />
                                        </View>
                
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            className="text-black-300 text-sm text-center font-rubik mt-1.5"
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </View>

                {property?.gallery.length > 0 && (
                    <View className='mx-5'>
                        <Text className='text-2xl font-rubik-bold text-black-300 mt-10'>Gallery</Text>
                        <FlatList
                            data={property?.gallery}
                            keyExtractor={(item) => item.$id}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.image }} className="size-40 rounded-2xl" />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                            contentContainerClassName="flex gap-4 mt-3"
                            bounces={false}
                        />
                    </View> 
                )}

                <View className='mx-5'>
                    <Text className='text-2xl font-rubik-bold text-black-300 mt-10'>Location</Text>
                    <View className='mt-3 mb-5 flex flex-row items-center gap-3'>
                        <Image source={icons.location} className="size-6"/>
                        <Text className='text-black-200 text-base font-rubik-medium'>{property?.address}</Text>
                    </View>
                    <Image source={images.map} className="w-full h-60 rounded-3xl" />
                </View>

                {property?.reviews.length > 0 && (
                    <View className='mx-5 mt-7'>
                        <View className='flex flex-row items-center justify-between'>
                            <View className='flex flex-row items-center gap-1'>
                                <Image source={icons.star} className="size-6"/>
                                <Text className='text-xl font-rubik-bold text-black-300'>{property?.rating} ({property?.reviews.length} reviews)</Text>
                            </View>
                            <Text className='text-lg font-rubik-bold text-primary-300 mt-3'>See all</Text>
                        </View>

                        <View className='mt-5 gap-3'>
                            {property?.reviews.map((item: any, index: number) => (
                                <Comment key={index} item={item} />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}
export default Properties