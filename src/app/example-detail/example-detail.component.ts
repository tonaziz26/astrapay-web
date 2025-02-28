import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService, Example } from '../services/example.service';

@Component({
  selector: 'app-example-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './example-detail.component.html',
  styleUrl: './example-detail.component.css'
})
export class ExampleDetailComponent implements OnInit {
  example: Example | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exampleService: ExampleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.fetchExampleDetail(name);
      }
    });
  }

  fetchExampleDetail(name: string) {
    this.loading = true;
    this.error = null;

    this.exampleService.getExampleByName(name).subscribe({
      next: (example) => {
        this.example = example;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching example:', error);
        this.error = 'Failed to load example details. Please try again.';
        this.loading = false;
      }
    });
  }

  updateExample() {
    if (!this.example) return;

    this.loading = true;
    this.error = null;

    this.exampleService.updateExample(this.example.name, this.example).subscribe({
      next: (updatedExample) => {
        this.example = updatedExample;
        this.loading = false;
        this.error = null;
        this.router.navigate(['/example-list']);
      },
      error: (error) => {
        console.error('Error updating example:', error);
        this.error = error.error;
        this.loading = false;
      }
    });
  }

  deleteExample() {
    if (!this.example || !confirm(`Are you sure you want to delete example "${this.example.name}"?`)) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.exampleService.deleteExample(this.example.name).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/example-list']);
      },
      error: (error) => {
        console.error('Error deleting example:', error);
        this.error = error.error;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/example-list']);
  }
}
