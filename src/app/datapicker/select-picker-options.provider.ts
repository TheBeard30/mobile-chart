import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class SelectPickerOptions<T extends { label: string,value: any} = any>{
    data: Array<T>;

    title: string = "标题";

    mask: boolean = true;

    onReset?: EventEmitter<any> = new EventEmitter();

    onConfirm?: EventEmitter<any> = new EventEmitter();

    onPickerChange?: EventEmitter<any> = new EventEmitter();

    hidePicker?: () => void;
   
    cancel?: () => void;

    confirm?: (result) => void;

}

