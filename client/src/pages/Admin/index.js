import React from 'react'
import PageTitle from '../../components/PageTitle'
import {Tabs} from "antd"
import MoviesList from './MoviesList'
import TheatreList from './TheatreList'
function Admin() {
  return (
    <div>
        <PageTitle title="Admin"/>
        <Tabs defaultActiveKey='1'>
            <Tabs.Tabpane tab="movies" key="1">
                <MoviesList/>
            </Tabs.Tabpane>
            <Tabs.Tabpane tab="Theatres" key="2">
                <TheatreList/>
            </Tabs.Tabpane>
        </Tabs>
    </div>
  )
}
export default Admin