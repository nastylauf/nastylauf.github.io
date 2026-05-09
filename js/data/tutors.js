// js/data/tutors.js
const subjects = [
  'Математика',
  'Английский',
  'Физика',
  'Русский',
  'Информатика',
  'Химия',
  'История',
  'Биология',
];

const maleFirstNames = [
  'Александр',
  'Иван',
  'Дмитрий',
  'Павел',
  'Сергей',
  'Максим',
  'Андрей',
  'Николай',
  'Владимир',
  'Михаил',
];
const femaleFirstNames = [
  'Елена',
  'Мария',
  'Анна',
  'Олеся',
  'Кристина',
  'Юлия',
  'Екатерина',
  'Анастасия',
  'Ольга',
  'Наталья',
];
const surnameBases = [
  'Смирнов',
  'Петров',
  'Козлов',
  'Волков',
  'Морозов',
  'Кузнецов',
  'Сергеев',
  'Романов',
  'Иванов',
  'Соколов',
  'Попов',
  'Лебедев',
  'Козлов',
  'Новиков',
  'Морозов',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function makeFemaleSurname(surname) {
  if (surname.endsWith('ский') || surname.endsWith('ской')) {
    return surname.slice(0, -2) + 'ая';
  }
  if (surname.endsWith('ий') || surname.endsWith('ый') || surname.endsWith('ой')) {
    return surname.slice(0, -2) + 'ая';
  }
  if (surname.endsWith('ко')) {
    return surname;
  }
  if (
    surname.endsWith('ин') ||
    surname.endsWith('ов') ||
    surname.endsWith('ев') ||
    surname.endsWith('ёв') ||
    surname.endsWith('ын')
  ) {
    return surname + 'а';
  }
  return surname + 'а';
}

function getRandomRussianName() {
  const gender = Math.random() > 0.45 ? 'female' : 'male';
  const firstName =
    gender === 'male'
      ? maleFirstNames[getRandomInt(maleFirstNames.length)]
      : femaleFirstNames[getRandomInt(femaleFirstNames.length)];
  const surnameBase = surnameBases[getRandomInt(surnameBases.length)];
  const lastName = gender === 'male' ? surnameBase : makeFemaleSurname(surnameBase);

  return {
    gender,
    fullName: `${firstName} ${lastName}`,
    avatar: gender === 'male' ? '👨‍🏫' : '👩‍🏫',
  };
}

export async function getTutorsData() {
  try {
    console.log('Fetching data from ReqRes API...');
    const response = await fetch('https://reqres.in/api/users?page=1');
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Failed to fetch tutors data');
    }
    const data = await response.json();
    console.log('Data received:', data);
    const users = data.data;

    // Адаптируем данные под формат репетиторов
    const tutors = users.map((user, index) => {
      const russianName = getRandomRussianName();
      return {
        id: user.id,
        name: russianName.fullName,
        specialty: subjects[Math.floor(Math.random() * subjects.length)],
        rating: (4.5 + Math.random() * 0.5).toFixed(2),
        reviews: Math.floor(Math.random() * 200) + 50,
        price: Math.floor(Math.random() * 500) + 700,
        experience: `${Math.floor(Math.random() * 10) + 5} лет`,
        avatar: user.avatar || russianName.avatar,
        description: `Опытный преподаватель ${subjects[Math.floor(Math.random() * subjects.length)].toLowerCase()}. Подготовка к ЕГЭ и олимпиадам.`,
      };
    });
    console.log('Tutors generated:', tutors);
    return tutors;
  } catch (error) {
    console.error('Error fetching tutors data:', error);
    // Fallback to dynamic local generation
    console.log('Using fallback dynamic data');
    const tutors = [];
    for (let i = 0; i < 10; i++) {
      const russianName = getRandomRussianName();
      tutors.push({
        id: i + 1,
        name: russianName.fullName,
        specialty: subjects[Math.floor(Math.random() * subjects.length)],
        rating: (4.5 + Math.random() * 0.5).toFixed(2),
        reviews: Math.floor(Math.random() * 200) + 50,
        price: Math.floor(Math.random() * 500) + 700,
        experience: `${Math.floor(Math.random() * 10) + 5} лет`,
        avatar: russianName.avatar,
        description: `Опытный преподаватель ${subjects[Math.floor(Math.random() * subjects.length)].toLowerCase()}. Подготовка к ЕГЭ и олимпиадам.`,
      });
    }
    return tutors;
  }
}
