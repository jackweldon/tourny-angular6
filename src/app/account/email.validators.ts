import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class EmailValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainerSpace: true };
        }
        return null;
    }

    static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('going off to check if its unique');
                if ((control.value === 'jack@email.com')) {
                    resolve({ shouldBeUnique: true });
                }
                else resolve(null);
            }, 2000);

        });
    }
}