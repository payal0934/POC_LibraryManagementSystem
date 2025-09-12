package com.sb.DTO;

import java.sql.Date;

public class LibraryDTO {
    private int id;
    private int userId;
    private String userName;  
    private int bookId;
    private String bookName;  
    private boolean returned;
    private Date borrowedDate;
    private Date returnedDate;

    public LibraryDTO() {}

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
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
    public int getBookId() {
        return bookId;
    }
    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
    public String getBookName() {
        return bookName;
    }
    public void setBookName(String bookName) {
        this.bookName = bookName;
    }
    public boolean isReturned() {
        return returned;
    }
    public void setReturned(boolean returned) {
        this.returned = returned;
    }
    public Date getBorrowedDate() {
        return borrowedDate;
    }
    public void setBorrowedDate(Date borrowedDate) {
        this.borrowedDate = borrowedDate;
    }
    public Date getReturnedDate() {
        return returnedDate;
    }
    public void setReturnedDate(Date returnedDate) {
        this.returnedDate = returnedDate;
    }
}
