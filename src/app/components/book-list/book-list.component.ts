import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service'
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  Books: any = [];
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetBook().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }
  delete(id: any, i: any) {
    console.log(id);
    console.log(i);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe(res => {
        this.Books.splice(i, 1);
      })
    }
  }
  onKey(event: any) {
    let query = event.target.value || '';
    console.log(query);
    this.crudService.searchBook(query).subscribe(res => {
      console.log(res);
      this.Books = res;
    })

  }
}
