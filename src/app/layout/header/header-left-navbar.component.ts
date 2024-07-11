import { Component, ChangeDetectionStrategy, OnInit, Injector, HostListener, Renderer2, AfterViewInit, RendererFactory2 } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { ISidebar, SidebarService } from '@shared/services/sidebar/sidebar.service';
import { Subscription } from 'rxjs';
import { filter as _filter } from 'lodash-es';
import { ChangeUserLanguageDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;
  sidebar: ISidebar;
  subscription: Subscription;
  searchKey = '';
  renderer: Renderer2;
  currentLanguage: abp.localization.ILanguageInfo;
  languages: abp.localization.ILanguageInfo[];
  customLanguage=[];

  constructor(injector: Injector, private _layoutStore: LayoutStoreService
    ,private sidebarService: SidebarService,
     private _userService: UserServiceProxy,
     private rendererFactory: RendererFactory2,
     ) {
      
    super(injector);
  }

  ngOnInit(): void {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.languages = _filter(
      this.localization.languages,
      (l) => !l.isDisabled
    );
    this.customLanguage.push(this.languages.find(z=>z.name=='en'),this.languages.find(z=> z.name=='ar'));
    this.currentLanguage = this.localization.currentLanguage;
    if( this.currentLanguage.name=='ar')
    {
      this.checkForDirectionChange();
    }
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );

  }
  checkForDirectionChange(): void {
    this.renderer.addClass(document.body,'rtl');
    this.renderer.setAttribute(
      document.documentElement,
      'direction',
      'rtl'
    );
  }

  changeLanguage(languageName: string): void {
    const input = new ChangeUserLanguageDto();
    input.languageName = languageName;
    this._userService.changeLanguage(input).subscribe(() => {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        abp.appPath
      );

      window.location.reload();
    });
  }

  searchClick(event): void {
  }

  menuButtonClick = (
    e: { stopPropagation: () => void },
    menuClickCount: number,
    containerClassnames: string
  ) => {
    if (e) {
      e.stopPropagation();
    }

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.sidebar.selectedMenuHasSubItems
    );
  }
  searchAreaClick(event): void {
    event.stopPropagation();
  }

  searchKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    } else if (event.key === 'Escape') {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) {
        input.classList.remove('mobile-view');
      }
      this.searchKey = '';
    }
  }

  search(): void {
  }
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event): void {
    const input = document.querySelector('.mobile-view');
    if (input && input.classList) {
      input.classList.remove('mobile-view');
    }
    this.searchKey = '';
  }

  mobileMenuButtonClick = (
    event: { stopPropagation: () => void },
    containerClassnames: string
  ) => {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarService.clickOnMobileMenu(containerClassnames);
  }
}
