import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isFlipped = false; // Controle do estado de flip
  animationFrameId: number | null = null; // Controle da animação para movimento do mouse
  isMouseInside = false; // Verifica se o mouse está dentro do card

  // Alterna entre frente e verso ao clicar no card
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  // Garante que o estado esteja correto ao clicar no botão "Frente"
  flipToFront() {
    this.isFlipped = false;
  }

  // Garante que o estado esteja correto ao clicar no botão "Verso"
  flipToBack() {
    this.isFlipped = true;
  }

  // Movimento do mouse para interatividade (somente fora do card)
  onMouseMove(event: MouseEvent) {
    if (this.isMouseInside) return; // Não movimenta o card se o mouse estiver dentro dele

    const card = document.querySelector('.card') as HTMLElement;
    if (!card) return;

    const { offsetX, offsetY, target } = event;
    const { clientWidth, clientHeight } = target as HTMLElement;

    const rotateX = ((offsetY / clientHeight) * 15 - 7.5) * -1; // Suaviza a rotação
    const rotateY = (offsetX / clientWidth) * 15 - 7.5;

    // Cancela frames anteriores para melhorar a fluidez
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // Detecta quando o mouse entra no card
  onMouseEnter() {
    this.isMouseInside = true; // Marca que o mouse está dentro do card
    const card = document.querySelector('.card') as HTMLElement;
    if (card) {
      this.resetCardPosition(card);
    }
  }

  // Detecta quando o mouse sai do card
  onMouseLeave() {
    this.isMouseInside = false; // Marca que o mouse está fora do card
  }

  // Recentraliza o card
  resetCardPosition(card: HTMLElement) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)'; // Recentraliza o card
    });
  }
}
