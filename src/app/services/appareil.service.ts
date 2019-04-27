import { Subject } from 'rxjs';

export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    private appareils = [
        {
            id: 1,
            name: 'Machine à laver',
            status: 'éteint'
        },
        {
            id: 2,
            name: 'Frigo',
            status: 'allumé'
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 'éteint'
        }
    ];

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (s) => {
                return s.id === id;
            }
        );
        return appareil;
    }

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnAll(): void {
        for (const appareil of this.appareils) {
            appareil.status = 'allumé';
            this.emitAppareilSubject();
        }
    }

    switchOffAll(): void {
        for (const appareil of this.appareils) {
            appareil.status = 'éteint';
            this.emitAppareilSubject();
        }
    }

    switchOnOne(i: number): void {
        this.appareils[i].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(i: number): void {
        this.appareils[i].status = 'éteint';
        this.emitAppareilSubject();
    }
}
