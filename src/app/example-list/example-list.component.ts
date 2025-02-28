import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExampleService, Example } from '../services/example.service';

@Component({
  selector: 'app-example-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example-list.component.html',
  styleUrl: './example-list.component.css'
})
export class ExampleListComponent implements OnInit {
  examples: Example[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private exampleService: ExampleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchExamples();
  }

  fetchExamples() {
    this.loading = true;
    this.error = null;

    this.exampleService.getExamples().subscribe({
      next: (examples) => {
        this.examples = examples;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching examples:', error);
        this.error = 'Failed to load examples. Please try again.';
        this.loading = false;
      }
    });
  }

  viewDetail(name: string) {
    this.router.navigate(['/example-detail', name]);
  }

  navigateToForm() {
    this.router.navigate(['/example-form']);
  }
}
