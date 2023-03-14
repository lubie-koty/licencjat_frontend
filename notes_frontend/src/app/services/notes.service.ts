import { Injectable } from '@angular/core';
import { Note } from '../entities/models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  public getNotes() : Note[] {
    return [new Note()];
  }
}
