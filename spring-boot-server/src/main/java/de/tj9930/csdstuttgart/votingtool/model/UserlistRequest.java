package de.tj9930.csdstuttgart.votingtool.model;

import java.util.List;

public class UserlistRequest {
    private User callingUser;

    private List<User> users;

    public List<User> getUsers() {
        return users;
    }
    public void setUsers(List<User> users) {
        this.users = users;
    }

    public User getCallingUser() {
        return callingUser;
    }

    public void setCallingUser(User callingUser) {
        this.callingUser = callingUser;
    }


}
