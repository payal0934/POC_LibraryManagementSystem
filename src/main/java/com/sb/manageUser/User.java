package com.sb.manageUser;

import org.springframework.stereotype.Component;

@Component
public class User {

    private int userId;
    private String userName;
    private String passWord;

    // User can borrow only ONE book at a time
    private Integer borrowedBookId = null; 
    private int borrowedCopies = 0;

    public User() {}

    public User(int userId, String userName, String passWord) {
        this.userId = userId;
        this.userName = userName;
        this.passWord = passWord;
    }

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

    public String getPassWord() {
        return passWord;
    }
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Integer getBorrowedBookId() {
        return borrowedBookId;
    }
    public int getBorrowedCopies() {
        return borrowedCopies;
    }

    public boolean borrowBook(int bookId, int copies) {
        if (this.borrowedBookId == null) { 
            this.borrowedBookId = bookId;
            this.borrowedCopies = copies;
            return true;
        }
        return false; // already has a book
    }

    public void returnBook() {
        this.borrowedBookId = null;
        this.borrowedCopies = 0;
    }
}
