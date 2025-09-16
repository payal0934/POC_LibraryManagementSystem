package com.sb.businesslogic;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sb.DTO.BookDTO;
import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;
import com.sb.EntityManager.UserEntity;
import com.sb.repository.BookRepository;
import com.sb.repository.LibraryRepository;
import com.sb.repository.UserRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final LibraryRepository libraryRepository;

    @Autowired
    public BookService(BookRepository bookRepository, UserRepository userRepository, LibraryRepository libraryRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.libraryRepository = libraryRepository;
    }

    public BookEntity addBook(BookEntity book) {
        return bookRepository.save(book);
    }

    public BookEntity addBookWithImage(MultipartFile file, String title, String author,
            long isbn, String category, Integer bookCount) throws Exception {

String uploadDir = "Uploads/Images/";
String fileName = file.getOriginalFilename(); // ✅ use only original file name

Path path = Paths.get(uploadDir + fileName);
Files.createDirectories(path.getParent());
Files.write(path, file.getBytes());

// Store only filename in DB
String imageUrl = fileName;

BookEntity book = new BookEntity();
book.setBookName(title);
book.setAuthor(author);
book.setIsbn(isbn);
book.setBookCategory(category);
book.setBookCount(bookCount);
book.setImageUrl(imageUrl);

return addBook(book);
}



    
    public List<BookEntity> getAllBooks() {
        return bookRepository.findByBookCountGreaterThan(0);
    }

    public Optional<BookEntity> getBookById(int id) {
        return bookRepository.findById(id);
    }

    public List<LibraryEntity> getBorrowHistoryByUser(int userId) {
        return libraryRepository.findByUser_UserId(userId);
    }

    public BookDTO convertToDto(BookEntity book) {
        BookDTO dto = new BookDTO();
        dto.setBookId(book.getBookId());
        dto.setBookName(book.getBookName());
        dto.setBookCount(book.getBookCount());
        dto.setAuthor(book.getAuthor());
        dto.setIsbn(book.getIsbn());
        dto.setBookCategory(book.getBookCategory());
        dto.setImageUrl(book.getImageUrl()); // ✅
        return dto;
    }
    
    
    
    public BookEntity updateBook(int id, BookEntity bookDetails) {
        BookEntity book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));

        book.setBookName(bookDetails.getBookName());
        book.setBookCount(bookDetails.getBookCount());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setBookCategory(bookDetails.getBookCategory());
        book.setImageUrl(bookDetails.getImageUrl()); // ✅ save image URL

        return bookRepository.save(book);
    }


    public String borrowBook(int bookId, int userId) {
        Optional<BookEntity> bookOpt = bookRepository.findById(bookId);
        Optional<UserEntity> userOpt = userRepository.findById(userId);

        if (bookOpt.isEmpty() || userOpt.isEmpty()) {
            return "❌ Book or User not found";
        }

        BookEntity book = bookOpt.get();
        if (book.getBookCount() <= 0) {
            return "❌ Book not available";
        }

        LibraryEntity record = new LibraryEntity();
        record.setBook(book);
        record.setUser(userOpt.get());
        record.setReturned(false);
        record.setBorrowedDate(java.time.LocalDateTime.now());
        record.setReturnedDate(null);
        libraryRepository.save(record);

        book.setBookCount(book.getBookCount() - 1);
        bookRepository.save(book);

        return "✅ Book borrowed successfully!";
    }

    public boolean returnBook(int bookId, int userId) {
        Optional<LibraryEntity> recordOpt =
            libraryRepository.findByBook_BookIdAndUser_UserIdAndReturnedFalse(bookId, userId);

        if (recordOpt.isPresent()) {
            LibraryEntity record = recordOpt.get();
            record.setReturned(true);
            record.setReturnedDate(java.time.LocalDateTime.now()); // <-- Corrected here
            libraryRepository.save(record);

            BookEntity book = record.getBook();
            book.setBookCount(book.getBookCount() + 1);
            bookRepository.save(book);

            return true;
        }
        return false;
    }


    public List<BookEntity> getBorrowedBooksByUser(int userId) {
        List<LibraryEntity> borrowedRecords = libraryRepository.findByUser_UserIdAndReturnedFalse(userId);

        List<BookEntity> books = new ArrayList<>();
        for (LibraryEntity record : borrowedRecords) {
            books.add(record.getBook());
        }
        return books;
    }

    public boolean deleteBook(int bookId) {
        Optional<BookEntity> bookOpt = bookRepository.findById(bookId);
        if (bookOpt.isPresent()) {
            bookRepository.delete(bookOpt.get());
            return true;
        }
        return false;
    }

    // ✅ Optional: get books by category
    public List<BookEntity> getBooksByCategory(String category) {
        return bookRepository.findByBookCategory(category);
    }
}
