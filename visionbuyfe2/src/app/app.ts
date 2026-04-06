import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidateService } from './services/validate';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  providers: [ValidateService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('visionbuyfe');
}
