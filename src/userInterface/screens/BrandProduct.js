import React, { useEffect, useState } from 'react'
import ProductsLobby from '../components/ProductSearch/ProductLobby'
import { useParams } from 'react-router-dom'
import { postData } from '../../backendservices/FetchNodeServices'

export default function BrandProduct() {
    const [brandProduct, setBrandProduct] = useState([])
    const { brandid } = useParams()


    async function fetchProductByBrand() {
        const response = await postData("userinterface/fetch_product_by_brand", { brandid })
        if (response.status) {
            setBrandProduct(response.data)
        }

    }


    useEffect(() => {
        fetchProductByBrand()
        window.scrollTo(0, 0)
    }, [])

    if (brandProduct.length == 0) {
        return (
            <div style={{ textAlign: "center", minHeight: "100vh", color: "white", marginTop: 20, fontSize: 30 }}>
                No Product found
            </div>
        )
    }
    return (
        <div style={{ padding: "15px 0" }}>
            <ProductsLobby data={brandProduct} />
        </div>
    )
}
