import { Injectable, Injector } from '@angular/core';
import { Overlay,OverlayConfig,OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SelectPickerComponent } from './select-picker/select-picker.component';
import { SelectPickerOptions } from './select-picker-options.provider';

@Injectable({
  providedIn: 'root'
})
export class SelectPickerService {

  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }
   
  showPicker(pickerConfig: SelectPickerOptions,cancelCallBack?: () => void,confirmCallBack?: (result) => void | any): void{
    const config = new OverlayConfig();
    const positionStrategy = this.overlay.position().global().centerVertically().centerHorizontally();
    config.positionStrategy = positionStrategy;  
    config.hasBackdrop = true;
    const overlayRef = this.overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    const options = new SelectPickerOptions();
    Object.assign(options,pickerConfig,{
      hidePicker: (ev) => this.hidePicker(),
      cancel: () => {if(cancelCallBack) cancelCallBack() },
      confirm: (result) => {if(confirmCallBack) confirmCallBack(result) }
    });

    config.hasBackdrop = options.mask;
    
    this.overlayRef = overlayRef;
    // 生成注入器
    const injector = Injector.create({
      providers: [
        {provide: SelectPickerOptions,useValue: options},
        {provide: OverlayRef,useValue: overlayRef}
      ],
      parent: this.injector
    });
    const partal = new ComponentPortal(SelectPickerComponent,null,injector);
    overlayRef.attach(partal);
  }

  hidePicker(){
    this.overlayRef.dispose();
  }

}
