import { Component, ViewChild } from '@angular/core';

import { GameComponent } from '../shared/game/game.component';
import { AsyncService } from '../../../core/services/base.async-service';
import { RestfulServer } from '../../../core/services/restful-server.service';
import { GameFacade } from '../../../core/store/game/game.facade';
import { GAME_TEXT } from '../config/config';
import { RestfulGateway } from '../../../core/gateways/restful.gateway';

@Component({
    selector: 'jhi-single',
    templateUrl: 'single-player.component.html',
    styleUrls: ['single-player.component.css'],
    providers: [

        // Notice how in single player mode we use only the RestfulServer
        // AsyncService by having a multi-provider.
        // In MultiPlayerComponent we override the multi-provider by
        // introducing the WebRTC async service.
        { provide: AsyncService, multi: true, useClass: RestfulServer },

        GameFacade
    ]
})
export class SinglePlayerComponent {
    @ViewChild(GameComponent) game: GameComponent;
    text = GAME_TEXT;

    private gameEnabled = false;
    private time: number;
    private gamePlayed = false;

    gameCompleted(time: number) {
        this.time = time;
        this.gameEnabled = false;
        this.game.reset();
    }

    start() {
        this.gamePlayed = true;
        this.time = 0;
        this.gameEnabled = true;
    }
}
