import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'My Awesome App';
    secondes: number;
    counterSubscription: Subscription;

    constructor() { }

    ngOnInit() {
        // Observables
        const counter = Observable.interval(1000);
        this.counterSubscription = counter.subscribe(
            (value) => {
                this.secondes = value;
            },
            (error) => {
                console.log('Uh-oh, an error occurred! : ' + error);
            },
            () => {
                console.log('Observable complete!');
            }
        );
    }

    ngOnDestroy() {
        this.counterSubscription.unsubscribe();
    }
}
