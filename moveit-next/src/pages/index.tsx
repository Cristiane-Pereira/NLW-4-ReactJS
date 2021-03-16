import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { ComponentChallenges } from '../components/ComponentChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';


import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
      <div className={styles.container}>
       
        <ExperienceBar />

        <CountdownProvider>

        <section>
          <div>
            <Profile />
            <ComponentChallenges />
            <Countdown />
          </div>
        
          <div>
            <ChallengeBox />
          </div>
        
        </section>
        </CountdownProvider>
      </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  //chamada api
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  }

  console.log(user);

  return {
     props: user
  }
}

//Back-end (Ruby)
//NextJs (nodejs)
//Front-end (React)