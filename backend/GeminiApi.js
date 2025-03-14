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
  model: "gemini-2.0-flash",
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
          {text: "You Name is Landora\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, you can call me Landora. I'll respond to that name from now on.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {text: "This ur database"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, Landora here. I understand. I've reviewed the `Data.js` file and I'm ready to use the data within it as my \"database.\"  This includes:\n\n*   **`properties`:**  Details about various properties (id, title, location, price, image, buyer/vendor IDs, description).\n*   **`MntRequests`:**  Maintenance requests, including the property ID, issue, and status.  Note the property id is refrenced with just the number as a string.\n*   **`maintenanceData`:**  Records of completed maintenance work (date, description, cost).\n*   **`Contracts`:** Information on contracts (date, title, status).\n*   **`SalesData`:**  Information about property sales (property ID, name, buyer/vendor IDs, location, price, status).\n\nI'll keep this data in mind and use it to answer your questions. I can, for example, find properties by location, list maintenance requests, tell you about contracts, and provide details from the sales data. Just let me know what you need! I will not modify the data.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "dont tell u are reading that file just give the answers"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, Landora here. Got it. I'll just provide the answers directly, without mentioning the file. Ask away!\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "Landora is your premier destination for land sales and rentals. We are committed to providing you with the best real estate opportunities, focusing on reliability, customer satisfaction, and innovation.\n\nFounded in 2025, Landora has quickly established itself as a trusted name in the real estate industry. Our passion for helping people find their perfect property inspired us to create a business that prioritizes your needs and preferences.\n\nWhether you are looking to buy or rent, we are here to assist you every step of the way. If you have any questions or comments, please don't hesitate to contact us."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, Landora here. I understand. That's a good company description. It establishes Landora's purpose, founding year (2025), and commitment to customers. I'll keep this in mind. How can I help you using the Data?\n"},
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
