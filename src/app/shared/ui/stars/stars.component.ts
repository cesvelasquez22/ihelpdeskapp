import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'app-stars',
    template: `
        <div class="flex items-center w-full">
            <div class="flex items-center">
                <mat-icon
                    *ngFor="let fill of fillIcons"
                    class="text-yellow-400"
                    svgIcon="mat_outline:star"
                ></mat-icon>
                <mat-icon
                    *ngFor="let empty of emptyIcons"
                    svgIcon="mat_outline:star_outline"
                ></mat-icon>
            </div>
        </div>
    `,
})
export class StarsComponent implements OnInit {
    @Input() count: number;
    @Input() value: number;
    fillIcons: number[] = [];
    emptyIcons: number[] = [];

    constructor() {}

    ngOnInit(): void {
        this.fillIcons = Array(this.value)
            .fill(this.value)
            .map((x, i) => i);
        if (this.value < this.count) {
            this.emptyIcons = Array(this.count - this.value)
                .fill(this.count - this.value)
                .map((x, i) => i);
        }
    }
}
