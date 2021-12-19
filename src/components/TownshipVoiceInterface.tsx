//TODO: when chrome is speaking, turn off speech recognition!!


// reach-speech-recognition (James Brill)
// https://github.com/JamesBrill/react-speech-recognition#basic-example
// React-speech-kit (for TTS)
// https://www.npmjs.com/package/react-speech-kit#examples-and-demo

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import './App.css';
import { useCycler } from '../utils';
import { howDoYouMake, thingsToDo, whatCanBeMade, whereIsThe, whereIsTheShrine } from '../townshipInfo';


interface MyCommand {
  command: string | RegExp;
  callback: (item: string) => void
}


function TownshipVoiceInterface() {
  const [isVoiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [firstClickDone, setFirstClickDone] = useState(false);
  const { speak, voices } = useSpeechSynthesis();

  const moira = voices.find(({ name }: { name: string }) => name === 'Moira')

  const genNextIdea = useCycler(thingsToDo)


  const commands: MyCommand[] = [
    {
      command: /(?:hello|are you there|are you awake)/,
      callback: () => {
        logAndSpeak({
          text: 'Hi there!',
          voice: moira
        })
      }
    },
    {
      command: /where is the (.*) (?:shrine|train|chain)/,
      callback: (shrineType: string) => {
        logAndSpeak({
          text: whereIsTheShrine(shrineType),
          voice: moira
        })
      }
    },

    {
      command: /where (?:is|are) the (.*)/,
      callback: (item: string) => {
        logAndSpeak({
          text: whereIsThe(item),
          voice: moira
        })
      }
    },
    {
      command: /What (?:should|could|can) I do/,
      callback: () => {
        logAndSpeak({
          text: genNextIdea()
          , voice: moira
        })
      }
    },

    {
      command: /tell me everything I (?:should|could|can) do/,
      callback: () => {
        logAndSpeak({
          text: thingsToDo.join('.  ')
          , voice: moira
        })
      }
    },
    {
      command: /how (?:do|can) (?:you|i) make a? (.*)/,
      callback: (thingToMake: string) => {
        logAndSpeak({
          text: howDoYouMake(thingToMake),
          voice: moira
        })
      }
    },
    {
      command: /What can (?:I|you) make/,
      callback: () => {
        logAndSpeak({
          text: whatCanBeMade()
          , voice: moira
        })
      }
    }
  ]

  function logAndSpeak(obj: any) {
    console.log('attempting to speak: ', obj)
    speak(obj);

  }

  const { transcript, resetTranscript } = useSpeechRecognition({ commands })
  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      // Browser not supported & return some useful info.
      setVoiceRecognitionSupported(false)
    }
    else {
      SpeechRecognition.startListening({
        continuous: true,
      });

      setVoiceRecognitionSupported(true)
    }
  }, []);


  return (
    <div className="App">

      ?  {isVoiceRecognitionSupported ?
        'Voice recognition supported' :
        'WARNING!: Voice recognition is unsupported on this browser.  Try google chrome.'}
      <br />
      {firstClickDone ?
        <>
          <div>Transcript: {transcript}</div>
          <button onClick={() => speak({ text: 'I speak!', voice: moira })}>Speak</button>
          <button onClick={resetTranscript}>Reset</button>
          <StuffYouCanSay commands={commands} />

        </>
        :
        <><button onClick={() => { setFirstClickDone(true) }}>Click to start!</button>
        </>
      }
    </div>
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