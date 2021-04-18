## Karakterrel kapcsolatos:

    Karakter séma létrehozása a szükséges adatok megadásával:
    	Karakter neve
    	Karakter faja
    	Karakter háttértörténe
    	Karakter kasztja
    	Karakter specializációi
    	Felhasználó neve, aki alkotta

    Endpointok:

    Mindegyik lekéréshez autorizáció szükséges, amely sütiben tárolt token segítségével működik, bejelentkezés után

    	get('/allcharacters'):
    		Az összes karakter lekérése mongoDB-ről
    	get('/character'):
    		Egy adott felhasználó karaktereinek lekérése mongoDB-ről
    	post('/character'):
    		Felhasználó által készített karakter feltöltése mongoDB-be
    	delete('/character/:id):
    		Egy adott karakter törlése ID alapján

## Felhasználóval kapcsolatos:

    Felhasználói séma létrehozása a szükséges adatok megadásával:
    	Felhasználó neve
    	Felhasználó jelszava
    	Felhasználó neme
    	Felhasználó e-mail címe

    Endpointok:

    	post('/register'):
    		Felhasználó nevének ellenőrzése, hogy nincsen azonos nevű az adatbázisban
    		Felhasználó jelszavának hashelése
    		Felhasználó elkészítése, majd feltöltése mongoDB-be

    	post('/login'):
    		Megkeresni egy azonos nevű felhasználót az adatbázisban
    		Bekért jelszó összehasonlítása az adatbázisban lévővel
    		Felhasználói token készítése jwt segítségével, és annak eltárolása sütiben

    	get('/logout'):
    		Token törlése sütiből

    	Autorizáió szükséges a profilképpel kapcsolatos dolgokhoz.

    	post('/upload'):
    		Profilkép feltöltése az upload mappába
    		Feltöltött képek elérése /api/files/ úton

    	get('/user'):
    		Bejelentkezett felhasználó ID-jának lekérése, hogy a profilkép is úgy legyen elnevezve

    	get('/csrf-protection'):
    		Sütihez csrf token hozzáadása a biztonság érdekében
