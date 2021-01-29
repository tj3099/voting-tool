package com.bezkoder.spring.datajpa.model;

public class UserForLogedinRequest {
    private User callingUser;

    private User user;

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public User getCallingUser() {
        return callingUser;
    }

    public void setCallingUser(User callingUser) {
        this.callingUser = callingUser;
    }


}
