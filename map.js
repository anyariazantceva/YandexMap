"use strict";
window.addEventListener("load", function() {
	const mapElement = document.querySelector("#map");
	const getPosBtn = document.querySelector("#getPosition");

	const myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 3
    });

    getPosBtn.addEventListener("click", function() {
    	if (navigator.geolocation) {
    		let success = (pos) => {
    			let coords = {
    				lat: pos.coords.latitude,
    				lng: pos.coords.longitude
    			};

    			let myPlacemark = new ymaps.Placemark([coords.lat, coords.lng], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            		balloonContentHeader: "Вы сейчас здесь",
            		balloonContentBody: `<div>
                        Широта: <b>${coords.lat}</b> <br>
                        Долгота: <b>${coords.lng}</b> <br>
                    </div>`,
            		hintContent: "Ваше местоположение"
        		}, {
        			preset: 'islands#icon',
            		iconColor: '#0095b6'
        		});

        		myMap.geoObjects.add(myPlacemark);
    		};

    		let error = (err) => {
    			if (err.code === 1) {
    				alert("Вы запретили доступ к местоположению!");
    			} else {
    				alert("Не удалось определить местоположение");
    			}
    		};

    		navigator.geolocation.getCurrentPosition(success, error);

    	} else {
    		alert("Геолокация недоступна!");
    	}
    });

    const locations = [
    	{
            title: "Офис в Испании",
            desc: "Тут жарко, вино, и работать не хочется!",
            coords: {lat: 36.721261, lng: -4.421266}
        },
        {
            title: "Офис на Пхукете",
            desc: "Тут еще жарче, вино тоже есть, и работать ну вообще не хочется!",
            coords: {lat: 7.880448, lng: 98.39225}
        },
        {
            title: "Офис в Сибири",
            desc: "Заберите меня на Пхукет",
            coords: {lat: 55.008353, lng: 82.935733}
        }
    ];

    for (let loc of locations) {
    	let placeMark = new ymaps.Placemark([loc.coords.lat, loc.coords.lng], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            		balloonContentHeader: loc.title,
            		balloonContentBody: loc.desc,
            		hintContent: "Ваше местоположение"
        		}, {
        			preset: 'islands#icon',
            		iconColor: '#0095b6'
        		});

        		myMap.geoObjects.add(placeMark);
    }

});