import MaterialTable from "@material-table/core";

export function OrderTable({ data }) {
    const columns = [
        { title: 'Order No', field: 'Order No' },
        { title: 'Customer Name', field: 'Customer' },
        { title: 'Product', field: 'Product' },
        { title: 'Order Date', render: (rowData) => new Date(rowData['Order Date' ]).toLocaleDateString("en-GB")},
{ title: 'Price', field: 'Price' },
{ title: 'Quantity', field: 'Quantity' },
{ title: 'Total Amount', field: 'Total Amount' },
{ title: 'Payment Mode', field: 'Payment Mode' },
{ title: 'Payment Status', field: 'Payment Status' },

    ]

return (
        <MaterialTable style={{maxHeight:"500px",boxShadow:"none",  border: '1px solid,#38ada9', borderRadius: 5, padding: 10,overflow:"scroll"}}
  
        title="Orders Table"
        columns={columns}
        data={data}
        actions={[
            {
                position: "toolbar",
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
            }
        ]}
    />
)
}