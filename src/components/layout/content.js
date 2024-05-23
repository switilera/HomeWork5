import React from 'react';
import {observer} from "mobx-react-lite";
import {Spin} from "antd";
import MovesStore from "../../stores/movesStore";
import {Content} from "antd/es/layout/layout";
import s from './layout.module.css'

const ContentWrapper = observer(({children}) => {
    return (
        <Content className={s.content}>
            {MovesStore.isLoading && (<Spin tip="Loading..." fullscreen={true} />)}
            {
                children
            }
        </Content>
    );
});

export default ContentWrapper;
