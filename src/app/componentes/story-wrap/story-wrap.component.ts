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
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
    this.ingresarEventClick.emit();
  }
}
