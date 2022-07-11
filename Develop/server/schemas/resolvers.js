const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            
        }
    },
    Mutation: {
        addUser: async(parent, args) => {

        },
        login: async(parent, args, context) => {

        },
        saveBook: async(parent, args, context) => {

        },
        deleteBook: async(parent, args, context) => {

        }
    }
}

module.exports = resolvers