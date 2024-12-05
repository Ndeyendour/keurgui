const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Importer le modèle User
const Agent = require('./models/Agent');
const Product = require('./models/product');

const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');  // Pour hacher les mots de passe
const Joi = require('joi');  // Pour valider les données
const cors = require('cors');
const path = require('path');
const app = express();
// Middleware
app.use(express.json());  // Permet de traiter les requêtes avec un corps JSON
app.use(cors());  // Permet de gérer les problèmes de CORS (Cross-Origin Resource Sharing)
app.use('/assets', express.static('assets'));

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/keurgui', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Validation des données de l'utilisateur
const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Password confirmation does not match password',
    }),
  });
  return schema.validate(user);
};

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());
app.use(cors());
// Middleware pour vérifier si l'utilisateur est admin
app.post('/agents', async (req, res) => {
  try {
    const { email, password, agentName, nonAgence, territoire, langue, photoProfil } = req.body;

    // Vérification que tous les champs sont fournis
    if (!email || !password || !agentName || !nonAgence || !territoire || !langue || !photoProfil) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Création d'un nouvel agent
    const newAgent = new Agent({
      email,
      password,
      agentName,
      nonAgence,
      territoire,
      langue,
      photoProfil
    });

    // Sauvegarde de l'agent dans la base de données
    await newAgent.save();

    // Réponse après succès
    res.status(201).json({ message: 'Agent créé avec succès', agent: newAgent });
  } catch (err) {
    console.error('Erreur lors de la création de l\'agent:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});
app.get('/agents', async (req, res) => {
  try {
    // Récupère tous les agents dans la base de données
    const agents = await Agent.find(); // Assurez-vous que "Agent" est bien défini comme modèle Mongoose

    // Vérifiez si des agents existent
    if (!agents || agents.length === 0) {
      return res.status(404).json({ message: 'Aucun agent trouvé.' });
    }

    // Retourne la liste des agents
    res.status(200).json(agents);
  } catch (err) {
    console.error('Erreur lors de la récupération des agents:', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

app.post('/admin', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Créer une nouvelle instance du modèle Admin
    const newAdmin = new Admin({ email, password, fullName });

    // Sauvegarder l'administrateur dans la base de données
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully!', admin: newAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create admin', details: err.message });
  }
});
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'agent') {
      user = await Agent.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ message: 'User not found' });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//           expiresIn: '1d',
//       });

//       res.json({ token, role: user.role });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

const validateRegister = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').optional(),
  });

  return schema.validate(data);
};
// Route pour s'inscrire
app.post('/api/register', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    // Vérifier si un utilisateur avec cet email existe déjà
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec firstname et lastname
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    // Retourner une réponse de succès avec les informations de l'utilisateur
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});




// Endpoint pour la connexion des utilisateurs
// Endpoint pour la connexion des utilisateurs, agents et admins
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher l'utilisateur, l'agent ou l'admin par email
    let user = await User.findOne({ email }) || await Agent.findOne({ email }) || await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Comparer les mots de passe (hashé et en clair)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Si tout est bon, renvoyer les informations de l'utilisateur et son rôle
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role || (user.agentName ? 'agent' : 'admin'), // Détecter le rôle (agent ou admin)
        fullName: user.fullName || user.firstname + ' ' + user.lastname,  // Nom complet si disponible
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});





// Routes pour les produits
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { 
      title, 
      price, 
      transactionType, 
      productType, 
      address, 
      city, 
      features, 
      image, // Une seule image
      buildingDetails, 
      isVirtualTourAvailable, 
      isOpenHouse, 
      lotSize, 
      description, 
      agentName, 
      moveInDate, 
      isForeclosure 
    } = req.body;

    // Validation des champs requis
    if (!title || !price || !transactionType || !productType || !address || !city || !agentName || !image) {
      return res.status(400).json({
        message: 'Certains champs requis sont manquants.',
      });
    }

    // Création d'une nouvelle propriété
    const newProduct = new Product({
      title,
      price,
      transactionType,
      productType,
      address,
      city,
      features: {
        bedrooms: features?.bedrooms || 0,
        bathrooms: features?.bathrooms || 0,
        parkingSpaces: features?.parkingSpaces || 0,
        garages: features?.garages || 0,
        area: features?.area || null,
        lotSize: features?.lotSize || null,
        hasPool: features?.hasPool || false,
        isWheelchairAccessible: features?.isWheelchairAccessible || false,
        isWaterfront: features?.isWaterfront || false,
        hasNavigableWater: features?.hasNavigableWater || false,
        allowsPets: features?.allowsPets || false,
        allowsSmoking: features?.allowsSmoking || false,
      },
      image, // Ajout de l'image (une seule URL)
      buildingDetails: {
        yearBuilt: buildingDetails?.yearBuilt || null,
        isNewConstruction: buildingDetails?.isNewConstruction || false,
        isHistorical: buildingDetails?.isHistorical || false,
        structureType: buildingDetails?.structureType || 'Plain-pied',
      },
      isVirtualTourAvailable: isVirtualTourAvailable || false,
      isOpenHouse: isOpenHouse || false,
      lotSize,
      description,
      agentName,
      moveInDate: moveInDate || null,
      isForeclosure: isForeclosure || false,
    });

    // Sauvegarde dans MongoDB
    await newProduct.save();

    res.status(201).json({
      message: 'Propriété créée avec succès',
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Erreur lors de la création de la propriété',
      error: error.message,
    });
  }
});



// Démarrer le serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});