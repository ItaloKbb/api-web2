const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const createUser = async (userData) => {
  const { email, nome, bio, role, senha } = userData;

  if (!senha) {
    throw new Error('Senha é obrigatória');
  }

  const senhaSecreta = await bcrypt.hash(senha, 10);

  return prisma.user.create({
    data: {
      email,
      nome,
      bio,
      role,
      senha: senhaSecreta,
    },
  });
};

const getUser = async ({ id, nome, email }) => {
  if (id) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }
  if (nome) {
    return prisma.user.findMany({
      where: { nome: { contains: nome, mode: 'insensitive' } },
    });
  }
  if (email) {
    return prisma.user.findMany({
      where: { email: { contains: email, mode: 'insensitive' } },
    });
  }
  return prisma.user.findMany();
};

const updateUser = async (id, userData, token) => {
  if (!id) {
    throw new Error('User ID é necessário');
  }

  const decoded = jwt.verify(token, SECRET_KEY);
  if (decoded.role !== 'ADMIN') {
    throw new Error('Acesso negado. Somente administradores podem criar usuários.');
  }

  const senhaSecreta = await bcrypt.hash(userData.senha, 10);

  return prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      email: userData.email,
      senha: senhaSecreta,
      nome: userData.nome,
    },
  });
};

const login = async (email, senha) => {
  if (!email || !senha) {
    throw new Error('Email e senha são obrigatórios.');
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Não existe nenhuma conta com esse email!');
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    throw new Error('Senha incorreta!');
  }

  const tokenPayload = { userId: user.id, email: user.email, role: user.role };
  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '10h' });

  return { token, userId: user.id };
};

const validateToken = (token) => {
  if (!token) {
    throw new Error('Token não fornecido');
  }

  return jwt.verify(token, SECRET_KEY);
};

module.exports = { createUser, getUser, updateUser, login, validateToken };