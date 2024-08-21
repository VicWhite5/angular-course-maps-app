import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuIten{
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu-alone',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu-alone.component.html',
  styleUrl: './side-menu-alone.component.css',	
})
export class SideMenuAloneComponent {
  public menuItems: MenuIten[] = [
    { name: 'Fullscreen', route: '/maps/fullscreen' },
    { name: 'Zoom Range', route: '/maps/zoom-range' },
    { name: 'Markers', route: '/maps/markers' },
    { name: 'Properties', route: '/maps/properties' },
    { name: 'Alone', route: '/alone' },
  ]
}
