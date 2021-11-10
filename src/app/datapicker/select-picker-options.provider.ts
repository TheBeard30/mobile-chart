import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class SelectPickerOptions<T> {
    data: Array<T>;

    onPickerChange?: EventEmitter<any> = new EventEmitter();

    hidePicker: () => void;
   
    cancel?: () => void;

    confirm?: (result) => void;

}