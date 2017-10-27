import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-find-products-edit-preview',
  templateUrl: './find-products-edit-preview.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class FindProductsEditPreviewComponent implements OnInit {

  productForm : FormGroup;

  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  public previewImg = [
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg'
  ];

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  tags = [];


  public editor;
  public editorContent = `<div class="xb-shop__margin-bottom-2 xb-shop__edit-description">`+
  `<div class="md-margin-top-2 xb-store__content-text">`+
  `Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.`+
  `Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training`+
  `that make you an expert in your field? Show your customers that there are read people with instersting stories working`+
  `behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.`+
  `</div>`+
  `<div class="md-margin-top-2">`+
  `<img src="//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg">`+
  `</div>`+
  `</div>`;

  product = {
    title: '[Updated Version] Linner Active Noise Cancelling Headphones, Lightning In Ear Wired Earphone with Built-InMic and Remote (Comfortable and Secure Fit, MFi Certified) for iPhone X 8 7 6 Plus, iPad iPod',
    tags: '11111'
  };

  constructor(
    public router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      tags: ['', [
        Validators.required
      ]],
      purchaseUrl: ['', [
        Validators.required
      ]],
      recommendation: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit():void {

  }


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  close():void {
    this.router.navigate(['/shop/products']);
  }

  showTitleInput: boolean = false;
  showCategoryInput: boolean = false;
  showDescriptionEditor: boolean = false;

  showTitle() {
    this.showTitleInput = !this.showTitleInput;
  }

  showCategory() {
    this.showCategoryInput = !this.showCategoryInput;
  }

  showDescription() {
    this.showDescriptionEditor = !this.showDescriptionEditor;
  }

}
