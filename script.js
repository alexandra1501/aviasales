const formSearch = document.querySelector('.form-search'),
      inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
      dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
      inputCitiesTo = formSearch.querySelector('.input__cities-to'),
      dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
      inputDateDepart = formSearch.querySelector('.input__date-depart')
      ;

let city = [];

const citiesApi = "dataBase/cities.json",
      API_KEY = '26c593c90b9c770723ff882c9df1c68d',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      calendar = 'http://min-prices.aviasales.ru/calendar_preload';

const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = '';

  if (input.value == '') return;

  const filteredCity = city.filter((item) => {
    const fixedItem = item.name.toLowerCase();
    return fixedItem.includes(input.value.toLowerCase());
  });

  filteredCity.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('dropdown__city');
    li.textContent = item.name;
    list.append(li)
  });
};

const renderCheapDay = (cheapTicket) => {
  console.log(cheapTicket);
};

const renderCheapYear= (cheapTickets) => {
  console.log(cheapTickets);
};

const renderCheap = (data, date) => {
  const cheapTicketYear = JSON.parse(data).best_prices;
  const cheapTicketDay = cheapTicketYear.filter((item) => {
    return item.depart_date === date;
  })

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicketYear);
};

const dropdownEvents = (dropdown, input, event) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'li') {
    input.value = target.textContent;
    dropdown.textContent = '';
  };
};

inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom)
});

dropdownCitiesFrom.addEventListener('click', (event) => {
  dropdownEvents(dropdownCitiesFrom, inputCitiesFrom, event);
});

inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo, dropdownCitiesTo)
});

dropdownCitiesTo.addEventListener('click', (event) => {
  dropdownEvents(dropdownCitiesTo, inputCitiesTo, event);
});

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();

  const cityFrom = city.find((item) => {
    return inputCitiesFrom.value === item.name
  });
  const cityTo = city.find((item) => {
    return inputCitiesTo.value === item.name
  });

  const formData = {
    from: cityFrom.code,
    to: cityTo.code,
    when: inputDateDepart.value,
  };
 
  const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

  getData(calendar + requestData, (response) => {
    renderCheap(response, formData.when);
  });
});

getData(citiesApi, (data) => {
  city = JSON.parse(data).filter(item => item.name)});
