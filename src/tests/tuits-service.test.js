import {
  createTuit,
  deleteTuit,
  editTuit,
  findAllTuits,
  findTuitById,
  getVersions,
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
        tuit: "hello versions",
      };

      createdTuit = await createTuit(author._id, tuit);
    });

    test("can delete the tuit using tuit id", async () => {
      const deleteStatus = await deleteTuit(createdTuit._id);

      const deletedTuit = await findTuitById(createdTuit._id);

      expect(deletedTuit).toBeNull();
      expect(deleteStatus.some((status) => status.deletedCount === 1)).toBe(
        true
      );
    });

    test("deleting the original version of the tuit deletes all the versions", async () => {
      //first try editing the tuit a few times.
      const editedVersions = ["hello v2", "hello v3", "hello v4"];

      for (let i = 0; i < editedVersions.length; i++) {
        await editTuit(createdTuit._id, { tuit: editedVersions[i] });
      }

      const allVersions = await getVersions(createdTuit._id);

      // verify that the tuit was edited a correct number of times
      expect(Object.entries(allVersions).length).toBe(
        editedVersions.length + 1
      );

      await deleteTuit(createdTuit._id);

      const deletedVersions = await getVersions(createdTuit._id);

      expect(deletedVersions.length).toBe(0);
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

  describe("useer can edit a tuit", () => {
    let createdTuit = null;

    beforeAll(async () => {
      createdTuit = await createTuit(author._id, {
        tuit: "this is version 1 of the tuit",
      });
    });

    afterAll(async () => deleteTuit(createdTuit._id));

    test("any user can edit a tuit", async () => {
      let editedTuitText = "this is version 2 of the tuit";

      const retrievedOriginalTuit = await findTuitById(createdTuit._id);

      // verify that original tuit's version is 1 before making any edits.
      expect(retrievedOriginalTuit.v).toBe(1);

      // verify that original tuit's tuit text is still the same
      expect(retrievedOriginalTuit.tuit).toEqual(createdTuit.tuit);

      await editTuit(createdTuit._id, { tuit: editedTuitText });

      const retrievedEditedTuit = await findTuitById(createdTuit._id);

      // verify that edited tuit's version is 2
      expect(retrievedEditedTuit.v).toBe(2);

      // verify that edited tuit's tuit text is correct
      expect(retrievedEditedTuit.tuit).toEqual(editedTuitText);
    });
  });
});
