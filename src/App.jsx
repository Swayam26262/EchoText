import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Header from './components/Header';
import FileDisplay from './components/FileDisplay';

function App() {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);

  const isAudioAvailable = file || audio;

  function resetAudio() {
    setFile(null);
    setAudio(null);
  }

  useEffect(() => {
    
    console.log(audio);
  }, [audio]);

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {isAudioAvailable ? (
          <FileDisplay resetAudio={resetAudio} file={file} audio={audio} />
        ) : (
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
