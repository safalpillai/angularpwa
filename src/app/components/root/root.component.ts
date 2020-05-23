import { Component, OnInit } from '@angular/core';
import { ApiService, IItem } from '@services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    items: IItem[];

    constructor(
        private apiService: ApiService,
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.apiService.fetch().subscribe((data: IItem[]) => {
            console.log('DATA', data);
            this.items = data;
        });
    }
}
