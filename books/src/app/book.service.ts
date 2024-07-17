import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string = 'http://localhost:4000'; // Adjust the URL according to your backend server

  constructor(private http: HttpClient) { }

  addBook(bookDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insertBook`, bookDetails);
  }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getBooks`);
  }

  updateBook(bookId: string, bookDetails: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateBook/${bookId}`, bookDetails);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteBook/${bookId}`);
  }

  getBookById(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getBook/${bookId}`);
  }
}
