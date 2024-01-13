# Routing
```cs
// app.module.ts: importeer RouterModule
RouterModule.forRoot([
  {path: "path", component: blablaComponent},
  {path: "**", redirecTo: "home"}, // alle andere paths naar home
  { path: '', redirectTo: 'home', pathMatch: "full"} // root
])
```
```cs
// in je app.component.html
<router-outlet></router-outlet>
```

Als je routes gebruikt mag je geen href attribuut gebruiken wel routerlink zoals hier:
```cs
<a routerLink="/">
```

# HTTP requests
## app module

```cs
import { HttpClientModule } from '@angular/common/http'; // add in imports app module
```

## service met observables
// service

```cs
import { HttpClient } from '@angular/common/http';
constructor(private http: HttpClient) { } // injecteer in je service
this.http.get<IYourDataType>('url/to/your/api',); // maak get request naar je api
```

```cs
// maak interface voor easier access tot de objecten, helpt met autocompletion bij coding
export interface IYourDataTypes {
  id: number;
  name: string;
  // meer velden...
}
```
// component
```cs
constructor(private svc: BLABLA){} // BLABLA = de service class dat je export

ngOnInit(): void {
  this.svc.method().subscribe(d => {
  //doe wat je wilt met je data hier
  console.log(d);
  this.data = d
})}
```

## service met async (cleaner dan observables)
// terug naar service
```cs
this.http.get<IYourDataType>('url/to/your/api',).toPromise();
```
// component async
```cs
// ngOnInit wordt een async methode en add geen type dus geen void
async ngOnInit() {
  this.data = await this.svc.method();
}
```

Voeg het volgende toe aan je tsconfig.json bestand om json files te kunnen importeren:
```
"resolveJsonModule": true,
"esModuleInterop": true,
```

# NestJS

```cs
npm i -g @nestjs/cli // voor installatie
nest new project-name
cd project-name
nest g controller [name]
nest g service [name]
```
SERVICE:
```cs
// 1. maak de controller
// 2. maak de service
// 3. maak types.ts waar je u interface/datatype maakt voor de json data
// 4. importeer jsondata en voeg de jsondata toe aan je class
  private _data: DataType[] = jsondata;
// 5. importeer de interface
  import { IinterfaceNaam } from 'src/types';
// 6. maak de gevraagde methodes in je service
// opt. als je exceptions wilt throwen bv bij non existent data, voeg dit toe bij imports (common)
  HttpException, HttpStatus
  // vervolgens kan je dit doen
  throw new HttpException("data not found", HttpStatus.NOT_FOUND);
```
CONTROLLER:
```cs
// 1. importeer de service, de nodige requests en indien nodig datatypes/interfaces
  import { ServiceNaam } from 'src/pokedex/pokedex.service';
  import { IDatatype } from 'src/types';
  import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// 2. declareer de service in je constructor
  constructor(private _servicenaam: ServiceNaam) {}
// 3. maak de gevraagde requests en return de gevraagde resultaat dat van de service komt, bijvoorbeeld:
  @get() // Get/Post/Put/Delete
  public smthn(){ return this._servicenaam.method()}

  @Get(':id') // @Param haalt van de URL
  public smthn(@Param('id') id: string){ return this._servicenaam.method(id);}

  @Post() // Met @Body() haal je de hele request body op, die je verwacht van het type TurkiyeL te zijn.
  public smthn(@Body() data: TurkiyeL){ return this._servicenaam.method(data);}

  @Put(":id") 
  public smthn(@Body() data: TurkiyeL, @Param('id') id: string) { return this._servicenaam.method(id, pokemon);}
```

CONNECTEER:
```cs
npm run start:dev
// Als je errors bekomt, voeg dit toe aan main.ts in je Nest.js
app.enableCors();
```


