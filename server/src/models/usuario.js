const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  dataCriacao: {
      type: Date,
      default: Date.now
  },
})

UsuarioSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

module.exports = Usuario = mongoose.model('usuario', UsuarioSchema)