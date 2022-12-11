import {
  createTuit,
  deleteTuit,
  findAllTuits,
  findTuitById,
} from "../services/tuits-service";
import { createUser, deleteUser } from "../services/users-service";

describe("test tuit service", () => {
  let author = null;

  const ripley = {
    username: "ellenripley",
    password: "lv426",
    email: "ellenripley@aliens.com",
  };

  beforeAll(async () => {
    author = await createUser(ripley);
  });

  afterAll(async () => {
    return deleteUser(author._id);
  });

  describe("can create tuit with REST API", () => {
    test("can post a tuit", async () => {
      const tuit = {
        tuit: "hello test",
      };

      const createdTuit = await createTuit(author._id, tuit);

      expect(createdTuit.tuit).toEqual(tuit.tuit);
      expect(createdTuit.postedBy).toEqual(author._id);

      deleteTuit(createdTuit._id);
    });
  });

  describe("can delete tuit wtih REST API", () => {
    let createdTuit = null;

    beforeEach(async () => {
      const tuit = {
        tuit: "hello test",
      };

      createdTuit = await createTuit(author._id, tuit);
    });

    test("can delete the tuit using tuit id", async () => {
      const deleteStatus = await deleteTuit(createdTuit._id);

      const deletedTuit = await findTuitById(createdTuit._id);

      expect(deletedTuit).toBeNull();
      expect(deleteStatus.deletedCount).toBe(1);
    });
  });

  describe("can retrieve a tuit", () => {
    let createdTuit = null;

    beforeAll(async () => {
      const tuit = {
        tuit: "hello test",
      };

      createdTuit = await createTuit(author._id, tuit);
    });

    afterAll(() => {
      deleteTuit(createdTuit._id);
    });

    test("can retrieve a tuit using tuit id", async () => {
      const retrievedTuit = await findTuitById(createdTuit._id);

      expect(retrievedTuit.tuit).toEqual(createdTuit.tuit);
      expect(retrievedTuit._id).toEqual(createdTuit._id);
      expect(retrievedTuit.postedBy._id).toEqual(createdTuit.postedBy);
      expect(retrievedTuit.postedOn).toEqual(createdTuit.postedOn);
    });
  });

  describe("can retrieve all tuits with REST API", () => {
    let createdTuits = [];

    beforeAll(async () => {
      const tuitTexts = ["tuit1", "tuit2", "tuit2"];

      createdTuits = await Promise.all(
        tuitTexts.map(async (tuit) => createTuit(author._id, { tuit }))
      );
    });

    afterAll(async () => createdTuits.map((tuit) => deleteTuit(tuit._id)));

    test("can retreive all created tuits", async () => {
      const allTuits = await findAllTuits();

      createdTuits.forEach((createdTuit) => {
        expect(
          allTuits.findIndex((tuit) => tuit._id === createdTuit._id)
        ).not.toBe(-1);
      });
    });
  });
});
