import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Rebuttal } from './rebuttal.model';
import { RebuttalService } from './rebuttal.service';

@Component({
    selector: 'jhi-rebuttal-detail',
    templateUrl: './rebuttal-detail.component.html'
})
export class RebuttalDetailComponent implements OnInit, OnDestroy {

    rebuttal: Rebuttal;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private rebuttalService: RebuttalService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['rebuttal']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRebuttals();
    }

    load(id) {
        this.rebuttalService.find(id).subscribe((rebuttal) => {
            this.rebuttal = rebuttal;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRebuttals() {
        this.eventSubscriber = this.eventManager.subscribe('rebuttalListModification', (response) => this.load(this.rebuttal.id));
    }
}
