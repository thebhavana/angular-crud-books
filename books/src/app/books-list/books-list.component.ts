
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service'; // Import your BookService
import { Router } from '@angular/router';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data: any[]) => {
      this.books = data;
    });
  }

  editBook(book: any) {
    this.router.navigate(['/books', book._id]);
    console.log('Edit book:', book);
    localStorage.setItem('title', book.title);
    localStorage.setItem('author', book.author);
    localStorage.setItem('isbn', book.isbn);
    localStorage.setItem('publicationdate', book.publicationdate);
    localStorage.setItem('publisher', book.publisher);
    localStorage.setItem('price', book.price);
  }

  deleteBook(book: any) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(book._id).subscribe(
        () => {
          const index = this.books.findIndex(b => b._id === book._id);
          if (index !== -1) {
            this.books.splice(index, 1);
          }
          console.log('Book deleted successfully.');
        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
}
