import { Component, Renderer2 } from '@angular/core';
import { Tenant } from './models/Tenant';
import { TenantConfig } from './models/tenantConfig';
import { TenantServiceService } from './services/tenant-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TRJ';
  tenantId: number = 1;
  tenant?: Tenant;
  config?: TenantConfig;
  error: string = '';
  backgroundColor: string = 'dark';

  constructor(private tenantService: TenantServiceService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadTenantData(this.tenantId);
  }

  loadTenantData(id: number): void {
    this.tenantService.getTenantsById(id).subscribe({
      next: (tenant) => {
        this.tenant = tenant;
        if (tenant?.configJson) {
          try {
            // Check if configJson is a string before attempting to parse it
            if (typeof tenant.configJson === 'string') {
              this.config = JSON.parse(tenant.configJson);
            } else {
              this.config = tenant.configJson as TenantConfig; // If it's already an object, assign directly
            }
            this.applyTheme(this.config!.theme);
          } catch (e) {
            console.error('Invalid configJson format', e);
            this.error = 'Failed to load tenant configuration';
          }
        }
      },
      error: () => this.error = 'Tenant not found'
    });
  }

  applyTheme(theme: string): void {
    if (theme === 'dark') {
      this.renderer.setStyle(document.body, 'background-color', 'black');
      this.renderer.setStyle(document.body, 'color', 'white');
    } else {
      this.renderer.setStyle(document.body, 'background-color', 'white');
      this.renderer.setStyle(document.body, 'color', 'black');
    }
  }
}
