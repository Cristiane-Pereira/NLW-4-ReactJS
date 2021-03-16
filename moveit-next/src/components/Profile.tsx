import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
             <img src="https://github.com/Cristiane-Pereira.png" alt="Cristiane Pereira" />
          <div>
             <strong>Cristiane Pereira</strong>
             <p>
               <img src="icons/level.svg" alt="level" />
              Level {level}
             </p>
          </div>
        </div>
    )
}