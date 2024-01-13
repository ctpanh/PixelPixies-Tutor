"use client";
import { useEffect, useState } from "react";
import QuestgenSendText from "./sendText";
import QuestgenSendFile from "./sendFile";
import {
  QuestLang,
  QuestType,
  langQuestion,
  typeQuestion,
} from "@/services/learning/learningHelper";
import { genQuest, uploadFilePdf } from "@/services/learning/learningApi";

const Questgen = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTypeQuest, setSelectedTypeQuest] = useState<string>(
    QuestType.MCQ
  );
  const [selectedLangQuest, setSelectedLangQuest] = useState<string>(
    QuestLang.ENGLISH
  );
  const [numEasyQuest, setNumEasyQuest] = useState<number>(3);
  const [numMediumQuest, setNumMediumQuest] = useState<number>(3);
  const [numHardQuest, setNumHardQuest] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [idPdf, setIdPdf] = useState<number>(-1);
  const [question, setQuestion] = useState<any[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const nextStep = () => {
    if (step === 1 && !selectedOption) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleNumEasyQuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setNumEasyQuest(0);
      setError(null);
      return;
    }

    if (!/^\d+$/.test(inputValue)) {
      setError("Please enter a valid number.");
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue >= 25) {
        setError("Number must be less than 25.");
      } else {
        setError(null);
        setNumEasyQuest(+inputValue);
      }
    }
  };
  const handleNumMediumQuestChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setNumMediumQuest(0);
      setError(null);
      return;
    }

    if (!/^\d+$/.test(inputValue)) {
      setError("Please enter a valid number.");
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue >= 25) {
        setError("Number must be less than 25.");
      } else {
        setError(null);
        setNumMediumQuest(+inputValue);
      }
    }
  };
  const handleNumHardQuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setNumHardQuest(0);
      setError(null);
      return;
    }

    if (!/^\d+$/.test(inputValue)) {
      setError("Please enter a valid number.");
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue >= 25) {
        setError("Number must be less than 25.");
      } else {
        setError(null);
        setNumHardQuest(+inputValue);
      }
    }
  };
  const submitForm = async () => {
    setIdPdf(1);
    // if (!error) {
    //   if (selectedOption === "text") {
    //     console.log(text);
    //     console.log("Form submitted");
    //   } else {
    //     if (file) {
    //       setIsloading(true);
    //       await uploadFilePdf(file)
    //         .then((value) => {
    //           console.log(value.data);
    //           setIdPdf(value.data.id);
    //           setIsloading(false);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           setIsloading(false);
    //         });
    //     }
    //   }
    // }
  };

  const genquestion = async () => {
    setIsloading(true);
    await genQuest({
      pdf_id: idPdf,
      type: selectedTypeQuest,
      language: selectedLangQuest,
      num_easy: numEasyQuest,
      num_medium: numMediumQuest,
      num_hard: numHardQuest,
    })
      .then((value) => {
        setStep(step + 1);
        setQuestion(value.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };

  useEffect(() => {
    if (idPdf > 0 && file) {
      genquestion();
    }
  }, [idPdf]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full flex flex-col items-center gap-4">
            <label className="block text-sm font-medium text-gray-900">
              Select type input:
            </label>
            <div className="flex flex-col">
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="text"
                  checked={selectedOption === "text"}
                  onChange={handleRadioChange}
                />
                <span className="ml-2">Text</span>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="File"
                  checked={selectedOption === "File"}
                  onChange={handleRadioChange}
                />
                <span className="ml-2">File</span>
              </div>
            </div>
            <button
              className=" w-full flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="h-full">
            {selectedOption === "text" ? (
              <QuestgenSendText text={text} setText={setText} />
            ) : (
              <QuestgenSendFile file={file} setFile={setFile} />
            )}
            <div className="w-full flex justify-between pb-8 gap-4">
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label htmlFor="type">Question Type</label>
                <select
                  name="type"
                  className="border rounded-full border-pink-1 text-pink-1 px-2"
                  onChange={(e) => {
                    setSelectedTypeQuest(e.target.value);
                  }}
                >
                  {typeQuestion.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label htmlFor="type">Question Language</label>
                <select
                  name="type"
                  className="border rounded-full border-pink-1 text-pink-1 px-2"
                  onChange={(e) => {
                    setSelectedLangQuest(e.target.value);
                  }}
                >
                  {langQuestion.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label>Number of easy question</label>
                <input
                  type="text"
                  value={numEasyQuest}
                  onChange={handleNumEasyQuestChange}
                  className={`rounded-full border border-pink-1 px-2 ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label>Number of medium question</label>
                <input
                  type="text"
                  value={numMediumQuest}
                  onChange={handleNumMediumQuestChange}
                  className={` rounded-full border border-pink-1 px-2 ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
              <div className="w-fit flex flex-col gap-2 items-center justify-center text-pink-1">
                <label>Number of hard question</label>
                <input
                  type="text"
                  value={numHardQuest}
                  onChange={handleNumHardQuestChange}
                  className={`w-20 rounded-full border border-pink-1 px-2 ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                onClick={prevStep}
              >
                Previous
              </button>

              {isLoading ? (
                <div className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold">
                  {`⏳`}
                </div>
              ) : (
                <button
                  className="w-1/2 flex justify-center bg-pink rounded-lg py-2 text-white font-bold"
                  onClick={submitForm}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full flex flex-col items-center gap-4">
            {JSON.stringify(question)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Question generation</h1>
      <div className="text-sm text-gray-500 italic">
        High-Quality Real-Time Streaming Quiz - Generate MCQs, True or False,
        Fill-in-the-blanks, FAQs, etc using AI
      </div>
      {renderStepContent()}
    </div>
  );
};
export default Questgen;
