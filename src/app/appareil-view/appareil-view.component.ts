import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-appareil-view',
    templateUrl: './appareil-view.component.html',
    styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

    appareils: any[];
    isAuth = false;
    appareilSubscription: Subscription;

    lastUpdate = new Promise((resolve, reject) => {
        const date = new Date();
        setTimeout(
            () => {
                resolve(date);
            }, 2000
        );
    });

    constructor(private appareilService: AppareilService, private authService: AuthService) {
        this.isAuth = this.authService.isAuth;
    }

    ngOnInit() {
        this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
            (appareils: any[]) => {
                this.appareils = appareils;
            }
        );
        this.appareilService.emitAppareilSubject();
    }

    onAllumer() {
        // Call to Service's SwitchOnAll Method
        this.appareilService.switchOnAll();
    }

    onEteindre() {
        // Call Service's SwitchOffAll Method
        if (confirm('Êtes-vous sûr de vouloir éteindre tous vos appareils ?')) {
            this.appareilService.switchOffAll();
        }
    }

    ngOnDestroy() {
        this.appareilSubscription.unsubscribe();
    }
}
