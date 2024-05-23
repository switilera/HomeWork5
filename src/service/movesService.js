import $api from "../http";

export default class MovesService {
    static getMoves = ({page, limit, sorting, genre}) => {
        const url = `v1.4/movie`;
        const params = new URLSearchParams();

        params.append('page', page)
        params.append('limit', limit)
        params.append('notNullFields', 'poster.url')
        params.append('notNullFields', 'name')
        params.append('notNullFields', 'top250')
        params.append('notNullFields', 'description')
        params.append('notNullFields', 'rating.imdb')

        if (sorting) {
            params.append('sortField', sorting)
            params.append('sortType', '-1')
        }

        genre && params.append('genres.name', genre)

        return $api.get(url, {params})
    }

    static getGenres = () => {
        return $api.get(`v1/movie/possible-values-by-field?field=genres.name`)
    }
}
