// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('sales').insertMany([
    {
        SaleId: "S001",
        customerId: "C001",
        propertyID: "P001",
        name: "John Doe",
        VendorID: "V001",
        price: 250000,
        status: "Completed"
    },
    {
        SaleId: "S002",
        customerId: "C002",
        propertyID: "P002",
        name: "Jane Smith",
        VendorID: "V002",
        price: 300000,
        status: "Pending"
    },
    {
        SaleId: "S003",
        customerId: "C003",
        propertyID: "P003",
        name: "Alice Johnson",
        VendorID: "V003",
        price: 200000,
        status: "Completed"
    },
    {
        SaleId: "S004",
        customerId: "C004",
        propertyID: "P004",
        name: "Bob Brown",
        VendorID: "V004",
        price: 400000,
        status: "Cancelled"
    },
    {
        SaleId: "S005",
        customerId: "C005",
        propertyID: "P005",
        name: "Charlie Davis",
        VendorID: "V005",
        price: 150000,
        status: "Completed"
    },
    {
        SaleId: "S006",
        customerId: "C006",
        propertyID: "P006",
        name: "Diana Evans",
        VendorID: "V006",
        price: 350000,
        status: "Pending"
    },
    {
        SaleId: "S007",
        customerId: "C007",
        propertyID: "P007",
        name: "Ethan Harris",
        VendorID: "V007",
        price: 500000,
        status: "Completed"
    },
    {
        SaleId: "S008",
        customerId: "C008",
        propertyID: "P008",
        name: "Fiona Green",
        VendorID: "V008",
        price: 275000,
        status: "Pending"
    },
    {
        SaleId: "S009",
        customerId: "C009",
        propertyID: "P009",
        name: "George White",
        VendorID: "V009",
        price: 320000,
        status: "Completed"
    },
    {
        SaleId: "S010",
        customerId: "C010",
        propertyID: "P010",
        name: "Hannah Black",
        VendorID: "V010",
        price: 450000,
        status: "Cancelled"
    }
]);