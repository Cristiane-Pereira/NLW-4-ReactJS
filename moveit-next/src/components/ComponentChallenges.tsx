import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ComponentChallenges.module.css';

export function ComponentChallenges (){
    const { challengesCompleted } = useContext(ChallengesContext);
    return (
        <div className={styles.componentChallengesContainer}>
           <span>Desafios completos</span>
           <span>{challengesCompleted}</span>
        </div>
    );
}