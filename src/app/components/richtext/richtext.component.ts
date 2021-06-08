import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import * as EventEmitter from 'node:events';
import { RichTextConstants } from 'src/app/constants/richTextConstants';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  styleUrls: ['./richtext.component.css']
})
export class RichtextComponent implements OnInit {
  public showcolorPicker = false;
  public showStickyColorPicker = false;
  public showFontFamily = false;
  public showFontSize = false;
  public colorsList = RichTextConstants.colorsList;
  public backgroundColorList = RichTextConstants.backgroundColorList;
  public fontFamilies = RichTextConstants.fontFamilyList;
  public fontsizeList = RichTextConstants.fontSizeList;
  public stickyBGColor = '';
  selectedFont = {
    label: '18px',
    val: 4,
  };
  richTextConfig: any = {
    isBold: false,
    isItalic: false,
    isUnderLined: false,
    fontColor: '#000',
    fontFamily: 'Arial',
    fontSize: 3,
    justifyLeft: false,
    justifyCenter: false,
    insertOrderedList: false,
    insertUnorderedList: false,
  };
  @Output() valueChanged = new EventEmitter();
  @Output() backgroundChanged = new EventEmitter();
  @Output() blured = new EventEmitter();
  @Input() richtextRef: any;
  @Input() backgroundColor: any;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.richTextInitialize();
  }
  richTextInitialize(): void {
    this.stickyBGColor = this.backgroundColor;
    const output: any = document.getElementById('output');
    setTimeout(() => {
      output.focus();
      this.setRichtextStyle();
    }, 0);
    const buttons: any = document.getElementsByClassName('tool--btn');
    for (const btn of buttons) {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.command;
        if (cmd === 'createlink') {
          const url: any = prompt('Enter the link here: ', 'http://');
          document.execCommand(cmd, false, url);
        } else {
          document.execCommand(cmd, false, undefined);
        }
      });
    }
    const doc: any = document;
    doc.getElementById('toolbar').onmousedown = (e: any) => {
      e.preventDefault();
    };
    output.onmouseup = () => {
      this.setRichtextStyle();
    };
    output.onkeydown = () => {
      this.setRichtextStyle();
    };
  }
  setRichtextStyle(): void {
    this.richTextConfig = {
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderLined: document.queryCommandState('underline'),
      fontColor: document.queryCommandValue('foreColor')
        ? document.queryCommandValue('foreColor')
        : '#000',
      fontFamily: document.queryCommandValue('fontName')
        ? document.queryCommandValue('fontName').replace(/"/g, '')
        : 'Arial',
      fontSize: document.queryCommandValue('fontSize')
        ? parseInt(document.queryCommandValue('fontSize'), 10)
        : 3,
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    };
    this.cdr.detectChanges();
  }
  changeFontColor(value: any): void {
    var span: any = document.createElement("span");
    span.style.fontWeight = "bold";
    span.style.color = "black";
    if (window.getSelection) {
      var sel: any = window.getSelection();
      if (sel.rangeCount) {
          var range = sel.getRangeAt(0).cloneRange();
          console.log(range);
          range.surroundContents(span);
          sel.removeAllRanges();
          sel.addRange(range);
          console.log(sel)
      }
  }
    this.richTextConfig.fontColor = value;
    document.execCommand('foreColor', false, value);
    this.showcolorPicker = false;
  }
  blurCalled(e: any) {
    // this.blured.emit();
  }
  changeBackgroundColor(event: any, value: any=''): void {
    if(value === '') {
      value = event.target.value;
    }
    event.preventDefault();
    const el: any = document.getElementById('output');
    el.style.backgroundColor = value;
    this.backgroundChanged.emit(value);
    this.stickyBGColor = value;
    this.showStickyColorPicker = false;
  }
  changeFontFamily(val: any): void {
    document.execCommand('fontName', false, val);
    this.richTextConfig.fontFamily = val;
  }
  changeFontSize(val: any): void {
    document.execCommand('fontSize', false, val);
    this.richTextConfig.fontSize = val;
  }
  changeStyleVal(key: any): any {
    this.richTextConfig[key] = !this.richTextConfig[key];
  }
  editText(e: any): void {
    const val: any = e.target.innerHTML;
    this.valueChanged.emit(val);
  }
}
