package com.bezkoder.spring.datajpa.model;

public class VoteRequestModel {
    private User user;
    private Vote vote;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vote getVote() {
        return vote;
    }

    public void setVote(Vote vote) {
        this.vote = vote;
    }
}
