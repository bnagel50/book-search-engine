const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                return { userData }
            }
            throw new AuthenticationError('User or email not found')
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({email})
            if (!user) {
                throw  new AuthenticationError('No e-mail found')
            }
            const correctPassword = await user.isCorrectPassword(password)
            if (!correctPassword) {
                throw new AuthenticationError('Wrong password')
            }
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async(parent, { bookData }, context) => {
            if(context.user) {
                const userData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {$push: { savedBooks: bookData }},
                    { new: true }
                )
                return userData
            }
        },
        deleteBook: async(parent, args, context) => {

        }
    }
}

module.exports = resolvers