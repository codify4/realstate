import icons from '@/app/constants/icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'

type SettingsItemProps = {
    title: string;
    icon: any;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({ title, icon, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
    return (
      <TouchableOpacity 
        className='flex flex-row items-center justify-between'
        onPress={onPress}
      >
        <View className='flex flex-row items-center'>
          <Image source={icon} className='size-6' />
          <Text className={`text-lg font-rubik-medium ml-3 ${textStyle}`}>{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className='size-5' />}
      </TouchableOpacity>
    );
}

export default SettingsItem;