package com.sb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;
import com.sb.businesslogic.BookService;
import com.sb.businesslogic.LibraryService;

import com.sb.businesslogic.LibraryService;

import java.util.List;
import java.util.Optional;

import com.sb.ApiResponse.ApiResponse;
import com.sb.DTO.BookDTO;
import com.sb.DTO.LibraryDTO;


@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    @Autowired
    private LibraryService libraryService;


    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

//    @PostMapping("/add")
//    public ResponseEntity<BookDTO> addBook(@RequestBody BookEntity book) {
//        BookEntity createdBook = bookService.addBook(book);
//        return ResponseEntity.ok(bookService.convertToDto(createdBook));
//    }
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<BookDTO>> addBook(@RequestBody BookEntity book) {
        BookEntity createdBook = bookService.addBook(book);
        BookDTO bookDTO = bookService.convertToDto(createdBook);
        return ResponseEntity.ok(new ApiResponse<>("success", "Book added successfully", bookDTO));
    }

    
    
    
    
    

    @PutMapping("/update/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable int id, @RequestBody BookEntity bookDetails) {
        BookEntity updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(bookService.convertToDto(updatedBook));
    }

//    @GetMapping
//    public ResponseEntity<List<BookDTO>> getAllBooks() {
//        List<BookEntity> books = bookService.getAllBooks();
//        List<BookDTO> bookDTOs = books.stream()
//                                      .map(bookService::convertToDto)
//                                      .toList();
//        return ResponseEntity.ok(bookDTOs);
//    }
    
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookDTO>>> getAllBooks() {
        List<BookEntity> books = bookService.getAllBooks();
        List<BookDTO> bookDTOs = books.stream()
                                      .map(bookService::convertToDto)
                                      .toList();
        return ResponseEntity.ok(new ApiResponse<>("success", "Books fetched successfully", bookDTOs));
    }


//
//    @GetMapping("/{id}")
//    public ResponseEntity<BookDTO> getBookById(@PathVariable int id) {
//        BookEntity book = bookService.getBookById(id)
//                                     .orElseThrow(() -> new RuntimeException("Book not found"));
//        return ResponseEntity.ok(bookService.convertToDto(book));
//    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> getBookById(@PathVariable int id) {
        BookEntity book = bookService.getBookById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return ResponseEntity.ok(new ApiResponse<>("success", "Book found", bookService.convertToDto(book)));
    }

    
    

    @GetMapping("/category/{category}")
    public ResponseEntity<List<BookDTO>> getBooksByCategory(@PathVariable String category) {
        List<BookEntity> books = bookService.getBooksByCategory(category);
        List<BookDTO> bookDTOs = books.stream()
                                      .map(bookService::convertToDto)
                                      .toList();
        return ResponseEntity.ok(bookDTOs);
    }


    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<String> borrowBook(@PathVariable int bookId, @RequestParam int userId) {
        return ResponseEntity.ok(bookService.borrowBook(bookId, userId));
    }

    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestParam int bookId, @RequestParam int userId) {
        boolean success = bookService.returnBook(bookId, userId);
        if (success) {
            return ResponseEntity.ok("Book returned successfully!");
        } else {
            return ResponseEntity.badRequest().body("Book was not borrowed by this user or not found.");
        }
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<String>> deleteBook(@PathVariable int bookId) {
        boolean deleted = bookService.deleteBook(bookId);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>("success", "Book deleted successfully", null));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<>("error", "Book not found", null));
        }
    }


    @GetMapping("/history/{userId}")
    public ResponseEntity<List<LibraryDTO>> getBorrowHistory(@PathVariable int userId) {
        List<LibraryEntity> history = bookService.getBorrowHistoryByUser(userId);
        List<LibraryDTO> dtoList = history.stream()
                                         .map(libraryService::convertToDto)
                                         .toList();
        return ResponseEntity.ok(dtoList);
    }



    @GetMapping("/borrowed/{userId}")
    public ResponseEntity<List<BookDTO>> getBorrowedBooks(@PathVariable int userId) {
        List<BookEntity> books = bookService.getBorrowedBooksByUser(userId);
        List<BookDTO> dtoList = books.stream()
                                     .map(bookService::convertToDto)
                                     .toList();
        return ResponseEntity.ok(dtoList);
    }

}
