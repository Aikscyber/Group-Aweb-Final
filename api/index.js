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

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    database = client.db(DATABASENAME); // ✅ Use the existing database
    console.log(`✅ Connected to existing MongoDB database: ${DATABASENAME}`);
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ================= ROUTES =================

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

// 🔹 Delete a Contact
app.delete("/contacts/DeleteContacts", async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    let result = await database.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Start server
app.listen(5038, () => {
  console.log("🚀 API Server running on http://localhost:5038");
});
