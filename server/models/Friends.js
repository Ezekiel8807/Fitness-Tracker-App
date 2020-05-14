const users = require("./User");

const Friends = [
    {
        userId: 1,
        FriendId: 4
    },
    {
        userId: 1,
        FriendId: 3
    },
    {
        userId: 4,
        FriendId: 1
    },
    {
        userId: 3,
        FriendId: 1
    }
]

const SentRequests = [
    {
        userId: 1,
        requestId: 2
    },
    {
        userId: 1,
        requestId: 5
    }
]

const PendingRequests = [
    {
        userId: 2,
        requestId: 1,
        requestPicture: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        requestName: "Jill"
    }
]

function addFriend(userId, friendId) {
    const user = Friends.find(x => x.userId == userId && x.FriendId == friendId);
    if(user) throw Error ("Already a friend!");

    const newFriend = { userId: userId, FriendId: friendId};
    const newFriend2 = { userId: friendId, FriendId: userId};
    Friends.push(newFriend);
    Friends.push(newFriend2);
    PendingRequests.map(function(x, index) {
        if(x.userId == userId && x.requestId == friendId) {
            PendingRequests.splice(index,1);
        }
    })
    SentRequests.map(function(x, index) {
        if(x.userId == friendId && x.requestId == userId) {
            SentRequests.splice(index,1);
        }
    })
    return Friends;
}

function getFriends(userID) {
    const allFriends = [];
    Friends.map(function(x, index) {
        if(x.userId == userID) {
           const user = users.User.find(y => y.userID == Friends[index].FriendId);
           allFriends.push({
               Name: user.Name,
               userID: user.userID,
               Picture: user.Picture
           });
       }
    })
    return allFriends;
}

function deleteFriend(userID, friendID) {
    let friend = true;
    Friends.map(function(x, index) {
        if(x.userId == userID && x.FriendId == friendID) {
            Friends.splice(index,1);
            friend = false;
        }
        if(x.userId == friendID && x.FriendId == userID) {
            Friends.splice(index,1);
            friend = false;
        }
    });
    return friend;
}

function sendRequest(user, friend, picture, name) {
    SentRequests.push({userId: user, requestId: friend});
    PendingRequests.push({userId: friend, requestId: user, requestPicture: picture, requestName: name});
    return SentRequests;
}

function getSentRequests(userID) {
    const allRequests = [];
    SentRequests.map(function(x, index) {
        if(x.userId == userID) {
            allRequests.push(SentRequests[index]);
        }
    })
    return allRequests;
}

function getPendingRequests(userID) {
    const allRequests = [];
    PendingRequests.map(function(x, index) {
        if(x.userId == userID) {
            allRequests.push(PendingRequests[index]);
        }
    })
    return allRequests;
}

function typeAHeadFriend(userID, friendSearched) {
    const usersFriends = getFriends(userID);

    let allResults = [];

     usersFriends.map(function(x, index) {
         if(x.Name.includes(friendSearched)) {
             allResults.push(x);
         }
     }); 
     return allResults;
}

module.exports = {
    Friends, SentRequests, PendingRequests, addFriend, getFriends,
    sendRequest, getSentRequests, getPendingRequests, deleteFriend,
    typeAHeadFriend
}