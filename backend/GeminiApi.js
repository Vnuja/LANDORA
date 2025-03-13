const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);


async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

/**
 * Waits for the given files to be active.
 *
 * Some files uploaded to the Gemini API need to be processed before they can
 * be used as prompt inputs. The status can be seen by querying the file's
 * "state" field.
 *
 * This implementation uses a simple blocking polling loop. Production code
 * should probably employ a more sophisticated approach.
 */
async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".")
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name)
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [
    await uploadToGemini("../landora/src/Components/Admin/Database/Data.js", "text/javascript"),
  ];

  // Some files have a processing delay. Wait for them to be ready.
  await waitForFilesActive(files);

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {text: "This ur database\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand. The provided text is a JavaScript file (`Data.js`) that defines and exports several arrays of objects, simulating a database for a real estate or property management application.  Let's break down each of the arrays and their properties:\n\n**1. `properties`**\n\nThis array contains information about individual properties. Each object has the following keys:\n\n*   `id` (Number): A unique identifier for the property.\n*   `title` (String): A descriptive name for the property (e.g., \"Luxury Apartment\").\n*   `location` (String): The city or area where the property is located.\n*   `price` (Number): The price of the property (likely the listing or sale price).\n*   `image` (String): The filename of an image associated with the property (e.g., \"apartment1.jpg\").  This implies there would be an `images` folder or similar to hold these files.\n*   `buyerID` (String): An ID referencing the buyer of this property.  This suggests a separate `buyers` data structure (which isn't included in this file) would exist.\n*   `VendorID` (String): An ID referencing the vendor (seller) of this property.  This suggests a separate `vendors` data structure would exist.\n*   `description` (String): A longer text description of the property, including details.\n\n**Example:**\n\n```javascript\n{ id: 1, title: \"Luxury Apartment\", location: \"New York\", price: 500000, image: \"apartment1.jpg\", buyerID:\"B001\", VendorID:\"V001\", description: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.\" }\n```\n\n**2. `MntRequests` (Maintenance Requests)**\n\nThis array stores maintenance requests related to properties.\n\n*   `_id` (String):  A unique identifier for the maintenance request.  Using a string ID (e.g., '1') is slightly unusual; a number (1) would be more typical, or a UUID string for guaranteed uniqueness.\n*   `property` (String):  This *should* reference a property's `id` from the `properties` array.  However, it's currently storing a string representation of the property ID (e.g., \" 1\" instead of `1`). This is inconsistent and would cause problems when trying to join data.  It should be changed to match the `id` type in `properties`.\n*   `issue` (String): A brief description of the maintenance issue.\n*   `status` (String): The current status of the request (\"Pending\", \"In Progress\", \"Completed\").\n\n**Example:**\n\n```javascript\n{ _id: '1', property: ' 1', issue: 'Leaky faucet', status: 'Pending' }\n```\n\n**3. `maintenanceData`**\n\nThis array records details of completed maintenance work.\n\n*   `id` (Number): A unique identifier for the maintenance record.\n*   `date` (String): The date the maintenance was performed (in YYYY-MM-DD format).  It would be better to store this as a JavaScript `Date` object for easier date manipulation and comparison.\n*   `description` (String): A description of the work done.\n*   `cost` (Number): The cost of the maintenance.\n\n**Example:**\n\n```javascript\n{ id: 1, date: '2023-01-01', description: 'New Faucet', cost: 350 }\n```\n\n**4. `Contracts`**\n\nThis array stores information about contracts.\n\n*   `id` (Number): A unique identifier for the contract.\n*   `date` (String): The date of the contract (YYYY-MM-DD format). Again, a `Date` object would be preferable.\n*   `title` (String): A brief description or title of the contract.\n*   `status` (String): The status of the contract (\"Active\", \"Pending\", \"Completed\").\n\n**Example:**\n\n```javascript\n{ id: 1, date: '2025-03-01', title: 'Contract with Vendor A', status: 'Active' }\n```\n\n**5. `SalesData`**\n\nThis array tracks sales information.\n\n*   `id` (Number): A unique identifier for the sale record.\n*  `propertyID` (Number): The id that links to the properties array.\n*   `name` (String): A name for the sale (e.g., \"Sale 1\").  This seems a bit redundant, as the `propertyID` could be used to get more details.\n*   `buyerID` (String):  The ID of the buyer (should match a buyer in a separate, unprovided, `buyers` data structure).\n*   `VendorID` (String): The ID of the vendor (should match a vendor in a separate, unprovided, `vendors` data structure).\n*   `location` (String): The location of the property. This is redundant because it duplicates information already available in the `properties` array via the `propertyID`.\n*   `price` (String): The sale price.  This *should* be a Number, not a String, for calculations.  The \"$\" sign should be removed, and the data type changed.\n*   `status` (String): The status of the sale (\"Active\", \"Archived\", \"Completed\").\n\n**Example:**\n```javascript\n{ id: 1, propertyID:1 ,name: \"Sale 1\", buyerID:\"B001\", VendorID:\"V001\", location: \"Location 1\", price: \"$1000\", status: \"Active\" }\n```\n\n**Key Improvements and Considerations:**\n\n1.  **Data Type Consistency:**\n    *   `MntRequests.property`: Change to Number to match `properties.id`.\n    *   `SalesData.price`: Change to Number and remove the \"$\".\n    *   `date` fields in `maintenanceData` and `Contracts`:  Consider using `Date` objects instead of strings.\n\n2.  **Data Redundancy:**\n    *   `SalesData.location`: Remove this field.  Get the location from the `properties` array using `propertyID`.\n    *   `SalesData.name`:  Consider removing this, as it's not very informative.  The `id` or a combination of `propertyID` and other fields could be used to identify a sale.\n\n3.  **Relationships (Foreign Keys):**\n    *   `properties.buyerID` and `properties.VendorID` correctly reference external data (buyers and vendors, respectively).\n    *   `MntRequests.property` *should* reference `properties.id`.\n     *   `SalesData.propertyID` correctly references `properties.id`.\n    *   `SalesData.buyerID` and `SalesData.VendorID` correctly reference external data.\n\n4.  **Missing Data:**\n    *   There's no data for `buyers` or `vendors`.  To fully represent the relationships, you would need `buyers` and `vendors` arrays, with objects containing at least an `id` field (and likely other information like name, contact details, etc.).\n\n5. **Naming conventions:**\n  - `MntRequests` could better be written as `maintenanceRequests` to fully follow camelCase.\n\n**Example of Improved Data (Partial):**\n\n```javascript\nconst properties = [\n    { id: 1, title: \"Luxury Apartment\", location: \"New York\", price: 500000, image: \"apartment1.jpg\", buyerID: \"B001\", vendorID: \"V001\", description: \"Lorem ipsum...\" },\n    // ... other properties\n];\n\nconst maintenanceRequests = [\n    { _id: '1', propertyId: 1, issue: 'Leaky faucet', status: 'Pending' }, // Changed property to propertyId and type to Number\n    // ... other requests\n];\n\nconst maintenanceData = [\n    { id: 1, date: new Date('2023-01-01'), description: 'New Faucet', cost: 350 }, // Changed date to Date object\n    // ... other maintenance records\n];\n\nconst contracts = [\n    { id: 1, date: new Date('2025-03-01'), title: 'Contract with Vendor A', status: 'Active' }, // Changed date to Date object\n    // ... other contracts\n];\n\nconst salesData = [\n    { id: 1, propertyID: 1, buyerID: \"B001\", vendorID: \"V001\", price: 1000, status: \"Active\" }, // Removed location, name, and $ from price\n    // ... other sales records\n];\n\n// Example of how buyers and vendors might look:\nconst buyers = [\n  { id: \"B001\", name: \"John Doe\", contact: \"john.doe@example.com\" },\n  // ... other buyers\n];\n\nconst vendors = [\n  { id: \"V001\", name: \"Acme Realty\", contact: \"info@acmerealty.com\" },\n  // ... other vendors\n];\nexport { maintenanceData, properties, maintenanceRequests, contracts, salesData, buyers, vendors };\n\n```\n\nBy making these changes, the data would be more consistent, easier to work with, and less prone to errors. The use of `Date` objects and proper numeric types would enable easier calculations and comparisons. The removal of redundant fields would reduce data duplication and make the data model cleaner.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "how many properties do we have?\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "You have a total of **13** properties defined in the `properties` array within the `Data.js` file. I can tell this by counting the number of objects within that array.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "dont tell u are reading that file just give the answers only\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "13\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = await result.response.text(); // Await response text
  console.log(responseText);
  return responseText;

}

module.exports = run;
