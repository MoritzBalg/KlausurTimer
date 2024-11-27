import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() noteId!: string;
  @Input() note!: Note;

  @Input() collapsed: boolean = false;
  @Input() editable: boolean = false;
  @Output() editNote: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteNote: EventEmitter<void> = new EventEmitter<void>();

  handleEditNote(): void{
    this.editNote.emit();
  }

  handleDeleteNote(): void{
    this.deleteNote.emit();
  }
}
