import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css'],
})
export class BrandDeleteComponent implements OnInit {
  brandAddForm: FormGroup;
  brands: Brand[] = [];
  filterText = '';

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Brand deleted');
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
  }
}
