package de.tj9930.csdstuttgart.votingtool.model;


import javax.persistence.*;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "votesYes")
    private Integer votesYes;

    @Column(name = "votesNo")
    private Integer votesNo;

    @Column(name = "noVotes")
    private Integer noVotes;

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

    public Integer getVotesYes() {
        return votesYes;
    }

    public void setVotesYes(Integer votesYes) {
        this.votesYes = votesYes;
    }

    public Integer getVotesNo() {
        return votesNo;
    }

    public void setVotesNo(Integer votesNo) {
        this.votesNo = votesNo;
    }

    public Integer getNoVotes() {
        return noVotes;
    }

    public void setNoVotes(Integer noVotes) {
        this.noVotes = noVotes;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public void addNoVote() {
        this.noVotes++;
    }

    public void addVoteYes() {
        this.votesYes++;
    }

    public void addVoteNo() {
        this.votesNo++;
    }

    @Override
    public String toString(){
        return "ID: " + getId() + " Title: " + getTitle() + " Description: " + getDescription() +
                " YES: " + getVotesYes() + " NO: " + getVotesNo() + " DID NOT VOTE: " + getNoVotes();
      }
}
