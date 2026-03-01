
import { Reviews } from "@mui/icons-material";
import DropDowns from "../components/ProductSearch/dropdowns";
import ProductsLobby from "../components/ProductSearch/ProductLobby";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../backendservices/FetchNodeServices";
import { useEffect, useState } from "react";



export default function ProductSearchScreen() {
    const { search } = useParams()
    const [product, setProduct] = useState([])
    const fetchProduct = async () => {
        const response = await postData("userinterface/search", { search })
        if (response?.status) {
            setProduct(response.data)
        }
        else {
            setProduct([])
        }
    }
    console.log(product)
    useEffect(() => {
        fetchProduct()
        window.scrollTo(0, 0)
    }, [search])

    if (product.length === 0) {
        return (
            <div style={{ overflowX: 'hidden', background: '#191919', margin: 0, padding: 0, scrollbarWidth: 'none', height: '100vh' }}>
                <div style={{ fontWeight: 900, color: "white", padding: 25, fontSize: 28, textAlign: 'center' }}>
                    No results found for "{search}"
                </div>
            </div>
        )
    }
    return (
        <div style={{ overflowX: 'hidden', background: '#191919', margin: 0, padding: 0, scrollbarWidth: 'none' }}>

            <div style={{ fontWeight: 900, color: "white", padding: 25, fontSize: 28, maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", width: '100%' }}>
                <span>Result for</span>
                <span>"{search}"</span>
                <span style={{ fontWeight: 900, opacity: .5, fontSize: 18 }}> ({product.length})</span>

            </div>

            <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <DropDowns />
            </div>


            <div >
                <ProductsLobby data={product} />
            </div>


        </div>
    )
}