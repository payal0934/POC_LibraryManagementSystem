package com.sb.businesslogic;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sb.DTO.LibraryDTO;
import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;
import com.sb.EntityManager.UserEntity;
import com.sb.repository.BookRepository;
import com.sb.repository.LibraryRepository;
import com.sb.repository.UserRepository;

@Service
public class LibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    // Get all borrowed books for a user
    public List<BookEntity> getBorrowedBooksByUser(int userId) {
        return libraryRepository.findBorrowedBooksByUser(userId);
    }
    
    
    public List<LibraryDTO> getBorrowHistoryByUserDto(int userId) {
        return libraryRepository.findByUser_UserId(userId)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    
    public LibraryDTO convertToDto(LibraryEntity entity) {
        LibraryDTO dto = new LibraryDTO();
        dto.setId(entity.getId());

        // User info
        dto.setUserId(entity.getUser().getUserId());
        dto.setUserName(entity.getUser().getUserName());  // make sure UserEntity has getUserName()

        // Book info
        dto.setBookId(entity.getBook().getBookId());
        dto.setBookName(entity.getBook().getBookName());  // make sure BookEntity has getBookName()

        // Borrow/return info
        dto.setReturned(entity.isReturned());
        dto.setBorrowedDate(entity.getBorrowedDate());
        dto.setReturnedDate(entity.getReturnedDate());

        return dto;
    }


    
    
    
    
    
    public boolean borrowBook(int bookId, int userId) {
        // Find book and user properly
        BookEntity book = bookRepository.findById(bookId).orElse(null);
        UserEntity user = userRepository.findById(userId).orElse(null);

        if (book == null || user == null) {
            return false; // invalid book/user
        }

        if (book.getBookCount() <= 0) {
            return false; // no stock
        }

        // ✅ Check if already borrowed and not returned
        boolean alreadyBorrowed = libraryRepository
            .existsByBookBookIdAndUserUserIdAndReturnedFalse(bookId, userId);

        if (alreadyBorrowed) {
            return false; // prevent duplicate borrow
        }

        // Decrease count
        book.setBookCount(book.getBookCount() - 1);
        bookRepository.save(book);

        // Save in library
        LibraryEntity library = new LibraryEntity();
        library.setBook(book);
        library.setUser(user);  // ✅ real user entity from DB
        library.setReturned(false);
        library.setBorrowedDate(LocalDateTime.now());
        libraryRepository.save(library);

        return true;
    }

    
    //borrow book user can boorrow one book logic 
    
    
    
    

    // Return a book
    public boolean returnBook(int bookId, int userId) {
        // fetch the library entry using the correct repository method
        LibraryEntity library = libraryRepository
                .findByBook_BookIdAndUser_UserIdAndReturnedFalse(bookId, userId)
                .orElse(null);

        if (library != null) {
            // mark as returned
            library.setReturned(true);
            libraryRepository.save(library);

            // increase book count
            BookEntity book = library.getBook();
            book.setBookCount(book.getBookCount() + 1);
            bookRepository.save(book);

            return true;
        }
        return false;
    }

}
