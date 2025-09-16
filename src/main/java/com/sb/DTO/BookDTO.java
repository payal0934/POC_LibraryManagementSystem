package com.sb.DTO;

public class BookDTO {
    private int bookId;
    private String bookName;
    private int bookCount;
    private String author;
    private long isbn;
    private String bookCategory;
    private String imageUrl; 
    
 
    public BookDTO() {}

   



	public BookDTO(int bookId, String bookName, int bookCount, String author, long isbn, String bookCategory,
			String imageUrl) {
		super();
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookCount = bookCount;
		this.author = author;
		this.isbn = isbn;
		this.bookCategory = bookCategory;
		this.imageUrl = imageUrl;
	}





	public String getImageUrl() {
		return imageUrl;
	}





	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}





	// Getters and Setters
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
    public String getBookCategory() {
        return bookCategory;
    }
    public void setBookCategory(String bookCategory) {
        this.bookCategory = bookCategory;
    }
}
