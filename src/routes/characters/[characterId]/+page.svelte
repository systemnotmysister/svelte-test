<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import { page } from '$app/state';  // Импортируем page store для доступа к параметрам маршрута

  // Типы данных
  interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  }

  let character: Character | null = null;

  // Запрос для получения данных одного персонажа по ID
  const query = `
    query($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        gender
        image
      }
    }
  `;

  // Функция для получения данных персонажа
  const fetchCharacter = async (id: number) => {
    try {
      const { data } = await client.query(query, { id }).toPromise();
      if (data && data.character) {
        character = data.character;
      } else {
        console.error('Нет данных о персонаже');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  // Подписка на изменения параметров маршрута
  $: {
    const characterId = page.params.characterId;  // Получаем параметр characterId из маршрута
    if (characterId) {
      fetchCharacter(parseInt(characterId));  // Загружаем данные для этого персонажа
    }
  }
</script>

<h1>{character ? character.name : 'Загрузка...'}</h1>

{#if character}
<div>
  <img src={character.image} alt={character.name} />
  <p>Статус: {character.status}</p>
  <p>Вид: {character.species}</p>
  <p>Пол: {character.gender}</p>
</div>
{:else}
<p>Нет данных о персонаже</p>
{/if}
