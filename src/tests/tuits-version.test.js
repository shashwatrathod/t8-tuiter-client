/**
 * to test: 
 * v is 1 when new tuit posted
 * v is updated after edit tuit
 * tuit versions has just prev versions of tuit
 * get all versions return all versions plus current tuit.
 */
 import {
    createTuit,
    deleteTuit,
    editTuit,
    findTuitById,
    getVersions,
  } from "../services/tuits-service";
  import { createUser, deleteUser } from "../services/users-service";

  describe('test initial version', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check creation';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let newUser;
    let newTuit;
    const tuit = {
        tuit: tuitText,
        postedOn: currDate,
        postedBy: newUser,
    }
    

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
        newTuit = await createTuit(userId, tuit);
        console.log("in before", newUser,newTuit)

    });

    afterEach(async () => {
        // return deleteTuit(tuit._id) && deleteUsersByUsername(ripley.username);
        while(userId) {
            return deleteTuit(newTuit._id);
        }
        await deleteUser(ripley._id);
        // await deleteUsersByUsername(ripley.username);
    });

    test('tuit version is 1 when tuit is created', async () => {
        let tuitVersion = 1
        const tuitResponse = await findTuitById(newTuit._id);
        expect(tuitResponse.v).toEqual(tuitVersion);
    });
});

describe('test version update', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check creation';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let newUser;
    let newTuit;
    const tuit = {
        tuit: tuitText,
        postedOn: currDate,
        postedBy: newUser,
    }
    

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
        newTuit = await createTuit(userId, tuit);
        console.log("in before", newUser,newTuit)

    });

    afterEach(async () => {
        while(userId) {
            return deleteTuit(newTuit._id);
        }
        await deleteUser(ripley._id);
    });

    test('tuit version is 2 when tuit is edited', async () => {
        const newVersion = await editTuit(newTuit._id)
        const tuitResponse = await findTuitById(newTuit._id);
        expect(tuitResponse.v).toBe(2);
    });
});

describe('get All versions of tuits returns all the versions of the tuit', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check creation';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let newUser;
    let newTuit;
    const tuit = {
        tuit: tuitText,
        postedOn: currDate,
        postedBy: newUser,
    }
    

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
        newTuit = await createTuit(userId, tuit);
    });

    afterEach(async () => {
        while(userId) {
            return deleteTuit(newTuit._id);
        }
        await deleteUser(ripley._id);
    });

    test('tuit version is 2 when tuit is edited', async () => {
        let i = 6
        while ( i > 0) {
            await editTuit(newTuit._id)
            i=i-1
        }
        // const newVersion = await editTuit(newTuit._id)
        const tuitResponse = await getVersions(newTuit._id);
        expect(Object.keys(tuitResponse).length).toBe(7);
    });
});
