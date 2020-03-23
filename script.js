const formSearch = document.querySelector('.form-search'),
      inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
      dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
      inputCitiesTo = formSearch.querySelector('.input__cities-to'),
      dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
      inputDateDepart = formSearch.querySelector('.input__date-depart')
      ;

const city = [
  'New-York', 'Minsk', 'Kyiv',
  'Warsaw', 'Prague', 'Paris', 'Munich',
  'Berlin', 'Strasbourg', 'London', 'Odessa',
  'Wien', 'Ankara', 'Sofia'
];

const showCity = (input, list) => {
  list.textContent = '';

  if (input.value == '') return;

  const filteredCity = city.filter((item) => {
    const fixedItem = item.toLowerCase();

    return fixedItem.includes(input.value.toLowerCase());
  });

  filteredCity.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('dropdown__city');
    li.textContent = item;
    list.append(li)
  });
};

inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom)
});

dropdownCitiesFrom.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'li') {
    inputCitiesFrom.value = target.textContent;
    dropdownCitiesFrom.textContent = '';
  };
});