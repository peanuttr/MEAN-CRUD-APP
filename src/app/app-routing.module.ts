import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';


const routes: Routes = [
  {
    path: "", pathMatch: 'full', redirectTo: 'book-list'
  },
  {
    path: "book-list", component: BookListComponent
  },
  {
    path: "book-detail/:id", component: BookDetailComponent
  },
  {
    path: "add-book", component: AddBookComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
