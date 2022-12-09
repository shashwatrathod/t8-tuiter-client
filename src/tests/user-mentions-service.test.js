import {
    createTuit,
    deleteTuit,
  } from "../services/tuits-service";
  import { createUser, deleteUser } from "../services/users-service";
  import { findUserMentioned } from "../services/usermentions-service";

  describe('test user mention themself', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check check user mention of @ellenripley';
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
            await deleteUser(userId);
            return deleteTuit(newTuit._id);
        }
    });

    test('user mention works when user mentions themselves', async () => {
        const tuitResponse = await findUserMentioned(userId);
        const arr =new Set()
        for( const [value] of Object.entries(tuitResponse)) {
            arr.add(value.tuit)
        }
        for (const mention in arr.values){
            expect(mention).toContain('@ellenripley')
        }
            
    });
});

describe('test user mentioned by another user', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const pipley = {
        firstName: "wellen",
        lastName: "pipley",
        username: 'wellenpipley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check check user mention of @wellenpipley';
    const tuitText2 = ' @wellenpipley got mentioned again!';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let userId2;
    let newUser;
    let newUser2;
    let newTuit;
    let newTuit2;
    const tuit = {
        tuit: tuitText,
        postedOn: currDate,
        postedBy: newUser,
    }
    const tuit2 = {
        tuit: tuitText2,
        postedOn: currDate,
        postedBy: newUser,
    }
    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
        newUser = await createUser(pipley);
        userId2 = newUser2._id;
        newTuit = await createTuit(userId, tuit);
        
        newTuit2 = await createTuit(userId, tuit2);

    });

    afterEach(async () => {
        while(userId && userId2) {
            await deleteUser(userId);
            await deleteUser(userId2)
            return deleteTuit(newTuit._id) && deleteTuit(newTuit2._id);
        }
    });

    test('user mention works when another user mentions someone else', async () => {
        const tuitResponse = await findUserMentioned(userId2);
        const arr =new Set()
        for( const [value] of Object.entries(tuitResponse)) {
            arr.add(value.tuit)
        }
        for (const mention in arr.values){
            expect(mention).toContain('@wellenpipley')
        }
            
    });
});

describe('test user can be mentioned only if they have registered on app', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const pipley = {
        firstName: "wellen",
        lastName: "pipley",
        username: 'wellenpipley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check check user mention of @wellenpipley';
    const tuitText2 = ' @wellenpipley got mentioned again!';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let userId2;
    let newUser;
    let newUser2;
    let newTuit;
    let newTuit2;
    const tuit = {
        tuit: tuitText,
        postedOn: currDate,
        postedBy: newUser,
    }
    const tuit2 = {
        tuit: tuitText2,
        postedOn: currDate,
        postedBy: newUser,
    }
    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
        // newUser2 = await createUser(pipley);
        userId2 = pipley._id;
        newTuit = await createTuit(userId, tuit);
        
        newTuit2 = await createTuit(userId, tuit2);

    });

    afterEach(async () => {
        while(userId && userId2) {
            await deleteUser(userId);
            // await deleteUser(userId2)
            return deleteTuit(newTuit._id) && deleteTuit(newTuit2._id);
        }
    });

    test('user mention works only when mentioned user is registered on app', async () => {
        const tuitResponse = await findUserMentioned(userId2);
        const arr =new Set()
        for( const [value] of Object.entries(tuitResponse)) {
            arr.add(value.tuit)
        }
        for (const mention in arr.values){
            expect(mention).toBeNull()
        }
            
    });
});