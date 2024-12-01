// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { VideosService } from '../../services/videos.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-video-play',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './video-play.component.html',
//   styleUrls: ['./video-play.component.css']
// })
// export class VideoPlayComponent implements OnInit {
//   video: any;
//   videoUrl: SafeResourceUrl | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private videosService: VideosService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit(): void {
//     const videoId = this.route.snapshot.paramMap.get('id');
//     if (videoId) {
//       this.loadVideo(videoId);
//     } else {
//       console.error('Nenhum ID de vídeo encontrado na rota.');
//     }
//   }

//   /**
//    * Carrega os dados do vídeo e incrementa as visualizações.
//    * @param videoId O ID do vídeo a ser carregado.
//    */
//   loadVideo(videoId: string): void {
//     this.videosService.getVideos().subscribe(
//       (videos) => {
//         this.video = videos.find((v) => v.id === videoId);
//         if (this.video) {
//           const embedUrl = this.getEmbedUrl(this.video.url);
//           this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

//           this.incrementVideoViews(videoId, this.video.views);
//         } else {
//           console.error('Vídeo não encontrado.');
//         }
//       },
//       (error) => {
//         console.error('Erro ao carregar vídeos:', error);
//       }
//     );
//   }

//   /**
//    * Incrementa as visualizações de um vídeo.
//    * @param videoId O ID do vídeo.
//    * @param currentViews A contagem atual de visualizações.
//    */
//   incrementVideoViews(videoId: string, currentViews: number): void {
//     this.videosService.incrementVideoViews(videoId, currentViews).subscribe({
//       next: () => console.log('Visualizações incrementadas com sucesso!'),
//       error: (err) => console.error('Erro ao incrementar visualizações:', err),
//     });
//   }

//   /**
//    * Incrementa os likes de um vídeo.
//    * @param videoId O ID do vídeo.
//    * @param currentLikes A contagem atual de likes.
//    */
//   incrementVideoLikes(videoId: string, currentLikes: number): void {
//     this.videosService.incrementVideoLikes(videoId, currentLikes).subscribe({
//       next: (updatedVideo) => {
//         console.log('Likes incrementados com sucesso!');
//         this.video.likes = updatedVideo.likes; // Atualiza os likes localmente
//       },
//       error: (err) => console.error('Erro ao incrementar likes:', err),
//     });
//   }

//   /**
//    * Converte uma URL do YouTube para o formato de incorporação.
//    * @param url A URL original do YouTube.
//    * @returns A URL de incorporação para iframe.
//    */
//   private getEmbedUrl(url: string): string {
//     const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
//     const videoId = videoIdMatch ? videoIdMatch[1] : '';
//     return `https://www.youtube.com/embed/${videoId}`;
//   }

//   /**
//    * Retorna à página de seleção de vídeos.
//    */
//   goBack(): void {
//     this.router.navigate(['/video-selection']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideosService } from '../../services/videos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})
export class VideoPlayComponent implements OnInit {
  video: any;
  videoUrl: SafeResourceUrl | null = null;
  hasLiked: boolean = false; // Flag para controlar se o like já foi dado

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videosService: VideosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (videoId) {
      this.loadVideo(videoId);
    } else {
      console.error('Nenhum ID de vídeo encontrado na rota.');
    }
  }

  /**
   * Carrega os dados do vídeo e incrementa as visualizações.
   * @param videoId O ID do vídeo a ser carregado.
   */
  loadVideo(videoId: string): void {
    this.videosService.getVideos().subscribe(
      (videos) => {
        this.video = videos.find((v) => v.id === videoId);
        if (this.video) {
          const embedUrl = this.getEmbedUrl(this.video.url);
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

          this.incrementVideoViews(videoId, this.video.views);
        } else {
          console.error('Vídeo não encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao carregar vídeos:', error);
      }
    );
  }

  /**
   * Incrementa as visualizações de um vídeo.
   * @param videoId O ID do vídeo.
   * @param currentViews A contagem atual de visualizações.
   */
  incrementVideoViews(videoId: string, currentViews: number): void {
    this.videosService.incrementVideoViews(videoId, currentViews).subscribe({
      next: () => console.log('Visualizações incrementadas com sucesso!'),
      error: (err) => console.error('Erro ao incrementar visualizações:', err),
    });
  }

  /**
   * Incrementa os likes de um vídeo.
   * @param videoId O ID do vídeo.
   * @param currentLikes A contagem atual de likes.
   */
  incrementVideoLikes(videoId: string, currentLikes: number): void {
    if (this.hasLiked) {
      console.log('O usuário já deu like neste vídeo.');
      return;
    }

    this.videosService.incrementVideoLikes(videoId, currentLikes).subscribe({
      next: (updatedVideo) => {
        console.log('Likes incrementados com sucesso!');
        this.video.likes = updatedVideo.likes; // Atualiza os likes localmente
        this.hasLiked = true; // Marca que o usuário deu like
      },
      error: (err) => console.error('Erro ao incrementar likes:', err),
    });
  }

  /**
   * Converte uma URL do YouTube para o formato de incorporação.
   * @param url A URL original do YouTube.
   * @returns A URL de incorporação para iframe.
   */
  private getEmbedUrl(url: string): string {
    const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://www.youtube.com/embed/${videoId}`;
  }

  /**
   * Retorna à página de seleção de vídeos.
   */
  goBack(): void {
    this.router.navigate(['/video-selection']);
  }
}
