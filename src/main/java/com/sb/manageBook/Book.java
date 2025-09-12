package com.sb.manageBook;

import org.springframework.stereotype.Component;

@Component
public class Book {

    private int bookId;
    private String bookName;
    private int bookCount;
    private String author;
    private long isbn;

    public Book() {}

	public Book(int bookId, String bookName, int bookCount, String author, long isbn) {
		super();
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookCount = bookCount;
		this.author = author;
		this.isbn = isbn;
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

	public int getBookCount() {
		return bookCount;
	}

	public void setBookCount(int bookCount) {
		this.bookCount = bookCount;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public long getIsbn() {
		return isbn;
	}

	public void setIsbn(long isbn) {
		this.isbn = isbn;
	}
    
    
    
    
    
    

   }
