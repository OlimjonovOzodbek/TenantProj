import { Component } from '@angular/core';
import { Tenant } from './models/Tenant';
import { ThemeModel } from './models/Theme';
import { TenantServiceService } from './services/tenant-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TRJ';
  tenantId: number = 0; // You can make this dynamic (from route, form, etc.)
  tenant?: Tenant;
  config?: ThemeModel;
  error: string = '';
  backgroundColor: string = 'dark';

  constructor(private tenantService: TenantServiceService) {}

  ngOnInit(): void {
    this.loadTenantData(this.tenantId);
  }

  loadTenantData(id: number): void {
    this.tenantService.getTenantsById(id).subscribe({
      next: (tenant) => {
        this.tenant = tenant;
      },
      error: () => this.error = 'Tenant not found'
    });

    this.tenantService.getThemeById(id).subscribe({
      next: (theme) => {
        this.config = theme;
      },
      error: () => this.error = 'Config not found'
    });
  }
}
