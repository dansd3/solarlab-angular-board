import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { InputNumberModule } from 'primeng/inputnumber';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import {
  FileSelectEvent,
  FileUploadModule,
  FileUpload,
} from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CreateAdvertBusiness } from './services/create-advert-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ObjectUrlPipe } from '../../infrastructure/pipes/urlPipe';
@Component({
  selector: 'app-create-advert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    TreeSelectModule,
    ButtonModule,
    FileUploadModule,
    ObjectUrlPipe,
  ],
  templateUrl: './new-advert.html',
  styleUrls: ['./new-advert.scss'],
  providers: [MessageService],
})
export class NewAdvert {
  private business = inject(CreateAdvertBusiness);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);
  categories = toSignal(this.business.getCategories(), { initialValue: [] });

  form: FormGroup = this.fb.group({
    categoryId: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    location: ['', Validators.required],
    phone: ['', Validators.required],
    cost: [0, Validators.required],
    images: [[], [Validators.required, Validators.maxLength(10)]],
  });

  selectedFiles: File[] = [];
  onFileSelect(event: FileSelectEvent): void {
    this.selectedFiles = [...event.currentFiles];
    this.form.patchValue({ images: this.selectedFiles });
  }
  removeFile(file: File, uploader: FileUpload): void {
    const fileIndex = uploader.files.indexOf(file);
    if (fileIndex !== -1) {
      uploader.remove(new Event('click'), fileIndex);
      this.selectedFiles = [...uploader.files];
      this.form.patchValue({ images: this.selectedFiles });
    }
  }
  onSubmit() {
    const selectedCategoryId = this.form.value.categoryId?.value;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }

    this.business.createAdvert(this.form.value, selectedCategoryId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Объявление создано',
        });
        this.router.navigate(['/']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось создать объявление',
        });
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
