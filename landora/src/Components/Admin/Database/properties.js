// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('properties').insertMany([
    {
        PropertyId: 'P001',
        images: ['image1.jpg', 'image2.jpg'],
        name: 'Luxury Villa',
        size: '3500 sqft',
        address: '123 Palm Street, Beverly Hills',
        price: 2500000,
        status: 'For Sale'
    },
    {
        PropertyId: 'P002',
        images: ['image3.jpg', 'image4.jpg'],
        name: 'Modern Apartment',
        size: '1200 sqft',
        address: '456 Maple Avenue, New York',
        price: 850000,
        status: 'For Sale'
    },
    {
        PropertyId: 'P003',
        images: ['image5.jpg', 'image6.jpg'],
        name: 'Cozy Cottage',
        size: '800 sqft',
        address: '789 Oak Lane, Portland',
        price: 350000,
        status: 'Sold'
    },
    {
        PropertyId: 'P004',
        images: ['image7.jpg', 'image8.jpg'],
        name: 'Beach House',
        size: '2000 sqft',
        address: '321 Ocean Drive, Miami',
        price: 1500000,
        status: 'Reserved'
    },
    {
        PropertyId: 'P005',
        images: ['image9.jpg', 'image10.jpg'],
        name: 'Penthouse Suite',
        size: '2500 sqft',
        address: '654 Skyline Blvd, Chicago',
        price: 2000000,
        status: 'For Sale'
    },
    {
        PropertyId: 'P006',
        images: ['image11.jpg', 'image12.jpg'],
        name: 'Suburban Home',
        size: '1800 sqft',
        address: '987 Elm Street, Dallas',
        price: 450000,
        status: 'For Sale'
    },
    {
        PropertyId: 'P007',
        images: ['image13.jpg', 'image14.jpg'],
        name: 'Mountain Cabin',
        size: '1200 sqft',
        address: '123 Pine Trail, Denver',
        price: 600000,
        status: 'Reserved'
    },
    {
        PropertyId: 'P008',
        images: ['image15.jpg', 'image16.jpg'],
        name: 'Urban Loft',
        size: '900 sqft',
        address: '456 City Center, Seattle',
        price: 750000,
        status: 'For Sale'
    },
    {
        PropertyId: 'P009',
        images: ['image17.jpg', 'image18.jpg'],
        name: 'Country Estate',
        size: '5000 sqft',
        address: '789 Countryside Road, Austin',
        price: 3000000,
        status: 'Sold'
    },
    {
        PropertyId: 'P010',
        images: ['image19.jpg', 'image20.jpg'],
        name: 'Historic Mansion',
        size: '4000 sqft',
        address: '321 Heritage Lane, Boston',
        price: 4500000,
        status: 'For Sale'
    }
]);
