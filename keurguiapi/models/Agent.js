// models/Agent.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const agentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  agentName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  nonAgence: { type: String, required: true},
    territoire: { type: String, required: true},
    langue: { type: String, required: true},
    photoProfil: { type: String, required: true},
});

// Avant de sauvegarder, hache le mot de passe
agentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode pour comparer les mots de passe
agentSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
