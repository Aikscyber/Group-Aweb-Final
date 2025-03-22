const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://margotanimalguardian:MargotGuardian@cluster0.mrqh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => console.log(err));

// Define a Schema
const UserSchema = new mongoose.Schema({
    name: String,
    address: String
});

// Define a Model
const User = mongoose.model('User', UserSchema);

// API Routes
app.post('/api/saveUser', async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();
        res.send({ message: 'User saved successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getUsers', async (req, res) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
