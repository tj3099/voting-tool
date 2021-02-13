package de.tj9930.csdstuttgart.votingtool.model;

import javax.persistence.*;

@Entity
@Table(name = "text")
public class Text {

    @Id
    @Column(name = "mandant")
    private String mandant;

    @Lob
    @Column(name = "text")
    private String text;

    public String getMandant() {
        return mandant;
    }

    public void setMandant(String mandant) {
        this.mandant = mandant;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }
}

