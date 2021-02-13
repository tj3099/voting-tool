package de.tj9930.csdstuttgart.votingtool.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

	@Id
	@Column(name = "mail")
	private String mail;

	@Column(name = "secretKey")
	private String secretKey;

	@Column(name = "sessionId")
	private String sessionId;

	@Column(name = "grants")
	private Integer grants;

	@Column(name = "hasVoted")
	private boolean hasVoted = false;

	@Column(name = "active")
	private boolean active = false;

	public User() {

	}

	public User(String mail, String description, boolean hasVoted) {
		this.mail = mail;
		this.secretKey = description;
		this.hasVoted = hasVoted;
		this.grants = 0;
		this.active = true;
	}

	public User(String mail, String secretKey, boolean hasVoted, Integer grants, boolean active) {
		this.mail = mail;
		this.secretKey = secretKey;
		this.hasVoted = hasVoted;
		this.grants = grants;
		this.active = active;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}


	public Integer getGrants() {
		return grants;
	}

	public void setGrants(Integer grants) {
		this.grants = grants;
	}

	public boolean isHasVoted() {
		return hasVoted;
	}

	public void setHasVoted(boolean isPublished) {
		this.hasVoted = isPublished;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "User [mail=" + mail + ", key=" + secretKey + ", hasVoted=" + hasVoted + ", active=" + active +"]";
	}

}
