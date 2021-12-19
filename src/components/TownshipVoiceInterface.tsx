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
import { thingsToDo } from '../townshipInfo';
import { genCommands, MyCommand } from '../townshipCommands';
import './App.css';

function TownshipVoiceInterface() {
  const [isVoiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [speechLog, setSpeechLog] = useState<string[]>([]);
  const [devLog, setDevLog] = useState<string[]>([]);
  const [firstClickDone, setFirstClickDone] = useState(false);

  const { speak, voices } = useSpeechSynthesis({
    onEnd: () => {
      console.log('started listening after speaking')
      SpeechRecognition.startListening({
        continuous: true,
      });
    }
  });

  const genNextIdea = useCycler(thingsToDo)

  const commands = genCommands(logAndSpeak, genNextIdea);
  //@ts-ignore
  const { transcript, resetTranscript, browserSupportsContinuousListening, listening } = useSpeechRecognition({ commands })



  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      // Browser not supported & return some useful info.
      setVoiceRecognitionSupported(false)
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
    });
    console.log('started listening');
    setVoiceRecognitionSupported(true)

    function deregisterVoiceRecognition() {
      console.log('deregistering voice recognition')
      SpeechRecognition.abortListening();
    }
    return deregisterVoiceRecognition;
  }, []);

  const moira = voices.find(({ name }: { name: string }) => name === 'Moira')



  function logAndSpeak(obj: { text: string }) {
    const fullObj = { text: obj.text, voice: moira }
    console.log('attempting to speak: ', fullObj)
    setSpeechLog(prev => [...prev, fullObj.text]);
    if (!listening) {
      setDevLog(prev => [...prev, "logAndSpeak called when we're already speaking. queue instead."]);
    }
    console.log('stopping listening because starting to speak')
    SpeechRecognition.abortListening();
    speak(fullObj);
  }

  return (
    <div className="App">

      <VoiceRecognitionSupportWarning supported={isVoiceRecognitionSupported} continuous={browserSupportsContinuousListening} />

      <br />
      {firstClickDone ?
        <>

          <div>Transcript: {transcript}</div>
          <button onClick={() => logAndSpeak({ text: 'I speak!' })}>Speak</button>
          <button onClick={resetTranscript}>Reset</button>
          <div>Listening? {listening ? 'yes' : 'no'}</div>
          <StuffYouCanSay commands={commands} />
          <SpeechLog speechLog={speechLog} />
          <DevLog devLog={devLog} />
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
interface DevLogProps {
  devLog: string[];
}
function DevLog(props: DevLogProps) {
  return (
    <>
      <h2>Dev log</h2>
      <div className='devLog'>
        {
          [...props.devLog].reverse().map((line, ix) => <li key={ix}>{line}</li>)
        }
      </div>
    </>
  );
}


function VoiceRecognitionSupportWarning({ supported, continuous }: { supported: boolean, continuous: boolean }) {
  return <>
    {supported ? <div>Voice recognition supported</div>
      : <div className='warning'>WARNING!: Voice recognition is unsupported on this browser.  Try google chrome.</div>}
    {continuous ? <div>Continuous listening supported</div>
      : <div className='warning'>WARNING!: Continuous listening not supported.</div>}
  </>
}