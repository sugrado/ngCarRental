import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  carUpdateForm: FormGroup;
  filterText1 = '';
  filterText2 = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getById(params['carId']);
        this.createCarUpdateForm();
        console.log(this.car);
      }
    });
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      minFindexPoint: ['', Validators.required],
    });
  }

  getById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.car = response.data;
      console.log(this.car);
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Car Updated');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (responseError) => {
          this.toastrService.error(
            ErrorHelper.getMessage(responseError),
            'Error'
          );
        }
      );
    } else {
      this.toastrService.error('Please fill in the blanks.', 'Error');
    }
  }
}
