# Moment 2 - REST-webbtjänst
I denna uppgift skrivs en REST API med express och node. API:et inheåller olika arbetsplatser (fiktiva) 
som jag arbetat hos. Den inehåller funktionerna för CRUD (Create, Read, Update, Delete).

## Installation
Uppgiften använder sig av MongoDB som databas, den är uppladdad via Render.

I databasen finns det en collection som ser ut enligt nedan.
 
### workexperience

| id   | companyname    | jobtitle   | location    | startdate   | enddate  | 
| ---- | -------------- | ---------- | ---------- | ----------- | -------- |
| 1  | Företag1  | vd  | Platsen  | 2024-01-01     | 2024-02-01 |



## Användning
 Hur man användet det:

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| GET   | /workexperience    | Hämtar alla arbetsplatser   | 
| POST   | /workexperience    | Lagrar nytt företag(workexperience), måste skickas med all info som krävs   | 
| PUT   | /workexperienceid    | Uppdaterar ett företag(workexperience) med ny info, uppdaterar den med medskicka id. | 
| DELETE   | /workexperienceid    | Raderar kurs med medskickat id  | 


Ett företag(workexperience) har strukturen enligt nedan med JSON format. 

```json
{
  "id": "1"
   "companyname": "Företag1",
   "jobtitle": "vd",
   "location": "Platsen",
   "startdate": "2024-01-01",
    "enddate": "2024-02-01"
    "__v": 0
}
```

Dock så har jag sorterat ut __v direkt vid hämtning.




