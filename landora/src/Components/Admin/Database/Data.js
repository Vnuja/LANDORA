const properties = [
    { id: 1, title: "Luxury Apartment", location: "New York", price: 500000, image: "apartment1.jpg" },
    { id: 2, title: "Beach House", location: "Los Angeles", price: 750000, image: "beachhouse.jpg" },
    { id: 3, title: "Modern Villa", location: "Miami", price: 950000, image: "villa.jpg" },
    { id: 4, title: "Country Cottage", location: "Texas", price: 300000, image: "cottage.jpg" },
    { id: 5, title: "Penthouse Suite", location: "Chicago", price: 1200000, image: "penthouse.jpg" },
    { id: 6, title: "Suburban House", location: "Seattle", price: 450000, image: "suburban.jpg" },
    { id: 7, title: "Downtown Loft", location: "San Francisco", price: 850000, image: "loft.jpg" },
    { id: 8, title: "Mountain Cabin", location: "Denver", price: 400000, image: "cabin.jpg" },
    { id: 9, title: "Lake House", location: "Orlando", price: 600000, image: "lakehouse.jpg" },
    { id: 10, title: "Historic Mansion", location: "Boston", price: 1500000, image: "mansion.jpg" },
    { id: 11, title: "Urban Condo", location: "Washington D.C.", price: 700000, image: "condo.jpg" },
    { id: 12, title: "Ranch Estate", location: "Dallas", price: 1100000, image: "ranch.jpg" },
    { id: 13, title: "Urban Estate", location: "Kaduwela", price: 1100000, image: "ranch.jpg" }
];

const sampleRequests = [
    { _id: '1', property: ' 1', issue: 'Leaky faucet', status: 'Pending' },
    { _id: '2', property: ' 2', issue: 'Broken window', status: 'In Progress' },
    { _id: '3', property: ' 3', issue: 'No hot water', status: 'Completed' },
    { _id: '4', property: ' 4', issue: 'Electrical issue', status: 'Pending' },
    { _id: '5', property: ' 5', issue: 'Pest control', status: 'In Progress' },
    { _id: '6', property: ' 6', issue: 'Roof leak', status: 'Pending' },
    { _id: '7', property: ' 7', issue: 'Broken door', status: 'Completed' },
    { _id: '8', property: ' 8', issue: 'Heating issue', status: 'Pending' },
    { _id: '9', property: ' 9', issue: 'Air conditioning issue', status: 'In Progress' },
    { _id: '10', property: ' 10', issue: 'Plumbing issue', status: 'Completed' },
];

const maintenanceData = [
    { id: 1, date: '2023-01-01', description: 'New Faucet', cost: 350 },
    { id: 2, date: '2023-02-15', description: 'Window Replacement', cost: 200 },
    { id: 3, date: '2023-03-10', description: 'A/C System Inspection', cost: 75 },
    { id: 4, date: '2023-04-05', description: 'Roof Repair', cost: 500 },
    { id: 5, date: '2023-05-20', description: 'Plumbing Fix', cost: 120 },
    { id: 6, date: '2023-06-15', description: 'Electrical Work', cost: 300 },
    { id: 7, date: '2023-07-10', description: 'Painting', cost: 250 },
    { id: 8, date: '2023-08-01', description: 'Garden Maintenance', cost: 80 },
    { id: 9, date: '2023-09-12', description: 'Pest Control', cost: 150 },
    { id: 10, date: '2023-10-05', description: 'HVAC Repair', cost: 400 },
    { id: 11, date: '2023-11-18', description: 'Flooring Replacement', cost: 600 },
    { id: 12, date: '2023-12-02', description: 'Gutter Cleaning', cost: 90 },
    { id: 13, date: '2024-01-15', description: 'Fence Repair', cost: 200 },
];

export { maintenanceData, properties, sampleRequests };
