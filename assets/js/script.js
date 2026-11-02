const films = [
   {
      id: 1,
      titolo: 'C\'era una volta in America',
      regista: 'Sergio Leone',
      categoria: 'Drammatico',
      anno: 1984,
      rating: 5,
      visto: true,
   },
   {
      id: 2,
      titolo: 'Apocalypse Now',
      regista: 'Francis Ford Coppola',
      categoria: 'Azione',
      anno: 1979,
      rating: 4,
      visto: true,
   },
   {
      id: 3,
      titolo: 'Taxi Driver',
      regista: 'Martin Scorsese',
      categoria: 'Noir',
      anno: 1976,
      rating: 4,
      visto: true,
   },
   {
      id: 4,
      titolo: 'I sette samurai',
      regista: 'Akira Kurosawa',
      categoria: 'Azione',
      anno: 1954,
      rating: 5,
      visto: true,
   },
   {
      id: 5,
      titolo: 'Stalker',
      regista: 'Andrej Tarkovskij',
      categoria: 'Fantascienza',
      anno: 1979,
      rating: 3,
      visto: false,
   },
   {
      id: 6,
      titolo: 'Quei bravi ragazzi',
      regista: 'Martin Scorsese',
      categoria: 'Drammatico',
      anno: 1990,
      rating: 4,
      visto: true,
   },
   {
      id: 7,
      titolo: '8½',
      regista: 'Federico Fellini',
      categoria: 'Drammatico',
      anno: 1963,
      rating: 4,
      visto: true,
   },
   {
      id: 8,
      titolo: '2001: Odissea nello spazio',
      regista: 'Stanley Kubrick',
      categoria: 'Fantascienza',
      anno: 1968,
      rating: 5,
      visto: true,
   },
   {
      id: 9,
      titolo: 'Pulp Fiction',
      regista: 'Quentin Tarantino',
      categoria: 'Drammatico',
      anno: 1994,
      rating: 3,
      visto: false,
   },
   {
      id: 10,
      titolo: 'Indagine su un cittadino al di sopra di ogni sospetto',
      regista: 'Elio Petri',
      categoria: 'Thriller',
      anno: 1970,
      rating: 5,
      visto: true,
   },
   {
      id: 11,
      titolo: 'Memories of Murder',
      regista: 'Bong Joon-ho',
      categoria: 'Thriller',
      anno: 2003,
      rating: 4,
      visto: false,
   },
];

const filmsSection = document.querySelector('#films');
const addBtn = document.querySelector('#aggiungi-btn');
const avviso = document.querySelector('#notifica');
const ricerca = document.querySelector('#ricerca');
const watched = document.querySelector('#watched');
const ordinamento = document.querySelector('#ordinamento');
const btnCrescente = document.querySelector('#crescente');
const btnDecrescente = document.querySelector('#decrescente');
const modeButton = document.querySelector('.mode-btn');
const btnText = document.getElementById('btn-text');

window.onload = () => {
   rendiFilms(films);
};

modeButton.addEventListener('click', function () {
   const cssFile = document.getElementById('cssFile');
   const icona = document.getElementById('icona');

   if (cssFile.href.endsWith('style.css')) {
      cssFile.href = 'assets/css/style2.css';
      btnText.textContent = ' Tema chiaro';
      icona.className = 'fa-solid fa-sun';
   } else {
      cssFile.href = 'assets/css/style.css';
      btnText.textContent = ' Tema scuro';
      icona.className = 'fa-solid fa-moon';
   }
});

