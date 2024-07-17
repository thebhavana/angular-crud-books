
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationdate: [''],
      publisher: [''],
      price: ['']
    });
  }

  addBook() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(
        (response) => {
          alert('Book added successfully')
       },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    } else {
      console.error('Invalid book form:', this.bookForm.errors);
    }
  }

}