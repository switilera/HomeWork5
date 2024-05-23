import React, {useEffect} from 'react';
import {Layout, notification, theme, Typography} from "antd";
import {observer} from "mobx-react-lite";
import MovesStore from "../../stores/movesStore";
import Content from "./content";
import Navigation from "./navigation";
import {Outlet} from "react-router-dom";

const { Header, Footer } = Layout;
const {Title} = Typography;

const LayoutWrapper = observer(() => {
    const {token: { colorBgContainer }} = theme.useToken();

    useEffect(() => {
        !MovesStore.moves.length && MovesStore.setCurrentPage(1)
        !MovesStore.genres.length && MovesStore.loadGenres();
    }, []);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
            const {errorContext} = MovesStore;

            if (errorContext.state) {
                api[errorContext.type]({
                    message: errorContext.message,
                    description: errorContext.description
                })

                setTimeout(() => MovesStore.resetErrorContext(), 5000)
            }
        }, [api, MovesStore.errorContext])

        return (
        <React.Fragment>
            {
                contextHolder
            }
            <Layout>
                <Navigation />
                <Layout>
                    <Header style={{background: colorBgContainer}}>
                        <Title level={3}>{'Поиск популярных фильмов'}</Title>
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </React.Fragment>
    );
}
);

export default LayoutWrapper;