function rendiFilms(arrayFilms) {
   filmsSection.textContent = ''
   stats();

   arrayFilms.forEach(film => {
      const article = document.createElement('article');
      article.classList.add('film-container');
      article.dataset.id = film.id
      if (film.visto) {
         article.classList.add('visto');
      } else {
         article.classList.add('da-vedere');
      }

      const filmCardDiv = document.createElement('div');
      filmCardDiv.classList.add('film-card');

      const title = document.createElement('h3');
      title.classList.add('film-title');
      title.textContent = film.titolo;
      filmCardDiv.appendChild(title);

      const director = document.createElement('span');
      director.classList.add('film-info');
      director.textContent = film.regista + ' - ';
      filmCardDiv.appendChild(director);

      const category = document.createElement('span');
      category.classList.add('film-info');
      category.textContent = film.categoria + ' - ';
      filmCardDiv.appendChild(category);

      const annoUscita = document.createElement('span');
      annoUscita.classList.add('film-info');
      annoUscita.textContent = film.anno;
      filmCardDiv.appendChild(annoUscita);

      const valutazione = document.createElement('p');
      valutazione.classList.add('film-rating');
      let stelle = '';
      for (let i = 0; i < 5; i++) {
         if (i < film.rating) {
            stelle += '★';
         } else {
            stelle += '☆';
         }
      }
      valutazione.textContent = `${stelle} (${film.rating})`;
      filmCardDiv.appendChild(valutazione);

      article.appendChild(filmCardDiv);

      const btnContainerDiv = document.createElement('div');
      btnContainerDiv.classList.add('film-btn-container');

      const badge = document.createElement('span');
      badge.classList.add('film-badge');
      const clickBadge = document.createElement('button');
      clickBadge.type = 'button';
      clickBadge.classList.add('film-btn');
      if (film.visto === true) {
         badge.classList.add('badge-visto');
         badge.textContent = 'Visto';
         clickBadge.textContent = 'Segna da vedere';
      } else {
         badge.classList.add('badge-da-vedere');
         badge.textContent = 'Da vedere';
         clickBadge.textContent = 'Segna visto';
      }
      btnContainerDiv.appendChild(badge);
      btnContainerDiv.appendChild(clickBadge);

      clickBadge.addEventListener('click', (e) => {
         e.preventDefault();
         const id = Number(e.target.closest('article').dataset.id);
         for (let i = 0; i < films.length; i++) {
            if (films[i].id === id) {
               if (films[i].visto === true) {
                  films[i].visto = false;
               } else {
                  films[i].visto = true;
               }
               break;
            }
         }
         mostraNotifica(true);
         rendiFilms(films);
      });

      const btnModifica = document.createElement('button');
      btnModifica.type = 'button';
      btnModifica.classList.add('film-btn');
      btnModifica.textContent = 'Modifica';
      btnContainerDiv.appendChild(btnModifica);

      btnModifica.addEventListener('click', (e) => {
         e.preventDefault();
         const allElements = document.querySelectorAll('button, select, input, a');
         if (btnModifica.textContent === 'Modifica') {
            allElements.forEach(elements => {
               if (elements !== btnModifica) {
                  elements.disabled = true;
                  elements.classList.add('disabilitato');
               }
            });
            btnModifica.textContent = 'Salva';
            valutazione.textContent = '☆☆☆☆☆: ';
            const inputModifica = document.createElement('input');
            inputModifica.type = 'number';
            inputModifica.value = film.rating;
            inputModifica.min = '1';
            inputModifica.max = '5';
            inputModifica.classList.add('input-modifica');
            valutazione.appendChild(inputModifica);
         } else {
            const newRating = Number(valutazione.querySelector('input').value);
            if (newRating >= 1 && newRating <= 5) {
               film.rating = newRating;
               allElements.forEach(element => {
                  element.classList.remove('disabilitato');
                  element.disabled = false;
               });
               mostraNotifica(true);
               rendiFilms(films);
            } else {
               mostraNotifica(false);
            }
         }
      });

      const btnElimina = document.createElement('button');
      btnElimina.type = 'button';
      btnElimina.classList.add('film-btn');
      btnElimina.textContent = 'Elimina';
      btnContainerDiv.appendChild(btnElimina);

      btnElimina.addEventListener('click', (e) => {
         e.preventDefault();
         for (let i = 0; i < films.length; i++) {
            const id = Number(e.target.closest('article').dataset.id);
            if (films[i].id === id) {
               films.splice(i, 1);
               break;
            }
         }
         mostraNotifica(true);
         rendiFilms(films);
      });

      article.appendChild(btnContainerDiv);
      filmsSection.appendChild(article);
   });
}

function mostraNotifica(risultato) {
   const avviso = document.querySelector('#notifica');
   avviso.classList.remove('green', 'red');
   if (risultato === true) {
      avviso.textContent = 'Operazione riuscita';
      avviso.classList.add('green');
   } else {
      avviso.textContent = 'Operazione non riuscita';
      avviso.classList.add('red');
   }

   avviso.style.display = 'block';
   const timeout = () => {
      avviso.style.display = 'none';
   }
   setTimeout(timeout, 2000);
}

