/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import './Teams.css';
import TeamsCard from './TeamsCard';
import Img1 from '../../../assets/image/teams_demo.jpg';
import Img2 from '../../../assets/image/recpie_2.png.webp';
import Img3 from '../../../assets/image/calls.jpg';
import Img4 from '../../../assets/image/recpie_3.png.webp';
import Img5 from '../../../assets/image/teams_demo.jpg';
import Img6 from '../../../assets/image/recpie_1.png.webp';

const teams = [
  {
    id: 1,
    name: Img1,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 2,
    name: Img2,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 3,
    name: Img3,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamusLorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamusipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 4,
    name: Img4,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 5,
    name: Img5,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, repudiandae illum exercitationem incidunt maiores.',
  },
  {
    id: 6,
    name: Img6,
    title: 'Lorem ipsum dolor sit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus, Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamusrepudiandae illum exercitationem incidunt maiores.',
  },
];

const Teams = () => {
  return (
    <div className="teams_container">
      <LandingNav />
      <section className="team_head">
        <h3 className="head__y">teams</h3>
        {/* <h3>Chicken Recipes</h3> */}
      </section>
      <TeamsCard props={teams} />
      <LandingFoot />
    </div>
  );
};

export default Teams;
/* eslint-enable */
