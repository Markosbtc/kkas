import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageStorageService {

  constructor() { }

  setLanguage(language): void {
    localStorage.setItem('lang', language);
  }

  getLanguage(): string {
    return localStorage.getItem('lang');
  }
}
