package de.tj9930.csdstuttgart.votingtool.model;

public class TextRequest {
    private User user;
    private Text text;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Text getText() {
        return text;
    }

    public void setText(Text text) {
        this.text = text;
    }
}
