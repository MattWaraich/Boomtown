function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: "INSERT INTO users",
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },

    // GET USER AND PASSWORD FOR VERIFICATION
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users"
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "Please try again!";
      }
    },

    //GET USER BY ID but
    async getUserById(id) {
      const findUserId = {
        text: "SELECT * FROM users WHERE id=$1",
        values: [id]
      };
      try {
        const user = await postgres.query(findUserId);
        if (!user) throw "User ID was not found.";
        return user.rows[0];
      } catch (e) {
        throw "Please try again.";
      }
    },

    //GET ITEMS
    async getItems(idToOmit) {
      const itemQuery = {
        text: "SELECT * FROM items WHERE ownerid != $1",
        values: idToOmit ? [idToOmit] : []
      };
      try {
        const items = await postgres.query(itemQuery);
        return items.rows;
      } catch (e) {
        throw e;
      }
    },

    //GET ITEMS FOR USER
    async getItemsForUser(id) {
      const queryItems = {
        text: "SELECT id, fullname, items FROM users WHERE id=$1;",
        values: [id]
      };
      try {
        const items = await postgres.query(queryItems);
        return items.rows;
      } catch (e) {
        throw e;
      }
    },

    // GET BORROWED ITEMS FOR USER
    async getBorrowedItemsForUser(id) {
      const findBorrowId = {
        text: "GET * items WHERE borrowid = $1",
        values: [id]
      };
      try {
        const items = await postgres.query(findBorrowId);
        return items.rows;
      } catch (e) {
        throw "Please try again!";
      }
    },

    //GET TAGS
    async getTags(id) {
      const queryTags = {
        text: "SELECT * FROM tags",
        values: [itemTags]
      };
      try {
        const items = await postgres.query(queryTags);
        if (!tags) throw "Tags were not found.";
        return items.rows;
      } catch (e) {
        throw "Please try again!";
      }
    },

    //GET TAGS FOR ITEMS
    async getTagsForItem(id) {
      const tagsQuery = {
        text:
          "SELECT * FROM itemtags INNER JOIN tags ON itemtags.tagid = tags.tagid WHERE itemid = $1 ",
        values: [id]
      };
      try {
        const tags = await postgres.query(tagsQuery);
        if (!tags) throw "No item tags found.";
        return tags.rows;
      } catch (e) {
        throw "Please try again!";
      }
    },

    
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              const { newItem, description, tags } = item;

              // Generate new Item query
              // @TODO
              addItem(item){
                const newItem,
                id: boomtown.item.length + 1,
                title: item.title,
                imageurl: item.imageurl,
                description: item.description,
                itemowner: item.itemowner,
                tags: item.tags,
                created: item.created,
                borrower: item.user

              };
              boomtown.item.push(newItem);
              return newPerson;
            },

              // Insert new Item
              // @TODO
              // -------------------------------

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)
              // @TODO
              // -------------------------------

              // Insert tags
              // @TODO
              // -------------------------------

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                // Uncomment this resolve statement when you're ready!
                // resolve(newItem.rows[0])
                // -------------------------------
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};










/**
     *  @TODO: Advanced resolvers
     *
     *  The User GraphQL type has two fields that are not present in the
     *  user table in Postgres: items and borrowed.
     *
     *  According to our GraphQL schema, these fields should return a list of
     *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
     *
     */