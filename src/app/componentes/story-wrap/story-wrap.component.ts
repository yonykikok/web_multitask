import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-story-wrap',
  templateUrl: './story-wrap.component.html',
  styleUrls: ['./story-wrap.component.css']
})
export class StoryWrapComponent implements OnInit {
  @Output() ingresarEventClick:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  enviarEventoDeIngreso(){
    this.ingresarEventClick.emit();
  }
}
