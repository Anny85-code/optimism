/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import './Teams.css';
import TeamsCard from './TeamsCard';
import Img1 from '../../../assets/image/teams_demo.jpg';

const teams = [
  {
    id: 1,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 2,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 3,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 4,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 5,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 6,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
];

const Teams = () => {
  return (
    <div className="teams_container">
      <LandingNav />
      <section className="team_head">
        <h3>teams</h3>
        {/* <h3>Chicken Recipes</h3> */}
      </section>
      <TeamsCard props={teams} />
      <LandingFoot />
    </div>
  );
};

export default Teams;
/* eslint-enable */
