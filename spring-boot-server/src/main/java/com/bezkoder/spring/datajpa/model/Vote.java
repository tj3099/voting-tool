package com.bezkoder.spring.datajpa.model;


import javax.persistence.*;

@Entity
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "votesYes")
    private boolean votesYes;

    @Column(name = "votesNo")
    private boolean votesNo;

    @Column(name = "noVotes")
    private boolean noVotes;

    @Column(name = "isOpen")
    private boolean isOpen;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getVotesYes() {
        return votesYes;
    }

    public void setVotesYes(boolean votesYes) {
        this.votesYes = votesYes;
    }

    public boolean getVotesNo() {
        return votesNo;
    }

    public void setVotesNo(boolean votesNo) {
        this.votesNo = votesNo;
    }

    public boolean getNoVotes() {
        return noVotes;
    }

    public void setNoVotes(boolean noVotes) {
        this.noVotes = noVotes;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }
}
