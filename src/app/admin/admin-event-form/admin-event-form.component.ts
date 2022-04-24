import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Event, EventCategory } from 'src/app/shared/models/event';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-admin-event-form',
  templateUrl: './admin-event-form.component.html',
  styleUrls: ['./admin-event-form.component.scss'],
})
export class AdminEventFormComponent implements OnInit {
  id: string;
  eventForm: FormGroup;
  isSubmitted: boolean = false;
  event: Event;
  eventCategoryTypes = EventCategory.EVENTS; // TODO: add these to translate files

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventService: EventService,
    private toastController: ToastController,
    private alertController: AlertController,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm();

    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.getEvent();
    }
  }

  initForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      alternateName: [''],
      description: [''],
      location: this.formBuilder.group({
        zip: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]]
      }),
      url: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      eventStatus: ['scheduled', [Validators.required]],
      organizer: [''],
      eventCategory: ['', [Validators.required]]
    });
  }

  get startDate() {
    return this.eventForm.controls.startDate;
  }

  get endDate() {
    return this.eventForm.controls.endDate;
  }

  formatDate(value: string): string {
    return format(parseISO(value), 'dd MMM yyyy');
  }

  getEvent() {
    this.eventService.getEventById(this.id).subscribe((res) => {
      this.event = res;
      this.initializeEvent(res);
    });
  }

  initializeEvent(event: Event) {
    this.eventForm.patchValue({
      name: event.name,
      alternateName: event.alternateName,
      description: event.description,
      location: {
        zip: event.location.zip,
        city: event.location.city,
        address: event.location.address,
      },
      url: event.url,
      startDate: event.startDate,
      endDate: event.endDate,
      eventStatus: event.eventStatus,
      organizer: event.organizer,
      eventCategory: event.eventCategory
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      if (this.id) {
        // update event
        this.eventService.updateEventById(this.id, this.eventForm.value).then((res) => {
          this.presentToast(this.translate.instant('shared.success'));
          this.isSubmitted = false;
          this.router.navigate(['/admin/events']);
        }).catch((err) => {
          console.error(err);
          this.presentToast(this.translate.instant('shared.error'), true);
        });
      } else {
        // set event.organizer to user.team : SportTeamRef
        this.authService.getUserProfile().subscribe((res) => {
          this.eventForm.patchValue({
            organizer: res.team
          });
          // add new event to db
          this.eventService.addEvent(this.eventForm.value).then((res) => {
            this.presentToast(this.translate.instant('shared.success'));
            this.isSubmitted = false;
            this.router.navigate(['/admin/events']);
          }).catch((err) => {
            console.error(err);
            this.presentToast(this.translate.instant('shared.error'), true);
          });
        });
      }
    } else {
      this.presentToast(this.translate.instant('shared.err_required'), true);
      return false;
    }
  }

  deleteEvent() {
    this.eventService.deleteEventById(this.id).then((res) => {
      this.presentToast(this.translate.instant('shared.success'));
      this.router.navigate(['/admin/events']);
    }).catch((err) => {
      console.error(err);
      this.presentToast(this.translate.instant('shared.error'), true);
    });
  }

  cancelEvent() {
    this.eventForm.patchValue({
      eventStatus: 'cancelled'
    });
    this.submitForm();
  }

  rescheduleEvent(){
    this.eventForm.patchValue({
      eventStatus: 'rescheduled'
    });
    this.submitForm();
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: this.translate.instant('alert.attention'),
      message: this.translate.instant(msg),
      buttons: [
        {
          text: this.translate.instant('alert.cancel'),
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: this.translate.instant('alert.confirm'),
          id: 'confirm-button',
          handler: () => {
            if (msg === 'event.alert_delete') {
              this.deleteEvent();
            } else if (msg === 'event.alert_cancel') {
              this.cancelEvent();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string, error?: boolean) {
    const toast = await this.toastController.create({
      message,
      color: error ? 'danger' : 'primary',
      duration: 1500
    });
    toast.present();
  }

}
