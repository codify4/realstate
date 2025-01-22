import { categories } from '@/app/constants/data';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string}>();
    const [selecedCategory, setSelecedCategory] = useState(params.filter || 'All');
    
    const handleCategory = (category: string) => {
        if (selecedCategory === category) {
            setSelecedCategory('All');
            router.setParams({ filter: 'All' });
            return;
        } else {
            setSelecedCategory(category);
            router.setParams({ filter: category });
        }
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selecedCategory === category.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`}
                    onPress={() => handleCategory(category.category)}
                >
                    <Text className={`text-sm ${selecedCategory === category.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'}`}>{category.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
export default Filters