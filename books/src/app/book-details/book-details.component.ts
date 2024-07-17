import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  bookForm: FormGroup;
  bookId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      title: [localStorage.getItem("title"), Validators.required],
      author: [localStorage.getItem("author"), Validators.required],
      isbn: [localStorage.getItem("isbn"), Validators.required],
      publicationdate: [localStorage.getItem("publicationdate")],
      publisher: [localStorage.getItem("publisher")],
      price: [localStorage.getItem("price")]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.bookService.getBookById(this.bookId).subscribe(book => {
        this.bookForm.patchValue(book);
      });
    });
  }

  updateBookDetails(): void {
    if (this.bookForm.valid) {
      const updatedBook = this.bookForm.value;
      this.bookService.updateBook(this.bookId, updatedBook).subscribe(
        () => {
          console.log('Book details updated successfully.');
          alert("Book updated successfully");
          this.router.navigate(['/books']);
        },
        error => {
          console.error('Error updating book details:', error);
          // Handle error
        }
      );
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
