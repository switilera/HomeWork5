import React, {useState} from 'react';
import {Dropdown, Pagination, Select, Space} from "antd";
import {DownOutlined, CheckOutlined} from "@ant-design/icons";
import s from './dashboard.module.css';
import MovesStore from "../../../stores/movesStore";
import {observer} from "mobx-react-lite";
import Card from "./card";

const Dashboard = observer(() => {
    const sortKeys = {
        notSorting: 'notSorting',
        rating: 'rating.imdb'
    }

    const [checked, setChecked] = useState(sortKeys.notSorting)

    const sortHandler = (sort) => {
        if (sort === sortKeys.rating) {
            MovesStore.setSortType(sort)
        }

        setChecked(sort)
    }

    const items = [
        {
            key: sortKeys.notSorting,
            label: 'По порядку',
            icon: checked === sortKeys.notSorting && <CheckOutlined />,
            onClick: () => sortHandler(sortKeys.notSorting)
        },
        {
            key: sortKeys.rating,
            label: 'По рейтингу',
            icon: checked === sortKeys.rating && <CheckOutlined />,
            onClick: () => sortHandler(sortKeys.rating)
        },
    ];

    const genres = MovesStore.genres.map((genre) => {
        return {label: genre.name[0].toUpperCase() + genre.name.slice(1), value: genre.name}
    })

    const onChangeGenres = (values) => {
        return MovesStore.setCurrentGenre(values)
    }

    const defaultValueGenres = {
        label: 'Все жанры',
        value: 'Все'
    }

    return (
        <React.Fragment>
            <div
                className={s.filter}
            >
                <Select onChange={onChangeGenres} defaultValue={defaultValueGenres} size={'small'} style={{width: '320px'}}
                        options={[defaultValueGenres, ...genres]}
                />
                <Dropdown menu={{items}}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {'Сортировка'}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <div className={s.cardWrapper}>
                {
                    MovesStore.moves.length ? MovesStore.moves?.map((move) => (
                        <Card
                            title={move.name}
                            image={move.poster?.previewUrl}
                            description={move.description}
                            genres={move.genres}
                            rating={move.rating}
                            key={move.name}
                        />
                    )) : null
                }
            </div>
            <div className={s.pagination}>
                <Pagination
                    defaultCurrent={MovesStore.currentPage}
                    total={MovesStore.pagesMoves}
                    onChange={(page) => MovesStore.setCurrentPage(page)}
                />
            </div>
        </React.Fragment>
    );
});

export default Dashboard;
