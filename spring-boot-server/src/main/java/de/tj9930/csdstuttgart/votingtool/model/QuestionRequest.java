package de.tj9930.csdstuttgart.votingtool.model;

public class QuestionRequest {
    private User user;
    private Question question;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
