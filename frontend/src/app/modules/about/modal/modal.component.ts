import { Component, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('youtubePlayer', { static: false }) youtubePlayer!: ElementRef;
  isOpen = false;
  videoId!: string;
  videoWidth: string = "100%";
  videoHeight: string = "100%";

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() { }

  openModal(videoId: string) {
    this.videoId = videoId;
    this.isOpen = true;
    setTimeout(() => {
      const iframe = this.youtubePlayer.nativeElement.querySelector('iframe');
      if (iframe) {
        this.renderer.removeAttribute(iframe, 'width');
        this.renderer.removeAttribute(iframe, 'height');
        this.renderer.setAttribute(iframe, 'width', '100%');
        this.renderer.setAttribute(iframe, 'height', '392px');
      }
    },1000)
    
  }

  closeModal() {
    this.isOpen = false;
  }
}
