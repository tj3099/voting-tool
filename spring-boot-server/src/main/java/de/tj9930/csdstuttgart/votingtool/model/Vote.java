package de.tj9930.csdstuttgart.votingtool.model;


import javax.persistence.*;

@Entity
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "votesYes")
    private boolean votesYes;

    @Column(name = "votesNo")
    private boolean votesNo;

    @Column(name = "noVotes")
    private boolean noVotes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}

