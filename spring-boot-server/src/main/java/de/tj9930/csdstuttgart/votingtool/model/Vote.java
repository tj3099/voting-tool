package de.tj9930.csdstuttgart.votingtool.model;

public class Vote {

    private long id;
    private String vote;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVote() {
        return this.vote;
    }

    public void setVote(String vote) {
        this.vote = vote;
    }
}

