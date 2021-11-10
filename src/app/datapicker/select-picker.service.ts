import { Injectable, Injector } from '@angular/core';
import { Overlay,OverlayConfig,OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SelectPickerComponent } from './select-picker/select-picker.component';
import { SelectPickerOptions } from './select-picker-options.provider';

@Injectable({
  providedIn: 'root'
})
export class SelectPickerService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }
   
  show(data: Array<any>): void{
    const config = new OverlayConfig();
    const positionStrategy = this.overlay.position().global().centerVertically().centerHorizontally();
    config.positionStrategy = positionStrategy;  
    config.hasBackdrop = true;
    const overlayRef = this.overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    const options = new SelectPickerOptions<any>();
    options.data = data;
    
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


  // 获取组件实例
  getPortal(injector: Injector){

  }

  
  getRef(overlayRef: OverlayRef){

  }

  // 获取注入器
  getInjector(){

  }
   
  // 获取位置策略
  getPositionStrategy(){

  }


}
