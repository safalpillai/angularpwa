import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService, IItem } from '@services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    items: IItem[];
    deferredPrompt: any;
    
    @HostListener('window:beforeinstallprompt', ['$event']) 
    beforeinstallprompt(event) {
        console.log('HOSTLISTENER', event);
        event.preventDefault();
        this.deferredPrompt = event;
    }

    constructor(
        private apiService: ApiService,
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }

    addToHomeScreen() {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') console.log('USER ACCEPTED A2H');
            else console.log('USER REJECTED A2H');
            this.deferredPrompt = null;
        });
    }

    fetchData() {
        this.apiService.fetch().subscribe((data: IItem[]) => {
            this.items = this.randomizeData(data);
        });
    }

    randomizeData(data: any[]): any[] {
        const pushedIndexes: number[] = [];
        const randomData: any[] = [];
        while (data?.length !== randomData?.length) {
            let random;
            if (data?.length === randomData?.length) break;
            else { 
                random = this.nonRepeatingRandomNumber(data.length);
                if (!pushedIndexes.includes(random)) {
                    randomData.push(data[random]);
                    pushedIndexes.push(random);
                }
            }
        }
        return randomData;
    }

    random: number = -1;
    nonRepeatingRandomNumber(end: number): number {
        const _random = Math.ceil(Math.random() * end - 1);
        return _random !== this.random ? (this.random = _random, _random) : this.nonRepeatingRandomNumber(end);
    }
}
