import {makeAutoObservable, reaction} from "mobx";
import MovesService from "../service/movesService";

const DEFAULT_LIMIT = 10;

class MovesStore {
    moves = [];

    isLoading = false

    errorContext = {
        state: false,
        message: null,
        description: null,
        placement: 'topRight',
        type: null
    }

    totalMoves = null;

    pagesMoves = null;

    currentPage = null

    genres = [];

    sortType = null;

    currentGenre = null;

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.dependencyReload, () => this.loadMoves())
    }

    get dependencyReload() {
        return [this.currentPage, this.sortType, this.pagesMoves, this.currentPage, this.currentGenre]
    }

    setIsLoading = (bool) => {
        this.isLoading = bool;
    }

    setErrorContext = (payload) => {
        this.errorContext = payload;
    }

    setMoves = (moves) => {
        this.moves = moves;
    }

    setTotalMoves = (total) => {
        this.totalMoves = total;
    }

    setPagesMoves = (pages) => {
        this.pagesMoves = pages;
    }

    setCurrentPage = (page) => {
        if (!page) {
            return
        }

        this.currentPage = page;
    }

    resetErrorContext = () => {
        this.errorContext = {
            state: false,
            message: null,
            description: null,
            placement: 'topRight',
            type: null
        }
    }

    setCurrentGenre = (genre) => {
        this.currentGenre = genre;
    }

    setGenres = (genres) => {
        this.genres = genres;
    }

    setSortType = (sortType) => {
        this.sortType = sortType;
    }

    loadMoves = async() => {
        try {
            this.setIsLoading(true);

            const {data} = await MovesService.getMoves({
                page: this.currentPage,
                limit: DEFAULT_LIMIT,
                sorting: this.sortType,
                genre: this.currentGenre
            })

            this.setMoves(data.docs);
            this.setPagesMoves(data.pages)
            this.setTotalMoves(data.total)
            this.setCurrentPage(data.currentPage)
        } catch (e) {
            this.setErrorContext({
                state: true,
                message: 'Ошибка загрузки фильмов',
                description: e.message,
                type: 'error'
            })
        } finally {
            this.setIsLoading(false)
        }
    }

    loadGenres = async() => {
        try {
            this.setIsLoading(true)

            const {data} = await MovesService.getGenres();

            this.setGenres(data);
        } catch (e) {
            this.setErrorContext({
                state: true,
                message: 'Ошибка получения жанров',
                description: e.message,
                type: 'error'
            })
        } finally {
            this.setIsLoading(false)
        }
    }
}

export default new MovesStore();
