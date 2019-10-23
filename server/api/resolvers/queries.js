const { ApolloError } = require("apollo-server");

const queryResolvers = app => ({
  viewer(parent, args, { users }, info) {
    const fakeUser = {
      id: 101,
      fullname: "Matt",
      bio: "cool guy",
      email: "Matt@matt.com"
    };
    return fakeUser;
  },
  async user(parent, { id }, { pgResource }, info) {
    try {
      const user = await pgResource.getUserById(id);
      return user;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async items(parent, { filter }, { pgResource }, info) {
    try {
      const items = await pgResource.getItems(filter);
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async tags(parent, args, { pgResource }, info) {
    try {
      const tags = await pgResource.getTags();
      return tags;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
});
module.exports = queryResolvers;
