import { Component, Renderer2, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class VideoModalComponent implements AfterViewInit {
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
      const width = this.youtubePlayer.nativeElement.querySelector('iframe').offsetWidth;
      const height = width * 0.60
      const iframe = this.youtubePlayer.nativeElement.querySelector('iframe');
      this.renderer.setAttribute(iframe, 'height', String(height));

    },2000)    
  }

  closeModal() {
    this.isOpen = false;
  }

}
