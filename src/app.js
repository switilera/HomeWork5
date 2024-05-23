import React from 'react';
import Layout from "./components/layout";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/page/dashboard";
import Search from "./components/page/search";

const App = observer(() => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={'/'} element={<Dashboard />} />
                    <Route path={'/search'} element={<Search />} />
                </Route>
            </Routes>
        </React.Fragment>
    );
});

export default App;
