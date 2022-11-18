import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Url } from '../index/url.model'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  id: string | null = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.http.get<{message: string; url: Url}>('http://localhost:3000/api/urls/' + this.id).subscribe(data => {
          window.location.href = data.url.url;
        }, error => {
          this.error = "This url does not exist!"
        });
      }
    });
  }

}
