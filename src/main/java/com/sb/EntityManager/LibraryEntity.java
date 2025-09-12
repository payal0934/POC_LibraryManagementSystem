package com.sb.EntityManager;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "library")
public class LibraryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book;

    @Column(nullable = false)
    private boolean returned = false; // default: not returned

//    @Column(name = "borrowed_date", nullable = true)
    @Column(name = "borrowed_date", nullable = false)
    private Date borrowedDate;

    @Column(name = "returned_date")
    private Date returnedDate;

    public LibraryEntity() {}

    // ================== Borrow ==================
    public static LibraryEntity borrowBook(UserEntity user, BookEntity book) {
        LibraryEntity entry = new LibraryEntity();
        entry.setUser(user);
        entry.setBook(book);
        entry.setReturned(false); // not returned yet
        Date today = Date.valueOf(LocalDate.now());
        entry.setBorrowedDate(today);
        entry.setReturnedDate(null); // not returned yet
        return entry;
    }

    // ================== Return ==================
    public void returnBook() {
        this.setReturned(true); // mark as returned
        this.returnedDate = Date.valueOf(LocalDate.now()); // set return date as today
    }

    // ================== Getters & Setters ==================
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
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
