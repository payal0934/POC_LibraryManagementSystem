package com.sb.EntityManager;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String password; 

    @Column(nullable = false)
    private String role; // "user" or "admin"

    private boolean active = true; 
    
    
    public UserEntity() {
    }
    public UserEntity(int userId) {
        this.userId = userId;
    }

    // Constructor for user/admin
   

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public UserEntity( String userName, String password, String role, boolean active) {
		
		
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.active = active;
	}
    
    
    
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
