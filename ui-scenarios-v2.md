# MiniShop v2 testistsenaariumid

| Testi ID | Nõue                   | Õige stsenaarium                                       | Vale sisend või piirjuht                                   |
| -------- | ---------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| UI-11    | REQ-UI-08 – sortimine  | Odavaim toode on esimene: Wireless Mouse, 24.50 €.     | Kontrollida hinnajärjestust kasvavalt.                     |
| UI-12    | REQ-UI-08 – sortimine  | Kalleim toode on esimene: Monitor 27", 249.00 €.       | Kontrollida hinnajärjestust kahanevalt.                    |
| UI-13    | REQ-UI-09 – kogus      | USB-C Hub kogus on 3, rea summa ja kogusumma 117.00 €. | Kontrollida koguse muutmise mõju summale.                  |
| UI-14    | REQ-UI-09 – kogus      | Kogus 0 ei ole lubatud.                                | Sisestada koguseks 0.                                      |
| UI-15    | REQ-UI-10 – sooduskood | SAVE10 annab ühe toote puhul 10% allahindlust.         | Kontrollida ühe toote allahindlust.                        |
| UI-16    | REQ-UI-10 – sooduskood | SAVE10 annab kahe toote kogusummalt 10% allahindlust.  | Vahesumma 63.50 €, allahindlus −6.35 €, kogusumma 57.15 €. |
| UI-17    | REQ-UI-11 – vale kood  | Vale sooduskood kuvab teate ega muuda kogusummat.      | Sisestada kood INVALID.                                    |
| UI-18    | REQ-UI-06 – e-post     | Neli vigast e-posti aadressi lükatakse tagasi.         | `mari@`, `@example.com`, `mari@example`, `not-an-email`.   |
