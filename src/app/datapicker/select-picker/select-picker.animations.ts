import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const pickerAnimation: AnimationTriggerMetadata = trigger("open-close",[
    state("open",style({
      opacity: 1,
      height: "300px"
    })),
    state("close",style({
      opacity: 0,
      height: 0
    })),
    transition('open=>close', [
      animate("300ms")
    ]),
    transition('close=>open', [
      animate("300ms")
    ]),
]); 