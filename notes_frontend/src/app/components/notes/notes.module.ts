import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotesViewComponent } from './notes-view/notes-view.component';
import { NoteComponent } from './note/note.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotesViewComponent,
    NoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }
