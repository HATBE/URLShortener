import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { Url } from 'src/app/models/url.model';

@Component({
  selector: 'app-url-detail',
  templateUrl: './url-detail.component.html',
  styleUrls: ['./url-detail.component.css']
})
export class UrlDetailComponent implements OnInit {

  @Input() shorturl: any = null

  data: any = null;
  isLoading: boolean = false;
  error: string = '';

  urlDate: string = '';

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.urlService.getStats(this.shorturl).subscribe({
      next: this.successLoadingStats.bind(this),
      error: this.errorLoadingStats.bind(this)
    });
  }

  successLoadingStats(data: {data: {stats: {clicked: number}, url: Url}}) {
    this.urlDate = `${new Date(data.data.url.date * 1000).toLocaleDateString("de-CH", {day: "numeric", month: "numeric", year: "2-digit", hour: "numeric", minute: "numeric"})}`;

    this.data = data.data;
    this.isLoading = false;
  }

  errorLoadingStats(data: any) {
    this.isLoading = false;
    this.error = data.error.message;
  }

}
