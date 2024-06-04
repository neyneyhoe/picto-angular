import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent {
  @Input() messages: { text: string, timestamp: string, type: 'user' | 'response', images?: string[] }[] = [];

  isModalOpen: boolean = false;
  currentImage: string | null = null;
  currentImageIndex: number = 0;

  trackByFn(index: number, item: any): any {
    return index;
  }

  openModal(image: string) {
    this.currentImage = image;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentImage = null;
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      const messageWithImages = this.messages.find(message => message.images?.length?? 0 > this.currentImageIndex);
      if (messageWithImages && messageWithImages.images) {
        this.currentImage = messageWithImages.images[this.currentImageIndex];
      } else {
        this.closeModal(); 
      }
    }
  }


  nextImage() {
    const  currentIndex = this.messages.findIndex(message => message.images?.includes(this.currentImage?? ''));
    if (currentIndex >= 0 && currentIndex < this.messages.length - 1) {
      this.currentImageIndex++;
      const messageWithImages = this.messages[currentIndex + 1];
      if (messageWithImages && messageWithImages.images) {
        if (messageWithImages.images.length > this.currentImageIndex) {
          this.currentImage = messageWithImages.images[this.currentImageIndex];
        } else {
          this.closeModal(); 
        }
      } else {
        this.closeModal(); 
      }
    }
  }
}