# Tuiter

Welcome to the React based web application for Tuiter. This project is an extension of Jose Annunziato's [Tuiter](https://github.com/jannunzi/software-engineering-react-fa22). Tuiter is a space for users to interact across the globe while sharing their thoughts, opinions, and news on events happening worldwide. In adition to features like the ability of a user to create a tuit and like-dislike other tuits, follow other users and view their tuits and send messages to one another, this extension adds a few extra features.

Currently, Tuiter allows users to post tuits that can be freely viewed by others but editing them isn't supported yet. This can cause some serious confusion, leave out additional facts learned over a timespan in case of current issues posted, and propagate misinformation if the author of this tuit made mistake while writing it. Our work allows users to edit tuits after they are posted. Edited tuits have a mark on them, thereby letting readers know that the tuit was edited.

However, while mere editing of a tuit does add some sense of flexibility and transparency, its value can be further increased if the version history is also available to be viewed. Therefore, our version of Tuiter also allows users to track the changes that a parent tuit has undergone with each edit. This gives us a solid way for users to track each iteration their tuit underwent.

A key aspect of Tuiter (or any other social media platform) is the way users interact with each other. Unlike most popular social media platforms, currently Tuiter does not permit a user to tag or mention other users in their tuits. We change that. A user is now able to mention other users in their tuits. Profiles of the tagged users can be accessed by simply clicking on the tag in tuit’s text. There is also a “Mentions” tab to a user’s profile page so that anyone viewing another user’s profile can easily go through the tuits that the user is mentioned in.


## Setting up a local development environment

1. This is a react-based web application for Tuiter that communicates with a node-based web serivce to display data. Make sure that the [Tuiter web service](https://github.com/shashwatrathod/t8-tuiter-server) is up and running.
2. [Download and install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) `node` and `npm`.
3. Clone this repository `
git clone https://github.com/shashwatrathod/t8-tuiter-client
`.
4. Open a terminal inside `t8-tuiter-client` directory.
5. Run `npm install`. This shall install all the necessary packages.
6. Follow these [instructions](#setting-up-environment-variables) to set up environment variables.
7. Run `npm start`.
8. Additionally, you can also run `npm test` to run automated tests on the code.

## Using the new features

### Editing a tuit
1. Login to Tuiter using your username and password.
2. Create a tuit.
3. You shall notice that every tuit authored by you has an edit button (pencil icon) next the like and dislike buttons.
4. Clicking on the icon will redirect you to a page where you can edit the tuit to your liking.
5. Click on the submit button to finalize your changes.
6. You will be taken back to the page you navigated out from. You will notice that the tuit has been updated with the new edits.

### Seeing version history of a tuit
1. If a tuit is edited, you shall see a pencil icon next to the tuit.
2. Clicking on the pencil icon will take you to a page where you will find all versions, including the previous ones in a list form. The list contains details about the version number of each version (the original tuit being version 1), tuit's text itself, and the timestamp at which the tuit was edited/created.

### Mentioning a user in a tuit
1. To mention a user in a tuit, simply write the username of the said user prefixed with an '@' while creating the tuit. e.g. "I want to mention a user with username @sanjanadabbiru in this tuit."
2. If the said user actually exists, the tuit will be linked to the mentioned user's profile.
3. Currently, you don't need to follow the other user in order to mention them in a tuit. 
4. In sanjanadabbiru's profile, navigate to the "Mentions" tab in order to see a list of all the tuits this user was mentioned in.

## Setting up environment variables

1. Create a file called `.env` in the root level directory of this project.

2. This `.env` file should contain the following:
```
REACT_APP_TUIT_SERVICE_URL=*base url of the backend service*
```
3. You can also edit a sample [.env](./.env.example) file provided with this repository. Make sure to remove `.example` from the filename.