// 2.1 Change Detection, OnPush & Lifecycle Hooks

// Task: 
// Given a parent and child Angular component, implement:
// The child with ChangeDetectionStrategy.OnPush
// Track and log change detection runs
// Demonstrate how ngOnChanges is triggered when parent input changes

// Then:
// Optimize unnecessary renders using trackBy, pure pipes, and input immutability

// Focus: 
// Change detection, OnPush, immutability, lifecycle hooks  Solution:


// child.component.ts
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `<div>Child Component: {{ data }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnChanges {
  @Input() data!: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child ngOnChanges triggered:', changes);
  }
}


// parent.component.ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-parent',
  template: `
    <button (click)="changeData()">Change Data</button>
    <app-child [data]="childData"></app-child>
  `
})
export class ParentComponent {
  childData = 'Initial Data';

  changeData() {
    this.childData = 'Updated at ' + new Date().toLocaleTimeString();
  }
}

// PERFORMANCE OPTIMIZATION
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>  trackById(index: number, item: { id: number }) {
  		return item.id;
	}


// Use a Pure Pipe
@Pipe({ name: 'multiply', pure: true })
		export class MultiplyPipe implements PipeTransform {
		  transform(value: number, factor: number): number {
		    return value * factor;
		 }
	}