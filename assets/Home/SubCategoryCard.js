import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

import ProductCard from '../Components/Products/Card';
import { dimensions } from '../Const/heightWidth';
import { globalStyle } from '../Components/Styles/GlobalStyles'
import { COLORS } from '../Const/color';
import { useNavigation } from '@react-navigation/native';

export default function SubCategoryCard(props) {
    const { subcategory } = props
    const { name, products } = subcategory;
    const navigation = useNavigation()
    let prod = products
    if (prod[prod.length - 1].card != "See More") {
        prod.push({
            card: "See More"
        })
    }


    const NoProductFound = () => {
        return (
            <View>
                <Text>No Product Found</Text>
            </View>
        )
    }

    return (
        <View>
            <Text style={{ fontSize: 19, fontWeight: '500', marginLeft: 5 }}>{name}</Text>
            <FlatList
                data={prod}
                ListEmptyComponent={<NoProductFound />}
                numColumns={2}
                style={{ paddingTop: 10 }}
                keyExtractor={({ _id }) => _id}
                renderItem={(item) => {
                    if (item.item.card !== "See More") {
                        return <ProductCard item={item.item} />
                    } else {
                        return <TouchableOpacity style={{
                            width: dimensions.width * 0.4,
                            height: dimensions.height * 0.2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...globalStyle.border,
                            borderRadius: 10,
                            marginHorizontal: 20,
                        }}
                            onPress={() => navigation.navigate('productbySC', {
                                name: subcategory.name,
                                id: subcategory._id
                            })}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.dPink }}>See More</Text>
                        </TouchableOpacity>
                    }
                }}
            />
        </View>
    )
}