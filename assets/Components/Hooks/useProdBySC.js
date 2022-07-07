import react, { useState, useEffect, useCallback } from 'react'
import envs from '../../../Config/env'
export const useProdBySC = (props) => {
    const { id } = props
    const [products, setProduct] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [filterProd, setFilterProd] = useState([]);
    const [search, setSearch] = useState("")

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `${envs.api}products`, {
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
            var data = responseData.data;
            if (id) {
                const newProd = data.filter((val) => {
                    return val.subCategory._id.toLowerCase().includes(id.toLowerCase())
                })
                setProduct(newProd)
                setFilterProd(newProd)
            } else {
                setProduct(data)
                setFilterProd(data)
            }


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
        setSearch("")
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const searchProducts = (text) => {
        if (text) {
            var newProd = products.filter((val) => {
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

    useEffect(() => {
        fetchProducts();
        return () => { }
    }, [id]);

    return { search, isLoading, refreshing, filterProd, onRefresh, searchProducts }
}