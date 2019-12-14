import * as actionCreators from '../actions/actionCreators.js'



export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let userID = parseInt(Math.random() * 100000000);
    console.log(newUser.email === "")
    console.log("registerHandler() " + newUser.email + ", " + newUser.password);
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
        member: userID, 
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    })
    .catch((err) => {
        console.log("error()");
        dispatch(actionCreators.registerError);
    });

    firestore.collection('members').add({ 
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        administrator: false,
        projects: [],
        member: userID, 
    }).then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((err) => {
        console.log(err);
    }) 
};