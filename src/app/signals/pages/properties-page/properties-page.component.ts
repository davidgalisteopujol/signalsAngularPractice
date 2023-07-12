import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {
  

  public counter = signal(10)

  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter() } `)
  })


  increaseBy(value: number){
    this.counter.update(current => current + value)
  }

  onFieldUpdated(field: keyof User, value: string) {

    //Caso de usar el set
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })


    //Caso de usar el update:
    this.user.update(current => {
      return {
        ...current,
        [field]:value
      };
    })

    //caso de usar mutate: recomendado porque evaluamos el tipo de dato
    /*this.user.mutate(current => {
      switch(field) {
        case 'email':
          current.email = value;
        break;

        case 'first_name':
          current.first_name = value;
        break;

        case 'last_name':
        current.first_name = value;
        break;

        case 'id':
        current.id = Number(value);
        break;
      }
    })*/


  }

}
