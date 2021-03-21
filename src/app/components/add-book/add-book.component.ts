import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }
  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value).subscribe(
      () => {
        console.log("Data added successfully");
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'))

      }, (err) => {
        console.log(err);
      }
    )
  }

}
