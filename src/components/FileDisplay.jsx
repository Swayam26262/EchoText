import React from "react";

export default function FileDisplay(props) {
  const { resetAudio, file, audio } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-72 sm:w-92 max-w-full mx-auto">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
            Your<span className="text-blue-400 bold">File</span>
        </h1>
        <div className="flex flex-col text-left my-4">
            <h2 className="font-semibold">Name</h2>
            <p>{file ? file?.name : 'Custom Audio'}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
            <button onClick={resetAudio} className="text-slate-400 hover:text-blue-600 duration-200">
                Reset
            </button>
            <button className="specialBtn px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium">
                <p>Transcribe</p>
                <i className="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </main>
  );
}
