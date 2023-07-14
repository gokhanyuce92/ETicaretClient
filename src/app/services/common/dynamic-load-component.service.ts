import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef          : Dinamak olarak yüklenecek componenti içerisinde barındıran container'dır. (Her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)
  //ComponentFactory          : Component'lerin instance'larını olusturmak için kullanılan nesnedir.
  //ComponentFactoryResolver  : Belirli bir component için ComponentFactory'i resolve eden sınıftır. İçerisindeki resolveComponentFactory fonksiyonu aracılıgıyla ilgili componente dair bir ComponentFactory nesnesi olusturup, döner.

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;    

    switch(component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
  }
}

export enum ComponentType {
  BasketsComponent
}