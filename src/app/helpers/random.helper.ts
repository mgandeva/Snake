import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RandomHelper {
    randomNumber(minValue: number, maxValue: number): number {
        const randomNumber = Math.random();
        const interval = maxValue - minValue + 1;

        return minValue + Math.floor(randomNumber * interval);
    }
}
