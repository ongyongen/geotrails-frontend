import React from "react";
import { Header } from "../../components/Header/Header";
import { Title, Subtitle, ChartTitle } from "../../themes/textStyles";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { USER_PROFILE_PAGE_PATH } from "../../routes";
import { useSelector } from "react-redux";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useProfileHooks } from "./useProfileHooks";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./profile.css"
import { useEffect } from "react";
import { LIGHT_PURPLE } from "../../themes/colors";

const tickFormatter = (value: string, index: number) => {
    const limit = 5; 
    if (value.length < limit) return value;
    return `${value.substring(0, limit)}...`;
 };

export const Dashboard = () => {

    const { user, token } = useContext(AuthContext);

    const { methods } = useProfileHooks()

    const navigate = useNavigate();

    function navigateToProfilePage() {
      navigate(USER_PROFILE_PAGE_PATH);
    }

    useEffect(() => {
        methods.generateDateForDashboard()
    },[token])

    const all_found_geocaches = useSelector((state: any) => state.Profile.all_found_geocaches)
    const cache_types = useSelector((state: any) => state.Profile.cache_types)
    const container_types = useSelector((state: any) => state.Profile.container_types)
    const avg_difficulty = useSelector((state: any) => state.Profile.avg_difficulty)
    const avg_terrain = useSelector((state: any) => state.Profile.avg_terrain)
    const total_caches_found = useSelector((state: any) => state.Profile.total_caches_found)

    const geocaches_by_planning_area = useSelector((state: any) => state.Profile.geocaches_by_planning_area)
    const geocaches_by_cache_owner = useSelector((state: any) => state.Profile.geocaches_by_cache_owner)
    console.log(geocaches_by_cache_owner)

    return (
        <>
        <Header/>
        <TitleContainer>
            <ProfileTitle>
                {user}'s dashboard 
            </ProfileTitle>
            <Subtitle onClick={() => navigateToProfilePage()}>🗓️</Subtitle>
            
        </TitleContainer>
        <CardContainer>
            <Card>
                <ChartTitle>{total_caches_found} caches found</ChartTitle>
            </Card>
            <Card>
                <ChartTitle>Average difficulty : {avg_difficulty}</ChartTitle>
            </Card>
            <Card>
                <ChartTitle>Average terrain : {avg_terrain}</ChartTitle>
            </Card>
        </CardContainer>
    

        <DashboardContainer>
            <ChartContainer>
                <ChartTitle>Geocache Type</ChartTitle>
                <ResponsiveContainer height={300}>
                    <RadarChart data={cache_types}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="geocache_type" />
                        <PolarRadiusAxis />
                        <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer>
                <ChartTitle>Container Type</ChartTitle>
                <ResponsiveContainer height={300}>
                    <RadarChart data={container_types}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="container_type" />
                        <PolarRadiusAxis />
                        <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </ChartContainer>
         
        </DashboardContainer>

        <DashboardContainer>

            <ChartContainer>
                <ChartTitle>Top 5 common planning area</ChartTitle>
                <ResponsiveContainer height={300}>
                    <BarChart data={geocaches_by_planning_area}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="planning_area" 
                        tickFormatter={tickFormatter}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
            
            <ChartContainer>
                <ChartTitle>Top 5 common cache owners</ChartTitle>
                <ResponsiveContainer height={300}>
                <BarChart data={geocaches_by_cache_owner}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cache_owner" 
                    tickFormatter={tickFormatter}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            </ChartContainer>
        
        </DashboardContainer>
        </>
    )
}

const TitleContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`

const ProfileTitle = styled(Title)`
    margin-right:1vw;
`

const DashboardContainer = styled.div`
    width:80vw;
    margin-left:5vw;
    margin-right:5vw;
    margin-top:2.5vh;
    margin-bottom:2.vh%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
`
const ChartContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:40vw;
`

const Card = styled.div`
    background: #fff;
    transition: all 0.3s ease-out;
    text-decoration: none;
    border-radius:10px;
    padding:1%;
    margin:2%;
    box-shadow: 0 0 3px 0.1px rgba(0, 0, 0, 0.25);

    &:hover {
        transform: translateY(-5px) scale(1.005) translateZ(0);
        box-shadow: 0 24px 36px rgba(0,0,0,0.11), 0 24px 46px var(--box-shadow-color);
        background: ${LIGHT_PURPLE};
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    flex-wrap:wrap;
`