## JSON data manipulatie
```cs
// Assuming this._pokemon is an array of Pokemon objects like:
// [
//   { "id": "001", "name": "Bulbasaur", "type": "Grass" },
//   { "id": "004", "name": "Charmander", "type": "Fire" },
//   ...
// ]

// Find an item by id
// Input: id = "004"
// Output: { "id": "004", "name": "Charmander", "type": "Fire" }
this._pokemon.find(p => p.id === "004");

// Find the index of an item by id
// Input: id = "004"
// Output: 1 (assuming Charmander is at index 1)
this._pokemon.findIndex(p => p.id === "004");

// Check if an item exists
// Input: id = "010"
// Output: true (if a Pokemon with id "010" exists)
this._pokemon.some(p => p.id === "010");

// Add a new item
// Input: { "id": "152", "name": "Chikorita", "type": "Grass" }
// Output: Length of the new array after adding Chikorita
this._pokemon.push({ "id": "152", "name": "Chikorita", "type": "Grass" });

// Create a new id for a Pokemon
// Input: None
// Output: "153" (if the highest existing id was "152")
(Math.max(...this._pokemon.map(p => parseInt(p.id))) + 1).toString();

// Update an item by index
// Input: index = 1, { "id": "004", "name": "Charizard", "type": "Fire" }
// Output: { "id": "004", "name": "Charizard", "type": "Fire" }
this._pokemon[1] = { "id": "004", "name": "Charizard", "type": "Fire" };

// Delete an item by index
// Input: index = 1
// Output: Array without the second item.
this._pokemon.splice(1, 1);

// Filter out items based on a condition
// Input: type = "Fire"
// Output: [{ "id": "004", "name": "Charizard", "type": "Fire" }, ...]
this._pokemon.filter(p => p.type === "Fire");

// Get a property value from all items
// Input: None
// Output: ["Bulbasaur", "Charizard", ...]
this._pokemon.map(p => p.name);

// Reduce the array to a single value (concatenate names)
// Input: None
// Output: "Bulbasaur Charizard ..."
this._pokemon.reduce((acc, p) => acc + p.name + ' ', '').trim();

// Check if every item meets a condition
// Input: level = 5
// Output: false (if not every Pokemon has a level > 5)
this._pokemon.every(p => p.level > 5);

// Sort the items by id
// Input: None
// Output: Array of Pokemon objects sorted by id
this._pokemon.sort((a, b) => parseInt(a.id) - parseInt(b.id));

// merge arrays
this.allTweets = tweets.profiles.map(profile => ({
  ...profile,
  tweets: tweets.tweets.filter(tweet => tweet.handle === profile.handle)
}));

this.allTweets = tweets.profiles.map(profile => ({
  ...profile,
  tweets: tweets.tweets
    .filter(tweet => tweet.handle === profile.handle)
    .map(tweet => ({
      ...tweet,
      createdOn: this.formatDate(tweet.createdOn)
    }))
}));
```

# JSON-server
```cs
npm install json-server
json-server --watch db.json --port 8000

// connect to json-server with nest.js
npm i --save @nestjs/axios axios
// import module
@Module({
  imports: [HttpModule],
  providers: [CatsService],
})
export class CatsModule {}
// uit je server halen
constructor(private readonly httpService: HttpService) {}
return this.httpService.get('http://localhost:3000/cats');
return this.httpService.post('http://localhost:3000/items', data);
// in je service
```

### voorbeeld types.ts 

```cs
export interface Pokemon {
    id?: string;
    species_id: string;
    height: string;
    weight: string;
    base_experience: string;
    order: string;
    is_default: string;
    name: string,
    sprites: {
        normal: string,
        animated: string
    }
}
```

### readable date
``` {{tweet.createdOn | date:'medium'}} ``` pipeline gebruiken

# 2 way binding
```cs
import { FormsModule } from '@angular/forms';
...
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ]})
...
```


Je kan een parameter van de route opvragen op de volgende manier:
```cs
import {ActivatedRoute} from '@angular/router';

constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    let id = params.get("id")!;
  })
}
```

get all json data from online api

```cs
// 1. Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.example.com/data'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // 2. Create a method to fetch JSON data
  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
// OR

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.example.com/data'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create an async method to fetch JSON data
  async fetchData(): Promise<any> {
    try {
      const data = await this.http.get<any>(this.apiUrl).toPromise();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

```