package com.sb.EntityManager;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "book") 
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    @Column(nullable = false)
    private String bookName;

    @Column(nullable = false)
    private int bookCount;

    @Column(nullable = false)
    private String author;

    @Column(unique = true, nullable = false)
    private long isbn;

    @Column(nullable = true)
    private String bookCategory;

    // ✅ New field for image URL
    @Column(name = "imageUrl",nullable = true)
    private String imageUrl;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<LibraryEntity> borrowRecords = new ArrayList<>();

    public BookEntity() {}

    public BookEntity(String bookName, int bookCount, String author, long isbn, String bookCategory, String imageUrl) {
        this.bookName = bookName;
        this.bookCount = bookCount;
        this.author = author;
        this.isbn = isbn;
        this.bookCategory = bookCategory;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public String getBookName() { return bookName; }
    public void setBookName(String bookName) { this.bookName = bookName; }

    public int getBookCount() { return bookCount; }
    public void setBookCount(int bookCount) { this.bookCount = bookCount; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public long getIsbn() { return isbn; }
    public void setIsbn(long isbn) { this.isbn = isbn; }

    public String getBookCategory() { return bookCategory; }
    public void setBookCategory(String bookCategory) { this.bookCategory = bookCategory; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<LibraryEntity> getBorrowRecords() { return borrowRecords; }
    public void setBorrowRecords(List<LibraryEntity> borrowRecords) { this.borrowRecords = borrowRecords; }
}
