import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { Note } from 'src/app/entities/models/models';
import { NotesService } from 'src/app/services/notes.service';

enum ModalEnum {
  addModal,
  editModal
}

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css']
})
export class NotesViewComponent implements OnInit {
  public addEditForm!: FormGroup;
  public modalType!: number;
  public modalEnum = ModalEnum;
  public notes: Note[] = [];
  private addEditModal!: Modal;
  private deleteModal!: Modal;
  private currentNoteId: number | null = null;

  constructor(private notesService: NotesService) { }

  ngOnInit () : void {
    this.addEditForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    this.addEditModal = new Modal(document.getElementById('addEditModal')!);
    this.deleteModal = new Modal(document.getElementById('deleteModal')!);
    document.getElementById('addEditModal')?.addEventListener('hidden.bs.modal', () => {
      this.addEditForm.reset();
    });
    this.getNotes();
  }

  public checkField (fieldName: string) : boolean {
    return this.addEditForm.get(fieldName)!.invalid &&
           this.addEditForm.get(fieldName)!.touched;
  }

  public fieldHasError (fieldName: string, errorName: string) : boolean {
    return this.addEditForm.get(fieldName)!.hasError(errorName);
  }

  public openAddModal () : void {
    this.modalType = ModalEnum.addModal;
    this.addEditModal.show();
  }

  public openEditModal (noteData: Note) : void {
    this.modalType = ModalEnum.editModal;
    this.currentNoteId = noteData.id;
    this.addEditForm.setValue({
      title: noteData.title,
      content: noteData.content
    })
    this.addEditModal.show();
  }

  public openDeleteModal (noteId: number) : void {
    this.currentNoteId = noteId;
    this.deleteModal.show();
  }

  public submitForm (formValues: any) : void {
    this.addEditModal.hide();
    this.addEditForm.reset();
    if (this.modalType == ModalEnum.addModal) {
      this.addNote(formValues);
    } else if (this.modalType == ModalEnum.editModal) {
      this.editNote(formValues);
    }
  }

  public submitDelete () : void {
    this.deleteModal.hide();
    this.deleteNote();
  }

  private getNotes () : void {
    this.notesService.getNotes().subscribe({
      next: (res) => {
        if (res) {
          this.notes = res;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  private addNote (formValues: any) : void {
    const note: Note = {...formValues};
    this.notesService.addNote(note).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  private editNote (formValues: any) : void {
    const note: Note = {...formValues};
    this.notesService.editNote(this.currentNoteId!, note).subscribe({
      next: () => {
        this.currentNoteId = null;
        this.getNotes();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  private deleteNote () : void {
    this.notesService.deleteNote(this.currentNoteId!).subscribe({
      next: () => {
        this.currentNoteId = null;
        this.getNotes();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  public asdf () {
    console.log('asdf')
  }
}
