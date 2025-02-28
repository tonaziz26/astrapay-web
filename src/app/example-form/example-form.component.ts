import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExampleService } from '../services/example.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './example-form.component.html',
  styleUrl: './example-form.component.css'
})
export class ExampleFormComponent {
  exampleForm: FormGroup;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private exampleService: ExampleService,
    private router: Router
  ) {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.exampleForm.valid) {
      this.exampleService.createExample(this.exampleForm.value).subscribe({
        next: (response) => {
          this.success = true;
          this.error = '';
          this.exampleForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          this.error = error.error;
          this.success = false;
        }
      });
    }
  }

  navigateToList() {
    this.router.navigate(['/example-list']);
  }
}
