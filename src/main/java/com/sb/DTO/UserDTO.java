package com.sb.DTO;

public class UserDTO {
    private int userId;
    private String userName;
    private String role;

    public UserDTO() {}

    public UserDTO(int userId, String userName, String role) {
        this.userId = userId;
        this.userName = userName;
        this.role = role;
    }

    // Getters and Setters
    public int getUserId() {
        return userId;
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
