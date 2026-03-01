import { Button } from "@mui/material";
import DateFilter from "./ordersBydate";
export default function Options({ setSelectedDay ,setOrders}) {
    const handleClick = (type) => {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        switch (type) {
            case "All":
                setSelectedDay({ type, date: null });
                break;
            case "Today":
                setSelectedDay({ type, date: today });
                break;
            case "Yesterday":
                setSelectedDay({ type, date: yesterday.toISOString().split("T")[0] });
                break;
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-around", margin: 4 }}>
            <Button variant="contained" sx={{ width: 140 }} onClick={() => handleClick("All")}>ALL</Button>
            <Button variant="contained" sx={{ width: 140 }} onClick={() => handleClick("Today")}>Today</Button>
            <Button variant="contained" sx={{ width: 140 }} onClick={() => handleClick("Yesterday")}>Yesterday</Button>
            <DateFilter setOrders={setOrders}/>
        </div>
    );
}
