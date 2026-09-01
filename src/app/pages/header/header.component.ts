import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarService } from 'src/app/ws/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void { }
  /**
   * toggle sidebar nav from small to expand
   */
  toggleSideNav() {
    this.sidebarService.toggle();
  }
}
