package com.sb.DTO;

public class UserDTO {
    private int userId;
    private String userName;
    private String role;
    private boolean active;
    public UserDTO() {}

//    public UserDTO(int userId, String userName, String role, boolean active) {
//		
//		this.userId = userId;
//		this.userName = userName;
//		this.role = role;
//		this.active = active;
//	}



    // Getters and Setters
    public int getUserId() {
        return userId;
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
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
