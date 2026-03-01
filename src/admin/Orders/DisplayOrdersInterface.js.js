import { useState, useEffect } from "react"
import { getAuthData, postAuthData } from "../../backendservices/FetchNodeServices"
import { OrderTable } from "./OrderTable";
import Options from "./Options";
import Swal from "sweetalert2";

export default function DisplayOrdersInterface() {
    const [selectedDay, setSelectedDay] = useState({ type: "All", date: null });
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        let response;

        if (selectedDay.type === "All") {
            response = await getAuthData("order/fetch-orders");
        }
        else if (selectedDay.type === "Today" || selectedDay.type === "Yesterday") {
            response = await postAuthData("order/fetch-orders-by-day", { orderDate: selectedDay.date });
        }
        if (response?.status) {
            setOrders(response.data);
        } else {
            Swal.fire({
                icon: "error",
                title: "display order",
                text: response.message,
                toast: true
            });
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedDay]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Options setSelectedDay={setSelectedDay} setOrders={setOrders} />
            <OrderTable data={orders} />
        </div>
    );
}
