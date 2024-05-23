import React from 'react';
import {Rate, Tag, Typography, Image} from 'antd';
import s from './dashboard.module.css'
const { Title, Paragraph } = Typography;

const Card = ({image, title, description, genres, rating}) => {
    return (
        <div className={s.card}>
            <div>
                <Image width={200} src={image} alt={'poster'}/>
            </div>
            <div>
                <Title level={3}>{title}</Title>
                <Paragraph>{description}</Paragraph>
                {
                    genres?.map(({name}) => (
                        <Tag key={name}>{name}</Tag>
                    ))
                }
                <div className={s.rating}>
                    <Rate disabled defaultValue={rating?.imdb} count={10} />
                </div>
            </div>
        </div>
    );
};

export default Card;