addBtn.addEventListener('click', (e) => {
   e.preventDefault();
   const inputTitolo = document.querySelector('#titolo');
   const inputRegista = document.querySelector('#regista');
   const inputCategoria = document.querySelector('#categoria');
   const inputAnno = document.querySelector('#anno');
   const selectRating = document.querySelector('#rating');
   const selectScelta = document.querySelector('#scelta');

   if (
      inputTitolo.value.trim() === '' ||
      inputRegista.value.trim() === '' ||
      inputCategoria.value.trim() === '' ||
      inputAnno.value === '' ||
      selectRating.value === 'Seleziona..' ||
      selectScelta.value === 'Seleziona..'
   ) {
      mostraNotifica(false);
      return;
   } else {
      mostraNotifica(true);
   }

   let scelta;
   if (selectScelta.value === 'Visto') {
      scelta = true;
   } else {
      scelta = false;
   }

   const newFilm = {
      id: Date.now(),
      titolo: inputTitolo.value.trim(),
      regista: inputRegista.value.trim(),
      categoria: inputCategoria.value.trim(),
      anno: Number(inputAnno.value),
      rating: parseInt(selectRating.value),
      visto: scelta,
   };

   films.push(newFilm);

   inputTitolo.value = '';
   inputRegista.value = '';
   inputCategoria.value = '';
   inputAnno.value = '';
   selectRating.value = 'Seleziona..';
   selectScelta.value = 'Seleziona..';

   rendiFilms(films);
});

ricerca.addEventListener('input', (e) => {
   watched.value = 'Tutti';
   ordinamento.value = 'Seleziona..';
   e.preventDefault();
   const filmFiltrati = [];
   const testo = ricerca.value.toLowerCase().trim();

   for (let i = 0; i < films.length; i++) {
      let titolo = films[i].titolo.toLowerCase();
      let regista = films[i].regista.toLowerCase();
      let categoria = films[i].categoria.toLowerCase();

      if (titolo.includes(testo) || regista.includes(testo) || categoria.includes(testo)) {
         filmFiltrati.push(films[i]);
      }

   }
   if (filmFiltrati.length === 0) {
      mostraNotifica(false);
   }
   rendiFilms(filmFiltrati);
});

watched.addEventListener('change', (e) => {
   ricerca.value = '';
   ordinamento.value = 'Seleziona..';
   e.preventDefault();
   const filmFiltrati = [];
   const valoreScelto = watched.value;

   for (let i = 0; i < films.length; i++) {
      if (valoreScelto === 'Tutti') {
         filmFiltrati.push(films[i]);
      } else if (valoreScelto === 'Visti' && films[i].visto === true) {
         filmFiltrati.push(films[i]);
      } else if (valoreScelto === 'Da vedere' && films[i].visto === false) {
         filmFiltrati.push(films[i]);
      }
   }

   if (filmFiltrati.length === 0) {
      mostraNotifica(false);
   } else {
      mostraNotifica(true);
   }
   rendiFilms(filmFiltrati);
});

ordinamento.addEventListener('change', (e) => {
   ricerca.value = '';
   watched.value = 'Tutti';
   e.preventDefault();
   const ordineScelto = ordinamento.value;

   if (ordineScelto === 'Rating (dal migliore)') {
      films.sort(function (a, b) {
         return b.rating - a.rating;
      });
   } else if (ordineScelto === 'Rating (dal peggiore)') {
      films.sort(function (a, b) {
         return a.rating - b.rating;
      });
   }

   if (films.length === 0) {
      mostraNotifica(false);
   } else if (ordineScelto === 'Seleziona..') {
      return;
   } else {
      mostraNotifica(true);
   }

   rendiFilms(films);
});

btnCrescente.addEventListener('click', (e) => {
   ricerca.value = '';
   ordinamento.value = 'Seleziona..';
   watched.value = 'Tutti';
   e.preventDefault();

   films.sort(function (a, b) {
      return b.anno - a.anno;
   });

   if (films.length === 0) {
      mostraNotifica(false);
   } else {
      mostraNotifica(true);
   }
   rendiFilms(films);
});

btnDecrescente.addEventListener('click', (e) => {
   ricerca.value = '';
   ordinamento.value = 'Seleziona..';
   watched.value = 'Tutti';
   e.preventDefault();

   films.sort(function (a, b) {
      return a.anno - b.anno;
   });

   if (films.length === 0) {
      mostraNotifica(false);
   } else {
      mostraNotifica(true);
   }
   rendiFilms(films);
});

function stats() {
   const totale = document.querySelector('#stat-tot');
   const visti = document.querySelector('#stat-visti');
   const daVedere = document.querySelector('#stat-da-vedere');
   const barFill = document.querySelector('#barra');
   const percentuale = document.querySelector('#percentuale');
   let numTotale = films.length;
   let numVisti = 0;
   for (let i = 0; i < films.length; i++) {
      if (films[i].visto === true) {
         numVisti++;
      }
   }
   let numDaVedere = numTotale - numVisti;
   totale.innerText = numTotale;
   visti.innerText = numVisti;
   daVedere.innerText = numDaVedere;
   if (numTotale > 0) {
      let fill = Math.round((numVisti / numTotale) * 100);
      barFill.style.width = fill + '%';
      percentuale.innerText = fill + '%';
   } else {
      barFill.style.width = '0%';
      percentuale.innerText = '0%';
   }
}