const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class User {
  async createUser(userData) {
    return await prisma.user.create({
     data: userData
    });
  }

  async currentUser(username) {
    return await prisma.user.findFirst({
      where:{
        username: username,
      }
    })
  }

  async currentUserToken(refreshToken) {
    return await prisma.token.findFirst({
      where: {
        refreshToken: refreshToken
      }
    });
  }
  
}

class Token {
  async savetoken(userId, refreshToken) {
    return await prisma.token.upsert({
      where: {
        userId: userId
      },
      update: {
        refreshToken: refreshToken
      },
      create: {
        refreshToken: refreshToken,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  async deleteRefreshToken(refreshToken) {
    return await prisma.token.delete({
      where: {
        refreshToken: refreshToken
      }
    })
  }
}

class People {
  async createPeople(personData) {
    return await prisma.people.create({
      data: personData
    });
  }

  async readPeople(userId) {
    return await prisma.people.findMany({
      where: {
        userId: userId
      }
    });
  }

  async updatePeople(id, personData) {
    return await prisma.people.update({
      where: {
        id: id
      },
      data: personData
    });
  }

  async deletePeople(id) {
    return await prisma.people.delete({
      where: {
        id
      }
    });
  }
}

const userMethods = new User();
const tokenMethods = new Token();
const peopleMethods = new People();

module.exports = {
  userMethods,
  tokenMethods,
  peopleMethods
}