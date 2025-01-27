import { useState, useRef, useEffect} from 'react';
import HomePage from './components/HomePage';
import Header from './components/Header';
import FileDisplay from './components/FileDisplay';
import Information from './components/Information';
import Transcribing from './components/Transcribing';
import { MessageTypes } from './utils/presets';

function App() {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false)

  const isAudioAvailable = file || audio;

  function resetAudio() {
    setFile(null);
    setAudio(null);
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type : 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type){
        case 'DOWNLOADING':
          setDownloading(true)
          console.log("DOWNLOADING")
          break;
        case 'LOADING':
          setLoading(true)
          console.log("LOADING")
          break;
        case 'RESULT':
          setOutput(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  async function readAudioFrom(file) {
    const sampling_rate = 1600
    const audioCTX = new audioCTX({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audioData = decoded.getChannelData(0) // renamed to avoid shadowing
    return audioData
  }
  
  async function handleFormSubmission() {
    if (!file && !audio){
      return
    }
    let audioData = await readAudioFrom(file ? file : audio)
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audioData,
      model_name
    })
  }

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {output ? (
          <Information/>
        ): loading ? (
          <Transcribing/>
        ): isAudioAvailable ? (
          <FileDisplay resetAudio={resetAudio} file={file} audio={audio} />
        ): (
          <HomePage setFile={setFile} setAudio={setAudio} />
        )}
      </section>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
