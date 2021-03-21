import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from '../../service/crud.service'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetBookID(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    })

    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(() => {
      console.log("Data Updated");
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
    }, (err) => {
      console.log(err);
    })
  }
  back() {
    this.router.navigateByUrl('/book-list')
  }
}
