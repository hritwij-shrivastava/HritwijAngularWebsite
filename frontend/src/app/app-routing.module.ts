import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { ServicesComponent } from './modules/services/services.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { BlogComponent } from './modules/blog/blog.component';
import { ContactComponent } from './modules/contact/contact.component';
import { BlogSingleComponent } from './modules/blog-single/blog-single.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { TutorialComponent } from './modules/tutorial/tutorial.component';
import { TutorialSingleComponent } from './modules/tutorial-single/tutorial-single.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'tutorials', component: TutorialComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'tutorial/:tutorialSlug/:topicSlug', component: TutorialSingleComponent },
  { path: ':section/:category/:slug', component: BlogSingleComponent },
  // { path: 'tutorial/:category/:mainTopic/:subTopic/:slug', component: TutorialSingleComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
