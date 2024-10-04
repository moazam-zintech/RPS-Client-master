import { Component, ViewEncapsulation } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports:[MatIconModule,MatFormFieldModule, MatCheckboxModule]
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
