const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { ObjectId } = require("mongodb");

const app = Express();
app.use(cors());
app.use(Express.json());

const CONNECTION_STRING = "mongodb+srv://margotanimalguardian:MargotGuardian@cluster0.mrqh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "MargotAnimalGuardian";

let database;

// ✅ Connect to MongoDB
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    database = client.db(DATABASENAME);
    console.log(`✅ Connected to MongoDB database: ${DATABASENAME}`);
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ================= CONTACT ROUTES =================

// 🔹 Get All Contacts
app.get("/contacts/GetContacts", async (req, res) => {
  try {
    let result = await database.collection("contacts").find({}).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// 🔹 Add a Contact
app.post("/contacts/AddContact", async (req, res) => {
  try {
    let newContact = req.body;
    let result = await database.collection("contacts").insertOne(newContact);
    res.json({ message: "Contact added!", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add contact" });
  }
});

// 🔹 Delete a Contact by Full Name
app.delete("/contacts/DeleteContacts", async (req, res) => {
  try {
    let fullName = req.query.name;
    if (!fullName) return res.status(400).json({ error: "Full Name is required" });

    let result = await database.collection("contacts").deleteMany({
      fullName: { $regex: new RegExp(`^${fullName}$`, "i") } // Case-insensitive match
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No matching contacts found" });
    }

    res.json({ message: `Deleted ${result.deletedCount} contact(s) for: ${fullName}` });
  } catch (error) {
    console.error("❌ Error deleting contacts:", error);
    res.status(500).json({ error: "Failed to delete contacts" });
  }
});

// ================= ANIMAL ADOPTION ROUTES =================

// 🔹 Submit Adoption Request
app.post("/adoptions/SubmitAdoption", async (req, res) => {
  try {
    let newAdoption = req.body;
    let result = await database.collection("adoptions").insertOne(newAdoption);
    res.json({ message: "Adoption request submitted!", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit adoption request" });
  }
});

// 🔹 Get All Adoption Requests
app.get("/adoptions/GetAdoptions", async (req, res) => {
  try {
    let result = await database.collection("adoptions").find({}).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch adoptions" });
  }
});

// 🔹 Delete an Adoption Request by Full Name
app.delete("/adoptions/DeleteAdoption", async (req, res) => {
  try {
    let fullName = req.query.name;
    if (!fullName) return res.status(400).json({ error: "Full Name is required" });

    let result = await database.collection("adoptions").deleteMany({
      fullName: { $regex: new RegExp(`^${fullName}$`, "i") } // ✅ Case-insensitive match
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No matching adoption requests found" });
    }

    res.json({ message: `Deleted ${result.deletedCount} adoption request(s) for: ${fullName}` });
  } catch (error) {
    console.error("❌ Error deleting adoption:", error);
    res.status(500).json({ error: "Failed to delete adoption request" });
  }
});



// Start server
app.listen(5038, () => {
  console.log("🚀 API Server running on http://localhost:5038");
});
