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

const firstNames = [
  'Александр',
  'Елена',
  'Иван',
  'Мария',
  'Дмитрий',
  'Анна',
  'Павел',
  'Олеся',
  'Сергей',
  'Кристина',
  'Максим',
  'Юлия',
  'Андрей',
  'Екатерина',
  'Николай',
];
const lastNames = [
  'Смирнов',
  'Петрова',
  'Козлов',
  'Волкова',
  'Морозов',
  'Кузьмина',
  'Сергеев',
  'Романова',
  'Иванов',
  'Соколова',
  'Попов',
  'Лебедева',
  'Козлова',
  'Новикова',
  'Морозова',
];

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
    const tutors = users.map((user, index) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      specialty: subjects[Math.floor(Math.random() * subjects.length)],
      rating: (4.5 + Math.random() * 0.5).toFixed(2),
      reviews: Math.floor(Math.random() * 200) + 50,
      price: Math.floor(Math.random() * 500) + 700,
      experience: `${Math.floor(Math.random() * 10) + 5} лет`,
      avatar: user.avatar || (Math.random() > 0.5 ? '👨‍🏫' : '👩‍🏫'),
      description: `Опытный преподаватель ${subjects[Math.floor(Math.random() * subjects.length)].toLowerCase()}. Подготовка к ЕГЭ и олимпиадам.`,
    }));
    console.log('Tutors generated:', tutors);
    return tutors;
  } catch (error) {
    console.error('Error fetching tutors data:', error);
    // Fallback to dynamic local generation
    console.log('Using fallback dynamic data');
    const tutors = [];
    for (let i = 0; i < 10; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      tutors.push({
        id: i + 1,
        name: `${firstName} ${lastName}`,
        specialty: subjects[Math.floor(Math.random() * subjects.length)],
        rating: (4.5 + Math.random() * 0.5).toFixed(2),
        reviews: Math.floor(Math.random() * 200) + 50,
        price: Math.floor(Math.random() * 500) + 700,
        experience: `${Math.floor(Math.random() * 10) + 5} лет`,
        avatar: Math.random() > 0.5 ? '👨‍🏫' : '👩‍🏫',
        description: `Опытный преподаватель ${subjects[Math.floor(Math.random() * subjects.length)].toLowerCase()}. Подготовка к ЕГЭ и олимпиадам.`,
      });
    }
    return tutors;
  }
}
