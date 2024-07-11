import { Component, HostListener, Injector, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { RoleServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit, OnDestroy {
  submitting = false;
  innerWidth;
  showPassword: boolean = false;
  currentLanguage: abp.localization.ILanguageInfo;
  lang;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    injector: Injector,
    private renderer: Renderer2,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
  ) {
    super(injector);

  }
  ngOnInit(): void {
    this.lang = this.localization.currentLanguage;
    if (this.lang.name== "ar") {
      this.checkForDirectionChange();
    }
    this.renderer.addClass(document.body, 'background');
    this.renderer.addClass(document.body, 'no-footer');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'background');
    this.renderer.removeClass(document.body, 'no-footer');
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  checkForDirectionChange(): void {
    this.renderer.addClass(document.body, 'rtl');
    this.renderer.setAttribute(
      document.documentElement,
      'direction',
      'rtl'
    );
  }
  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }
  togglePasswordVisibilty() {
    console.log(this.showPassword)
    this.showPassword = !this.showPassword;
  }
  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));

  }
}
