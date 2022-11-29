import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Url } from 'src/app/models/url.model';
import { Title } from '@angular/platform-browser';

import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
  providers: [
    Title
  ],
})
export class RedirectComponent implements OnInit {

  id: string | null = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private urlService: UrlService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.urlService.getUrl(this.id).subscribe({
          next: this.successLoadingUrl.bind(this),
          error: this.errorLoadingUrl.bind(this)
        });
      }
    });
  }

  successLoadingUrl(data: {message: string, url: Url}) {
    this.title.setTitle("Success, redirecting...");
    let url = data.url.url;
    window.location.href = url;
  }

  errorLoadingUrl() {
    this.error = "This url does not exist!";
    this.title.setTitle("Error, failed to redirect");
  }

}
