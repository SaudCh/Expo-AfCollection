import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Button, Searchbar } from 'react-native-paper';
import { useHome } from '../Components/Hooks/homeHook';
import { useProdBySC } from '../Components/Hooks/useProdBySC';
import { SadIcon } from '../Components/Icons/Icon';
import ProductCard from '../Components/Products/Card';
import { COLORS } from '../Const/color';
import { dimensions } from '../Const/heightWidth';


export default function BySubCategory({ route }) {

    const { id } = route.params
    const { isLoading, refreshing, filterProd, onRefresh, searchProducts, search } = useProdBySC({ id })

    const NoProductFound = () => {
        return (
            <View style={{
                height: dimensions.height * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <SadIcon size={150} color={COLORS.dPink} />
                <Text style={{ color: COLORS.dPink, fontSize: 22, marginBottom: 10 }}>Nothing Found</Text>
                <Text style={{ marginBottom: 10 }}>No Product found</Text>
                <Button onPress={() => onRefresh()} mode='contained' color={COLORS.dPink}>Refresh</Button>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="Search"
                value={search}
                onChangeText={(text) => searchProducts(text)}
            />
            {isLoading ? <ActivityIndicator size="large" color="#fof" /> : (

                <FlatList
                    data={filterProd}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<NoProductFound />}
                    numColumns={2}
                    style={{ paddingTop: 10 }}
                    keyExtractor={({ _id }) => _id}
                    renderItem={(item) => (
                        <ProductCard item={item.item} />
                    )}
                />
            )}

        </View>
    )
}