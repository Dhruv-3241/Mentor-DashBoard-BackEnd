const {
  MongoClient,
  ServerApiVersion,
  InsertOneResult,
  TSchema,
  Filter,
  UpdateOneResult,
  DeleteResult,
  WithId,
} = require("mongodb");
require("dotenv").config();
const uri = process.env.dbUrl;

class DB {
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.client.connect().then(() => {
      console.log("Connected to MongoDB");
    });
    this.db = this.client.db("mentordash");
  }

  /**
   * Description
   * @param {unknown} data
   * @param {string} collection
   * @returns {Promise<InsertOneResult<TSchema>>}
   */
  create(data, collection) {
    return this.db.collection(collection).insertOne(data);
  }

  /**
   * Description
   * @param {Filter<TSchema>} filter
   * @param {unknown} data
   * @param {string} collection
   * @returns {Promise<UpdateOneResult<TSchema>>}
   */
  update(filter, data, collection) {
    return this.db.collection(collection).updateOne(filter, { $set: data });
  }

  updatePush(filter, data, collection) {
    return this.db.collection(collection).updateOne(filter, { $push: data });
  }

  updatePull(filter, data, collection) {
    return this.db.collection(collection).updateOne(filter, {
      $pull: data,
    });
  }

  /**
   * Description
   * @param {{key:string}} data
   * @param {string} collection
   * @returns {boolean}
   */
  async has(data, collection) {
    return !!(await this.db.collection(collection).findOne(data));
  }

  /**
   * Description
   * @param {Filter<TSchema>} filter
   * @param {string} collection
   * @returns {DeleteResult}
   */
  delete(filter, collection) {
    return this.db.collection(collection).deleteOne(filter);
  }

  /**
   * Description
   * @param {Filter<TSchema>} filter
   * @param {string} collection
   * @returns {Promise<null | WithId<TSchema>>}
   */
  get(filter, collection) {
    return this.db.collection(collection).findOne(filter);
  }

  /**
   * Description
   * @param {Filter<TSchema>} filter
   * @param {string} collection
   * @returns {Promise<null | TSchema[]>}
   */
  getAll(filter, collection) {
    if(!filter) return this.db.collection(collection).find().toArray();
    return this.db.collection(collection).find(filter).toArray();
  }

  /**
   * Description
   * @returns {Promise<void>}
   */
  close() {
    this.client.close();
  }
}

const db = new DB();
module.exports = db;

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     //console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(//console.dir);
