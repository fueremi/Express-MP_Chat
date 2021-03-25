const users = [];

// Join user to chat
function userJoin(id, username, chatRoom) {
    const user = {id, username, chatRoom };

    users.push(user);

    return user;
}

// Get current user
function currentUser(id){
    return users.find(user => user.id == id);
}

// User leave chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index !== -1){
        return users.splice(index,1)[0];
    }
}

// Get room users
function roomUsers(chatRoom){
    return users.filter(user => user.chatRoom === chatRoom);
}

module.exports = {
    userJoin,
    currentUser,
    userLeave,
    roomUsers
}