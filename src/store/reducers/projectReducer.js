const initState = {
    todoLists: []
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        default:
            return state;
            break;
    }
};

export default projectReducer;