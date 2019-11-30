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
        text: `INSERT INTO users(fullname, email, password) VALUES ($1,$2,$3) RETURNING *;`,
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        console.log(e);
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

    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users WHERE email=$1",
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User  not found!";
      }
    },

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

    async getItemsForUser(id) {
      const queryItems = {
        text: "SELECT * FROM items WHERE ownerid=$1;",
        values: [id]
      };
      try {
        const items = await postgres.query(queryItems);
        return items.rows;
      } catch (e) {
        throw e;
      }
    },

    async getBorrowedItemsForUser(id) {
      const findBorrowId = {
        text: "SELECT * FROM items WHERE borrowid = $1",
        values: [id]
      };
      try {
        const items = await postgres.query(findBorrowId);
        return items.rows;
      } catch (e) {
        throw "Please try again!";
      }
    },

    async getTags() {
      try {
        const tags = await postgres.query("SELECT * FROM tags");
        if (tags.rows.length > 0) {
          return tags.rows;
        } else {
          throw null;
        }
      } catch (e) {
        throw e;
      }
    },

    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT A.id, A.title FROM itemtags INNER JOIN tags AS A ON A.id = tagid WHERE itemid = $1;`,
          values: [id]
        };
        const tags = await postgres.query(tagsQuery);

        if (tags.rows.length > 0) {
          return tags.rows;
        } else {
          return null;
        }
      } catch (e) {
        throw e;
      }
    },

    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const { title, description, tags } = item;

              const newItemQuery = {
                text: `INSERT INTO items(title, description, ownerid) VALUES ($1,$2,$3) RETURNING *;`,
                values: [title, description, user]
              };

              const newItem = await postgres.query(newItemQuery);

              const newItemid = newItem.rows[0].id;
              const tagRelationQuery = await tagsQueryString(
                tags,
                newItemid,
                ""
              );

              const ArrayTagId = tags.map(tag => {
                return tag.id;
              });

              const newTagQuery = {
                text: `INSERT INTO itemtags(tagid, itemid) VALUES${tagRelationQuery}`,
                values: ArrayTagId
              };

              await postgres.query(newTagQuery);

              client.query("COMMIT", err => {
                if (err) {
                  throw "Cannot commit";
                }
                done();
                console.log("---------------------------");
                console.log("DONE");
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw e;
              }
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
