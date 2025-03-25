const properties = [
    { id: 1, title: "Luxury Apartment", location: "New York", price: 500000, image: "apartment1.jpg", customerID:"C001", VendorID:"V001", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc." },
    { id: 2, title: "Cozy Cottage", location: "Los Angeles", price: 300000, image: "cottage1.jpg", customerID:"C002", VendorID:"V002", description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae." },
    { id: 3, title: "Modern House", location: "Chicago", price: 450000, image: "house1.jpg", customerID:"C003", VendorID:"V003", description: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus." },
    { id: 4, title: "Spacious Villa", location: "Miami", price: 750000, image: "villa1.jpg", customerID:"C004", VendorID:"V004", description: "Pellentesque in ipsum id orci porta dapibus." },
    { id: 5, title: "Urban Loft 1", location: "San Francisco", price: 600000, image: "loft1.jpg", customerID:"C005", VendorID:"V005", description: "Vivamus suscipit tortor eget felis porttitor volutpat." },
    { id: 6, title: "Urban Loft 2", location: "San Francisco", price: 650000, image: "loft1.jpg", customerID:"C005", VendorID:"V005", description: "Vivamus suscipit tortor eget felis porttitor volutpat." },
    { id: 7, title: "Urban Loft 3", location: "San Francisco", price: 500000, image: "loft1.jpg", customerID:"C0014", VendorID:"V005", description: "Vivamus suscipit tortor eget felis porttitor volutpat." },
    { id: 8, title: "Urban Loft 4", location: "San Francisco", price: 700000, image: "loft1.jpg", customerID:"C0015", VendorID:"V005", description: "Vivamus suscipit tortor eget felis porttitor volutpat." },
    { id: 5, title: "Urban Loft 5", location: "San Francisco", price: 900000, image: "loft1.jpg", customerID:"C0010", VendorID:"V011", description: "Vivamus suscipit tortor eget felis porttitor volutpat." },
    { id: 9, title: "Country House", location: "Austin", price: 350000, image: "countryhouse1.jpg", customerID:"C006", VendorID:"V006", description: "Nulla quis lorem ut libero malesuada feugiat." },
    { id: 10, title: "Beachfront Condo", location: "San Diego", price: 800000, image: "condo1.jpg", customerID:"C007", VendorID:"V007", description: "Proin eget tortor risus." },
    { id: 11, title: "Penthouse Suite", location: "Seattle", price: 900000, image: "penthouse1.jpg", customerID:"C008", VendorID:"V008", description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a." },
    { id: 12, title: "Suburban Home", location: "Denver", price: 400000, image: "suburbanhome1.jpg", customerID:"C009", VendorID:"V009", description: "Donec sollicitudin molestie malesuada." },
    { id: 13, title: "Downtown Studio", location: "Boston", price: 250000, image: "studio1.jpg", customerID:"C010", VendorID:"V010", description: "Cras ultricies ligula sed magna dictum porta." },
    { id: 14, title: "Historic Mansion", location: "Philadelphia", price: 1200000, image: "mansion1.jpg", customerID:"C011", VendorID:"V011", description: "Quisque velit nisi, pretium ut lacinia in, elementum id enim." },
    { id: 15, title: "Mountain Cabin", location: "Aspen", price: 550000, image: "cabin1.jpg", customerID:"C012", VendorID:"V012", description: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus." },
    { id: 16, title: "Lake House", location: "Lake Tahoe", price: 700000, image: "lakehouse1.jpg", customerID:"C013", VendorID:"V013", description: "Sed porttitor lectus nibh." }
];

const MntRequests = [
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

const Contracts = [
    { id: 1, date: '2025-03-01', title: 'Contract with Vendor A', status: 'Active' },
    { id: 2, date: '2025-03-05', title: 'Agreement for Sale #123', status: 'Pending' },
    { id: 3, date: '2025-03-10', title: 'Contract with Vendor B', status: 'Completed' },
];

const SalesData = [
    { id: 1, propertyID:1 ,name: "Sale 1", customerID:"C001", VendorID:"V001", location: "Location 1", price: "$1000", status: "Active" },
    { id: 2, propertyID:2 ,name: "Sale 2", customerID:"C002", VendorID:"V002", location: "Location 2", price: "$2000", status: "Archived" },
    { id: 3, propertyID:3 ,name: "Sale 3", customerID:"C003", VendorID:"V003", location: "Location 3", price: "$3000", status: "Completed" },
    { id: 4, propertyID:4 ,name: "Sale 4", customerID:"C004", VendorID:"V004", location: "Location 4", price: "$4000", status: "Active" },
    { id: 5, propertyID:5 ,name: "Sale 5", customerID:"C005", VendorID:"V005", location: "Location 5", price: "$5000", status: "Archived" },
    { id: 6, propertyID:6 ,name: "Sale 6", customerID:"C006", VendorID:"V006", location: "Location 6", price: "$6000", status: "Completed" },
    { id: 7, propertyID:7 ,name: "Sale 7", customerID:"C007", VendorID:"V007", location: "Location 7", price: "$7000", status: "Active" },
    { id: 8, propertyID:8 ,name: "Sale 8", customerID:"C008", VendorID:"V008", location: "Location 8", price: "$8000", status: "Archived" },
    { id: 9, propertyID:9 ,name: "Sale 9", customerID:"C009", VendorID:"V009", location: "Location 9", price: "$9000", status: "Completed" },
    { id: 10, propertyID:10 ,name: "Sale 10", customerID:"C010", VendorID:"V010", location: "Location 10", price: "$10000", status: "Active" },
    { id: 11, propertyID:11 ,name: "Sale 11", customerID:"C011", VendorID:"V011", location: "Location 11", price: "$11000", status: "Archived" },
    { id: 12, propertyID:12 ,name: "Sale 12", customerID:"C012", VendorID:"V012", location: "Location 12", price: "$12000", status: "Completed" },
    { id: 13, propertyID:13 ,name: "Sale 13", customerID:"C013", VendorID:"V013", location: "Location 13", price: "$13000", status: "Active" }
];

const vendors = [
    { VendorID: "V001", name: "John Doe", contact: "john.doe@example.com", phone: "123-456-7890" },
    { VendorID: "V002", name: "Jane Smith", contact: "jane.smith@example.com", phone: "234-567-8901" },
    { VendorID: "V003", name: "Michael Johnson", contact: "michael.johnson@example.com", phone: "345-678-9012" },
    { VendorID: "V004", name: "Emily Davis", contact: "emily.davis@example.com", phone: "456-789-0123" },
    { VendorID: "V005", name: "David Wilson", contact: "david.wilson@example.com", phone: "567-890-1234" },
    { VendorID: "V006", name: "Sarah Brown", contact: "sarah.brown@example.com", phone: "678-901-2345" },
    { VendorID: "V007", name: "James Taylor", contact: "james.taylor@example.com", phone: "789-012-3456" },
    { VendorID: "V008", name: "Jessica Martinez", contact: "jessica.martinez@example.com", phone: "890-123-4567" },
    { VendorID: "V009", name: "Daniel Anderson", contact: "daniel.anderson@example.com", phone: "901-234-5678" },
    { VendorID: "V010", name: "Laura Thomas", contact: "laura.thomas@example.com", phone: "012-345-6789" },
    { VendorID: "V011", name: "Robert Jackson", contact: "robert.jackson@example.com", phone: "123-456-7891" },
    { VendorID: "V012", name: "Linda White", contact: "linda.white@example.com", phone: "234-567-8902" },
    { VendorID: "V013", name: "William Harris", contact: "william.harris@example.com", phone: "345-678-9013" }
];

const vendorPropertyCount = vendors.map(vendor => {
    const propertyCount = properties.filter(property => property.VendorID === vendor.VendorID).length;
    return { ...vendor, propertyCount };
});

const customers = [
    { customerID: "C001", name: "Alice Johnson", contact: "alice.johnson@example.com", phone: "123-456-7890" },
    { customerID: "C002", name: "Bob Smith", contact: "bob.smith@example.com", phone: "234-567-8901" },
    { customerID: "C003", name: "Charlie Brown", contact: "charlie.brown@example.com", phone: "345-678-9012" },
    { customerID: "C004", name: "Diana Prince", contact: "diana.prince@example.com", phone: "456-789-0123" },
    { customerID: "C005", name: "Ethan Hunt", contact: "ethan.hunt@example.com", phone: "567-890-1234" },
    { customerID: "C006", name: "Fiona Gallagher", contact: "fiona.gallagher@example.com", phone: "678-901-2345" },
    { customerID: "C007", name: "George Clooney", contact: "george.clooney@example.com", phone: "789-012-3456" },
    { customerID: "C008", name: "Hannah Montana", contact: "hannah.montana@example.com", phone: "890-123-4567" },
    { customerID: "C009", name: "Ian Somerhalder", contact: "ian.somerhalder@example.com", phone: "901-234-5678" },
    { customerID: "C010", name: "Jack Sparrow", contact: "jack.sparrow@example.com", phone: "012-345-6789" },
    { customerID: "C011", name: "Karen Gillan", contact: "karen.gillan@example.com", phone: "123-456-7891" },
    { customerID: "C012", name: "Liam Neeson", contact: "liam.neeson@example.com", phone: "234-567-8902" },
    { customerID: "C013", name: "Megan Fox", contact: "megan.fox@example.com", phone: "345-678-9013" },
    { customerID: "C014", name: "Nina Dobrev", contact: "nina.dobrev@example.com", phone: "456-789-0124" },
    { customerID: "C015", name: "Oscar Isaac", contact: "oscar.isaac@example.com", phone: "567-890-1235" }
];

export { maintenanceData, properties, MntRequests, Contracts, SalesData, vendors, customers };

