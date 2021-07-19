import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { DISHIES } from '../shared/dishes';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @ViewChild('fform') feedbackFormDirective:any;

    dish !: Dish;
    dishIds!: string[];
    prev!: string;
    next!: string;

    commentForm!: FormGroup;
    comment!: Comment;
    d = new Date();
    dishId!: string;         

    formErrors: any = {
        'author': '',
        'comment': ''
    };

    validationMessages: any = {
        'author': {
            'required': 'The Name is required.',
            'minlength': 'The Name must be at least 2 characters long.',
            'maxlength': 'The Name cannot be more than 25 characters long.'
        },
        'comment': {
            'required': 'Comments is required.',
            'minlength': 'Comments must be at least 10 characters long.',
            'maxlength': 'Comments cannot be more than 250 characters long.'
        }
    };

    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location, private fb: FormBuilder,
        @Inject('BaseURL') public BaseURL: any) { }

    ngOnInit(): void {

        this.createForm(); 
        
        let id = this.route.snapshot.params['id'];

        //before use promise
        //this.dish = this.dishservice.getDish(id);

        //after use promise
        //this.dishservice.getDish(id).then(dish => this.dish=dish);

        //this.dishservice.getDish(id).subscribe(dish => this.dish=dish);

        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
            .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }


    goBack(): void {
        this.location.back();
    }

    createForm() {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
            rating: 1            
        });

        this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now    
    }

    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = this.d.toISOString();
        console.log(this.comment);

        this.dish=DISHIES.filter((dish) => (dish.id === this.dishId))[0];
        this.dish.comments.push(this.comment);

        this.commentForm.reset({
          author: '',
          comment: '',
          rating: 1                
        });
        this.feedbackFormDirective.resetForm();
      }
}
