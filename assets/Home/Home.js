import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { RefreshControl, View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { useHome } from '../Components/Hooks/homeHook';
import SubCategoryCard from './SubCategoryCard';

const Home = () => {
    const navigation = useNavigation()
    const { products, filterProd, isLoading, refreshing, onRefresh, search, searchProducts, NoProductFound } = useHome();

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="Search By SubCategory"

                onChangeText={(text) => searchProducts(text)}
                value={search}
            />

            {isLoading ? <ActivityIndicator size="large" color="#fof" /> : (

                <FlatList
                    data={filterProd}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<NoProductFound />}
                    style={{ paddingTop: 10 }}
                    keyExtractor={({ _id }) => _id}
                    renderItem={(item) => {
                        if (item.item) {
                            return <SubCategoryCard subcategory={item.item} refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    }
                    }
                />
            )}

        </View>
    )
}

export default Home