import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenge.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    activeChallenge: Challenge;
    challengesCompleted: number;
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    
}

interface ChallengesProviderProps {
   children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);


    const [activeChallenge, setActiveChallenge] = useState(null)
   
   const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
   
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(level));
        Cookies.set('challengesCompleted', String(level));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
       setLevel(level + 1);
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengeIndex];

       setActiveChallenge(challenge)

       new Audio('/notification.mp3').play();

       if (Notification.permission === 'granted') {
           new Notification('Novo desafio 🎉', {
               body: `Valendo ${challenge.amount}xp!`
           })
       }
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) { 
            finalExperience = finalExperience -experienceToNextLevel;
           levelUp()
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted +1);
     }

    function resetChallenge(){
        setActiveChallenge(null);
    }
    return (
      <ChallengesContext.Provider 
      value={{

             level,
             currentExperience,
             challengesCompleted,
             startNewChallenge,
             levelUp,
             activeChallenge,
             resetChallenge,
             experienceToNextLevel,
             completeChallenge,

             }}>

        { children }
      </ChallengesContext.Provider>
    );
}

