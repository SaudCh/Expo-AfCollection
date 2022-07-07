import React, { useEffect, useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import envs from "../../../Config/env"
import { COLORS } from '../../Const/color'
import { dimensions } from '../../Const/heightWidth'
import { Button } from 'react-native-paper'
import { SadIcon } from '../Icons/Icon'


export const useHome = () => {

    const [products, setProduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [filterProd, setFilterProd] = useState([]);
    const [search, setSearch] = useState("")

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `${envs.api}products/homepage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            // console.log(responseData)
            setProduct(responseData.data)
            setFilterProd(responseData.data)

            setLoading(false);
        } catch (err) {
            setLoading(false);

            let errs = {}
            errs.api = err.message || "Something went wrong, please try again."
            console.log(err.message)
        }
    }

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchProducts();
        return () => {

        }
    }, []);

    const searchProducts = (text) => {
        if (text) {
            var newProd = products.filter((val) => {
                console.log(val.name)
                const prodData = val.name ? val.name.toUpperCase() : ''.toUpperCase();
                const searchData = text.toUpperCase();

                return prodData.indexOf(searchData) > -1;
            })
            setFilterProd(newProd)
            setSearch(text)

        } else {
            setFilterProd(products)
            setSearch(text)
        }
    }
    const NoProductFound = () => {
        return (
            <View style={{
                height: dimensions.height * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <SadIcon size={150} color={COLORS.dPink} />
                <Text style={{ color: COLORS.dPink, fontSize: 22, marginBottom: 10 }}>Nothing Found</Text>
                <Text style={{ marginBottom: 10 }}>No items found</Text>
                <Button onPress={() => fetchProducts()} mode='contained' color={COLORS.dPink}>Refresh</Button>
            </View>
        )
    }

    return { products, filterProd, isLoading, refreshing, onRefresh, search, searchProducts, NoProductFound }
}