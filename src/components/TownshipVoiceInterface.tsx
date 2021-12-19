//TODO: when chrome is speaking, turn off speech recognition!!


// reach-speech-recognition (James Brill)
// https://github.com/JamesBrill/react-speech-recognition#basic-example
// React-speech-kit (for TTS)
// https://www.npmjs.com/package/react-speech-kit#examples-and-demo

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import { useCycler } from '../utils';
import { howDoYouMake, thingsToDo, whatCanBeMade, whereIsThe, whereIsTheShrine } from '../townshipInfo';
import { genCommands, MyCommand } from '../townshipCommands';
import './App.css';



function TownshipVoiceInterface() {
  const [isVoiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLog, setSpeechLog] = useState<string[]>([]);
  const [firstClickDone, setFirstClickDone] = useState(false);

  const { speak, voices } = useSpeechSynthesis({
    onEnd: () => {
      setIsListening(true);
      SpeechRecognition.startListening({
        continuous: true,
      });
    }
  });

  const moira = voices.find(({ name }: { name: string }) => name === 'Moira')

  const genNextIdea = useCycler(thingsToDo)

  const commands = genCommands(logAndSpeak, genNextIdea);
  const { transcript, resetTranscript } = useSpeechRecognition({ commands })

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      // Browser not supported & return some useful info.
      setVoiceRecognitionSupported(false)
      return;
    }

    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
    setVoiceRecognitionSupported(true)

    function deregisterVoiceRecognition() {
      console.log('deregistering voice recognition')
      SpeechRecognition.stopListening();
    }
    return deregisterVoiceRecognition;
  }, []);



  interface SpeechInstructions {
    text: string;
    voice?: any;
  }
  function logAndSpeak(obj: { text: string }) {
    const fullObj = { text: obj.text, voice: moira }
    console.log('attempting to speak: ', fullObj)
    setSpeechLog(prev => [...prev, fullObj.text]);
    setIsListening(false);
    SpeechRecognition.stopListening();
    speak(fullObj);
  }

  return (
    <div className="App">

      <VoiceRecognitionSupportWarning {...{ isVoiceRecognitionSupported }} />

      <br />
      {firstClickDone ?
        <>

          <div>Transcript: {transcript}</div>
          <button onClick={() => logAndSpeak({ text: 'I speak!' })}>Speak</button>
          <button onClick={resetTranscript}>Reset</button>
          <div>Listening? {isListening ? 'YES' : 'NO'}</div>
          <StuffYouCanSay commands={commands} />
          <SpeechLog speechLog={speechLog} />
        </>
        :
        <><button onClick={() => { setFirstClickDone(true) }}>Click to start!</button>
        </>
      }
    </div >
  );
}

export default TownshipVoiceInterface;
interface StuffYouCanSayProps {
  commands: MyCommand[];
}

function StuffYouCanSay(props: StuffYouCanSayProps) {
  return <div>
    <h2>What you can say, currently:</h2>
    <ul>
      {
        props.commands.map(command => <li key={command.command.toString()}>{command.command.toString()}</li>)
      }
    </ul></div>

}
interface SpeechLogProps {
  speechLog: string[];
}

function SpeechLog(props: SpeechLogProps) {
  return (
    <>
      <h2>Here's what I've said recently</h2>
      <div className='speechLog'>
        {
          [...props.speechLog].reverse().map((line, ix) => <li key={ix}>{line}</li>)
        }
      </div>
    </>
  );
}


function VoiceRecognitionSupportWarning({ isVoiceRecognitionSupported }: { isVoiceRecognitionSupported: boolean }) {
  if (isVoiceRecognitionSupported) {
    return <div>Voice recognition supported</div>;
  } else {
    return <div className='warning'>WARNING!: Voice recognition is unsupported on this browser.  Try google chrome.</div>
  }
}