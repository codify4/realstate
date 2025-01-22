import icons from '@/app/constants/icons'
import SettingsItem from '@/components/settings-item'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if(result) {
      Alert.alert("Success", "You have been logged out");
      refetch();
    }
    else {
      Alert.alert("Error", "Failed to logout");
    }
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5' />
        </View>

        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{ uri: user?.avatar }} className='w-40 h-40 rounded-full' />
            <TouchableOpacity className='absolute bottom-11 right-0'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>

            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10 py-5 gap-5 border-t border-b border-t-primary-100 border-b-primary-100'>
          <SettingsItem title='My Bookings' icon={icons.calendar} />
          <SettingsItem title='Payments' icon={icons.wallet} />
        </View>

        <View className='flex flex-col gap-5 mt-10'>
          <SettingsItem title='Profile' icon={icons.person} />
          <SettingsItem title='Notifications' icon={icons.bell} />
          <SettingsItem title='Security' icon={icons.shield} />
          <SettingsItem title='Language' icon={icons.language} />
          <SettingsItem title='Help Center' icon={icons.info} />
          <SettingsItem title='Invite Friends' icon={icons.people} />
        </View>

        <View className='flex flex-col mt-16 border-t border-t-primary-100 pt-5'>
          <SettingsItem title='Logout' icon={icons.logout} onPress={handleLogout} showArrow={false} textStyle='text-danger' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile