import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { VideosService } from '../../services/videos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-selection.component.html',
  styleUrls: ['./video-selection.component.css']
})
export class VideoSelectionComponent implements OnInit {
  videos: any[] = [];
  filteredVideos: any[] = [];
  searchQuery: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private videosService: VideosService
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videosService.getVideos().subscribe(
      (videos) => {
        this.videos = videos;
        this.filteredVideos = videos;
      },
      (error) => console.error('Erro ao carregar vídeos:', error)
    );
  }

  filterVideos(): void {
    if (!this.searchQuery) {
      this.filteredVideos = this.videos;
    } else {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  viewVideo(videoId: string): void {
    this.router.navigate(['/video', videoId]);
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
